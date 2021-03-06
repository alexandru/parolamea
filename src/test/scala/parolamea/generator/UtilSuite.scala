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

import minitest.SimpleTestSuite

object UtilSuite extends SimpleTestSuite {
  test("toBytes(UTF-16)") {
    assertEquals(
      Util.toBytes("hello-world", "UTF-16").toList,
      List[Byte](
        -2, -1, 0, 104, 0, 101,
        0, 108, 0, 108, 0, 111,
        0,  45, 0, 119, 0, 111,
        0, 114, 0, 108, 0, 100
      ))

    assertEquals(
      Util.toBytes("ᚠᛇᚻ᛫ᛒᛦᚦ᛫ᚠᚱᚩᚠᚢᚱ᛫ᚠᛁᚱᚪ᛫ᚷᛖᚻᚹᛦᛚᚳᚢᛗ", "UTF-16").toList,
      List[Byte](
        -2, -1, 22, -96, 22, -57, 22,
        -69, 22, -21, 22, -46, 22, -26,
        22, -90, 22, -21, 22, -96, 22,
        -79, 22, -87, 22, -96, 22, -94,
        22, -79, 22, -21, 22, -96, 22, -63,
        22, -79, 22, -86, 22, -21, 22, -73,
        22, -42, 22, -69, 22, -71, 22, -26,
        22, -38, 22, -77, 22, -94, 22, -41
      ))

    assertEquals(
      Util.toBytes("𝌆", "UTF-16").toList,
      List[Byte](
        -2, -1, -40, 52, -33, 6
      ))
  }

  test("toBytes(UTF-8)") {
    assertEquals(
      Util.toBytes("hello-world", "UTF-8").toList,
      List[Byte](
        104, 101, 108, 108, 111,
        45, 119, 111, 114, 108, 100
      ))

    assertEquals(
      Util.toBytes("ᚠᛇᚻ᛫ᛒᛦᚦ᛫ᚠᚱᚩᚠᚢᚱ᛫ᚠᛁᚱᚪ᛫ᚷᛖᚻᚹᛦᛚᚳᚢᛗ", "UTF-8").toList,
      List[Byte](
        -31, -102, -96, -31, -101, -121, -31,
        -102, -69, -31, -101, -85, -31, -101,
        -110, -31, -101, -90, -31, -102, -90,
        -31, -101, -85, -31, -102, -96, -31,
        -102, -79, -31, -102, -87, -31, -102,
        -96, -31, -102, -94, -31, -102, -79,
        -31, -101, -85, -31, -102, -96, -31,
        -101, -127, -31, -102, -79, -31, -102,
        -86, -31, -101, -85, -31, -102, -73,
        -31, -101, -106, -31, -102, -69, -31,
        -102, -71, -31, -101, -90, -31, -101,
        -102, -31, -102, -77, -31, -102, -94,
        -31, -101, -105
      ))

    assertEquals(
      Util.toBytes("𝌆", "UTF-8").toList,
      List[Byte](-16, -99, -116, -122))
  }
}
