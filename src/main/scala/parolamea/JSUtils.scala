package parolamea

import scala.scalajs.js
import scala.scalajs.js.Dynamic._

trait JSUtils {
  def $ = global.jQuery

  def inputMasterKey(): String = {
    $("#inputMasterKey").`val`()
      .asInstanceOf[String]
  }

  def inputIdentifier() = {
    $("#inputIdentifier").`val`()
      .asInstanceOf[String]
  }

  def generatedPassword(): String = {
    $("#generate-dialog .modal-body").text()
      .asInstanceOf[String]
  }

  def isUndefined(value: js.Any): Boolean = {
    js.typeOf(value) == "undefined"
  }

  lazy val userAgent = {
    global.navigator.userAgent.toLowerCase().asInstanceOf[String]
  }

  lazy val isIExplorer = {
    userAgent.indexOf("msie") != -1 || userAgent.indexOf("trident") != -1
  }
}
