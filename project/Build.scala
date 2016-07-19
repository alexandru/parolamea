/*
 * Copyright (C) 2014 Alexandru Nedelcu
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import com.typesafe.sbt.web.SbtWeb.autoImport._
import com.typesafe.sbt.web.pipeline.Pipeline
import com.typesafe.sbt.web.{PathMapping, SbtWeb}
import net.ground5hark.sbt.concat.SbtConcat.autoImport._
import org.scalajs.sbtplugin.ScalaJSPlugin
import org.scalajs.sbtplugin.ScalaJSPlugin.autoImport._
import sbt.Keys._
import sbt.{Build => SbtBuild, _}

object Build extends SbtBuild {
  val buildJS = TaskKey[Pipeline.Stage]("buildJS", "Build the fastOpt.js and copy it into the staging directory")

  val buildJSDefTask = Def.task { mappings: Seq[PathMapping] =>
    mappings :+ (crossTarget.value / "parolamea-opt.js", "assets/parolamea-opt.js")
  }

  val appSettings = Seq(
    name := "parolamea",
    version := "1.1",

    organization := "org.alexn",
    scalaVersion := "2.11.8",

    scalacOptions ++= Seq(
      "-unchecked", "-deprecation", "-feature", "-Xlint", "-target:jvm-1.6",
      "-Yinline-warnings", "-optimise", "-Ywarn-adapted-args",
      "-Ywarn-dead-code", "-Ywarn-inaccessible", "-Ywarn-nullary-override",
      "-Ywarn-nullary-unit", "-Xlog-free-terms"
    ),

    resolvers ++= Seq(
      "Typesafe Releases" at "http://repo.typesafe.com/typesafe/releases",
      Resolver.sonatypeRepo("releases"),
      Resolver.url("scala-js-releases",
        url("http://dl.bintray.com/content/scala-js/scala-js-releases"))(
          Resolver.ivyStylePatterns)
    ),

    scalaJSStage in Test := FastOptStage,
    pipelineStages := Seq(buildJS, concat),

    testFrameworks += new TestFramework("minitest.runner.Framework"),
    libraryDependencies ++= Seq(
      "io.monix" %%%! "minitest" % "0.22" % "test"
    ),

    Concat.groups := Seq(
      "assets/all.css" -> group(Seq(
        "libs/bootstrap-3.3.1.css",
        "libs/material-ripples-0.2.1.css",
        "libs/material-design-0.2.1.css",
        "libs/main.css"
      )),
      "assets/all-debug.js" -> group(Seq(
        "libs/jquery-2.1.3.js",
        "libs/bootstrap-3.3.1.js",
        "libs/material-design-0.2.1.js",
        "libs/material-ripples-0.2.1.js"
      )),
      "assets/all.js" -> group(Seq(
        "libs/jquery-2.1.3.js",
        "libs/bootstrap-3.3.1.js",
        "libs/material-design-0.2.1.js",
        "libs/material-ripples-0.2.1.js",
        "assets/parolamea-opt.js"
      ))
    ),

    buildJS := buildJSDefTask.value,
    buildJS <<= buildJS.dependsOn(fullOptJS in Compile),
    emitSourceMaps in fullOptJS := false
  )

  lazy val parolaMea = project.in(file("."))
    .settings(appSettings : _*)
    .enablePlugins(ScalaJSPlugin, SbtWeb)
}
