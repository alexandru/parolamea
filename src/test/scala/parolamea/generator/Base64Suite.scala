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
import parolamea.generator.Base64._

object Base64Suite extends SimpleTestSuite {
  test("simple test") {
    assertEquals(
      Base64.encode("ABCDEFG".getBytes),
      "QUJDREVGRw==")

    assertEquals(
      Base64.encode(Util.toBytes("Hello world!", "UTF-8")),
      "SGVsbG8gd29ybGQh"
    )
  }

  test("UTF-16") {
    assertEquals(
      Base64.encode(Util.toBytes("ᚠᛇᚻ᛫ᛒᛦᚦ᛫ᚠᚱᚩᚠᚢᚱ᛫ᚠᛁᚱᚪ᛫ᚷᛖᚻᚹᛦᛚᚳᚢᛗ", "UTF-8")),
      "4Zqg4ZuH4Zq74Zur4ZuS4Zum4Zqm4Zur4Zqg4Zqx4Zqp4Zqg4Zqi4Zqx4Zur4Zqg4ZuB4Zqx4Zqq4Zur4Zq34ZuW4Zq74Zq54Zum4Zua4Zqz4Zqi4ZuX"
    )
  }
}
