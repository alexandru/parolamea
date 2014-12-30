/*
* Copyright (c) 2014 by Alexandru Nedelcu. Some rights reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import com.typesafe.sbt.web.SbtWeb.autoImport._
import com.typesafe.sbt.web.pipeline.Pipeline
import com.typesafe.sbt.web.{PathMapping, SbtWeb}
import net.ground5hark.sbt.concat.SbtConcat.autoImport._
import net.ground5hark.sbt.css.SbtCssCompress.autoImport._
import org.scalajs.sbtplugin.ScalaJSPlugin
import org.scalajs.sbtplugin.ScalaJSPlugin.autoImport._
import sbt.Keys._
import sbt.{Build => SbtBuild, _}

object Build extends SbtBuild {
  val buildJS = TaskKey[Pipeline.Stage]("buildJS", "Build the fastOpt.js and copy it into the staging directory")

  val buildJSDefTask = Def.task { mappings: Seq[PathMapping] =>
    mappings ++ Seq(
      (crossTarget.value / "parolamea-opt.js", "assets/parolamea-opt.js"),
      (crossTarget.value / "parolamea-opt.js.map", "assets/parolamea-opt.js.map")
    )
  }

  val appSettings = Seq(
    name := "parolamea",
    version := "1.0",

    organization := "com.bionicspirit",
    scalaVersion := "2.11.4",

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
    pipelineStages := Seq(buildJS, concat, cssCompress),

    testFrameworks += new TestFramework("minitest.runner.Framework"),
    libraryDependencies ++= Seq(
      "org.monifu" %%%! "minitest" % "0.8" % "test"
    ),

    Concat.groups := Seq(
      "assets/all.css" -> group(Seq(
        "libs/bootstrap-3.3.1.css",
        "libs/material-ripples-0.2.1.css",
        "libs/material-wfont-0.2.1.css",
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
    buildJS <<= buildJS.dependsOn(fullOptJS in Compile)
  )

  lazy val parolaMea = project.in(file("."))
    .settings(appSettings : _*)
    .enablePlugins(ScalaJSPlugin, SbtWeb)
}
