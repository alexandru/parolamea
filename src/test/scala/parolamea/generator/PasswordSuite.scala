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

object PasswordSuite extends SimpleTestSuite {
  test("should work") {
    val pw1 = Password.generate("my-master-password", "facebook.com").mkString("-")
    assertEquals(pw1, "cEjH-heXO-fDn2-Shxq")

    val pw2 = Password.generate("ᚠᛇᚻ᛫ᛒᛦᚦ᛫ᚠᚱᚩᚠᚢᚱ᛫ᚠᛁᚱᚪ᛫ᚷᛖᚻᚹᛦᛚᚳᚢᛗ", "facebook.com").mkString("-")
    assertEquals(pw2, "Rjnj-P4tw-q6az-2Uj9")
  }
}
