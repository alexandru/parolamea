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

  lazy val mailToValue = {
    val array = Array[Int](
      109, 97, 105, 108, 116, 111, 58,
      99, 111, 110, 116, 97, 99, 116,
      64, 112, 97, 114, 111, 108, 97,
      109, 101, 97, 46, 111, 114, 103)

    new String(array.map(_.toChar))
  }
}
