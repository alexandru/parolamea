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

import org.scalajs.sbtplugin.ScalaJSPlugin
import org.scalajs.sbtplugin.ScalaJSPlugin.autoImport._
import sbt.{Build => SbtBuild, _}
import sbt.Keys._

object Build extends SbtBuild {
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

    testFrameworks += new TestFramework("minitest.runner.Framework"),

    persistLauncher := true,
    persistLauncher in Test := false,
    scalaJSStage in Test := FastOptStage,

    libraryDependencies ++= Seq(
      "org.monifu" %%%! "minitest" % "0.8" % "test"
    ),

    jsDependencies +=
      "org.webjars" % "jquery" % "2.1.3" / "jquery.js",

    skip in packageJSDependencies := false
  )

  lazy val parolaMea = project.in(file("."))
    .settings(appSettings : _*)
    .enablePlugins(ScalaJSPlugin)
}
