logLevel := Level.Warn

resolvers ++= Seq(
  Classpaths.sbtPluginReleases,

  Resolver.url("scala-js-releases",
    url("http://dl.bintray.com/content/scala-js/scala-js-releases"))(
      Resolver.ivyStylePatterns)
)

addSbtPlugin("org.scala-js" % "sbt-scalajs" % "0.6.0-M3")

addSbtPlugin("net.ground5hark.sbt" % "sbt-concat" % "0.1.8")

addSbtPlugin("net.ground5hark.sbt" % "sbt-css-compress" % "0.1.3")

addSbtPlugin("com.typesafe.sbt" % "sbt-uglify" % "1.0.3")

libraryDependencies ++= Seq(
//  "commons-io" % "commons-io" % "2.4",
//  "ch.qos.logback" % "logback-classic" % "1.1.2"
)
