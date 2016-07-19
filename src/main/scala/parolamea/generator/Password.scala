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

package parolamea.generator

object Password {
  def generate(masterKey: String, identifier: String): List[String] = {
    val string = {
      val hmac = HMAC[SHA256](identifier + secret)
      hmac.update(masterKey)
      val bytes = hmac.digest()
      val encoded = Base64.encode(bytes, alphabet)
      val last2digits = (encoded.reverse.filter(digits).take(2).toArray ++ Seq('8', '4'))
        .take(2).map(_.toString)

      encoded
        .replace("=", "")
        .replace("+", last2digits(0))
        .replace("/", last2digits(1))
    }

    List(
      string.substring(0, 4),
      string.substring(4, 8),
      string.substring(8, 12),
      string.substring(12, 16)
    )
  }

  private[this] final val secret =
    "N7~H7{P:0y_^7IMOh9B<J]Obhk!GQI7^Z4X)[n04q2'7*Sy:k6O{)[}F-l0sl9>x"

  private[this] final val digits =
    Set('0', '1', '2', '3', '4', '5', '6', '7', '8', '9')

  private[this] final val alphabet = Array(
    "u", "R", "U", "E", "X", "m", "W", "F",
    "w", "j", "K", "Z", "r", "e", "3", "0",
    "G", "J", "v", "N", "B", "O", "V", "d",
    "6", "n", "+", "z", "7", "g", "q", "x",
    "s", "Q", "p", "k", "5", "C", "o", "t",
    "h", "/", "b", "f", "D", "L", "4", "Y",
    "2", "1", "c", "a", "T", "H", "S", "P",
    "M", "l", "9", "i", "A", "I", "8", "y"
  )
}
