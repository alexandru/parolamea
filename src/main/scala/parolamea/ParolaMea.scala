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
