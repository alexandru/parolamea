# parolamea

<a href="https://alexandru.github.io/parolamea/">
  <img src="src/main/public/icons/icon-96x96.png" border="0" align="right" />
</a>

A simple password generator, as an alternative to
[1Password](https://agilebits.com/onepassword)
or [LastPass](https://lastpass.com/).

"*Parola mea*" means "*my password*" in Romanian. I wanted a simple solution
for being able to use unique and strong passwords for all of my accounts, but without
the expense of the available solutions and without the possibility of being locked-out
of some online account.

Try it out: <a href="https://passgen.alexn.org/">https://passgen.alexn.org</a>

<a href="https://travis-ci.org/alexandru/parolamea"><img src="https://travis-ci.org/alexandru/parolamea.svg?branch=master" border="0" /></a>

## Details

The application takes an *identifier*, which can be the name of an online service
like *facebook.com*, or maybe an username and a *master key*, which is say the secret
global password and based on that the application generates a strong 16 chars password
that contains numbers and letters, both lower and upper case.

The actual generation is based on [HMAC-SHA256](http://en.wikipedia.org/wiki/Hash-based_message_authentication_code)
hashing, which is encoded as base 64, with some small twists. Here's a sample output:

```
cEjHheXOfDn2Shxq
```

You can then copy/paste that wherever you want and this is just a web page,
it's available everywhere you want it to. Nothing gets stored either server-side
or client-side, nothings gets sent over the wire.

Since it uses [HTML5 offline caching](http://diveintohtml5.info/offline.html), it's also
available even if offline, being optimized for mobile phones too. Just add it to your
home-screen and you're good to go.

## Technical details

Random trivia:

- the project is just a static website, built on top of [Scala.js](http://www.scala-js.org/)
  and [sbt-web](https://github.com/sbt/sbt-web) (yes, the whole logic is built in Scala
  and not Javascript)
- uses [Twitter's Bootstrap](http://getbootstrap.com/) with the
  [Material Design](http://www.google.ro/design/spec/material-design/introduction.html)
  [extensions](https://github.com/FezVrasta/bootstrap-material-design) by Fez Vrasta
- works in offline mode
- optimized for Chrome and Firefox for desktop and Android and Safari for iOS

To build the project, you first need to download [SBT](http://www.scala-sbt.org/) and
then in the project's directory:

```
sbt web-stage
```

The static website is available at `target/web/stage/` and you can run it directly.

## License

All code in this repository is licensed under the GNU Affero General Public License, version 3.
See [LICENCE.txt](./LICENSE.txt) for details.
