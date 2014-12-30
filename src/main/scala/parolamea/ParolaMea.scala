package parolamea

import parolamea.generator.Password
import scala.scalajs.js
import scala.scalajs.js.Dynamic

object ParolaMea extends js.JSApp with JSUtils {
  def main(): Unit = {
    $(() => {
      $.material.init()

      $("#generateForm").submit { event: Dynamic =>
        event.preventDefault()

        val newPassword = Password.generate(inputMasterKey(), inputIdentifier(), 4)
        val newPasswordHtml = newPassword.map(x => s"<span>$x</span>").mkString

        $("#generate-dialog .modal-body").html(newPasswordHtml)
        $("#generate-dialog").modal("toggle")
      }
    })
  }
}
