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

/**
 * Base64 encoder / decoder.
 */

object Base64 {
  final val alphabet = Array(
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
    "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
    "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d",
    "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
    "o", "p", "q", "r", "s", "t", "u", "v", "w", "x",
    "y", "z", "0", "1", "2", "3", "4", "5", "6", "7",
    "8", "9", "+", "/")

  def encode(bytes: Array[Byte], chars: Array[String] = alphabet): String = {
    def sixBits(x: Array[Byte]): Seq[Int] = {
      val a = (x(0) & 0xfc) >> 2
      val b = ((x(0) & 0x3) << 4) + ((x(1) & 0xf0) >> 4)
      val c = ((x(1) & 0xf) << 2) + ((x(2) & 0xc0) >> 6)
      val d = x(2) & 0x3f
      Seq(a, b, c, d)
    }

    val pad = (3 - bytes.length % 3) % 3

    val decoded = (bytes ++ Array[Byte](0, 0).take(pad)).grouped(3)
      .flatMap(sixBits)
      .map(chars)
      .toSeq
      .dropRight(pad)

    (decoded :+ ("=" * pad)).mkString
  }
}
