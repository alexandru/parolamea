package parolamea

import parolamea.generator.Password

import scala.scalajs.js
import scala.scalajs.js.Dynamic
import scala.scalajs.js.Dynamic.global

object ParolaMea extends js.JSApp {
  def $ = global.jQuery

  def inputMasterKey(): String = {
    $("#inputMasterKey").`val`()
      .asInstanceOf[String]
  }

  def inputIdentifier() = {
    $("#inputIdentifier").`val`()
      .asInstanceOf[String]
  }

  def main(): Unit = {
    $(() => {
      $.material.init()

      $("#generateForm").submit { event: Dynamic =>
        event.preventDefault()
        val newPassword = Password.generate(inputMasterKey(), inputIdentifier(), 4)
          .map(x => s"<span>$x</span>").mkString

        $("#generate-dialog .modal-body").html(newPassword)
        $("#generate-dialog").modal("toggle")
      }
    })
//    jQuery(dom.document)
//      .ready(() => dom.alert("Hello, world!"))
  }
}
