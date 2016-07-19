logLevel := Level.Warn

resolvers ++= Seq(
  Classpaths.sbtPluginReleases,

  Resolver.url("scala-js-releases",
    url("http://dl.bintray.com/content/scala-js/scala-js-releases"))(
      Resolver.ivyStylePatterns)
)

addSbtPlugin("org.scala-js" % "sbt-scalajs" % "0.6.9")

addSbtPlugin("net.ground5hark.sbt" % "sbt-concat" % "0.1.8")

libraryDependencies ++= Seq(
  "ch.qos.logback" % "logback-classic" % "1.1.2"
)
