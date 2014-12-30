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

object HMACSHA265Suite extends SimpleTestSuite {
  test("my-key, my-password") {
    val hmac = HMAC[SHA256]("my-key")
    hmac.update("my-password")

    assertEquals(
      hmac.hexDigest(),
      "620A23F782EE3F3A6E9D1833690DAA89F4672BAABFDFB599D2AB2AE6C0B9ED13"
    )

    hmac.update("my-password")

    assertEquals(
      hmac.hexDigest(),
      "620A23F782EE3F3A6E9D1833690DAA89F4672BAABFDFB599D2AB2AE6C0B9ED13"
    )
  }

  test("selfTest") {
    val hmac = HMAC[SHA256]("my-key")
    assert(hmac.selfTest)
  }
}
