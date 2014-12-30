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

import parolamea.generator.HMAC._

final class HMAC[MD <: IMessageDigest : Builder] private (key: Array[Byte])
  extends IMessageDigest {

  private[this] val builder = implicitly[Builder[MD]]
  private[this] val instance = builder.newInstance()

  val name = "hmac-" + instance.name
  val blockSize = instance.blockSize
  val hashSize = instance.hashSize

  private[this] var currentKey = Array.empty[Byte]
  private[this] var oKeyPad = Array.empty[Byte]
  private[this] var iKeyPad = Array.empty[Byte]
  private[this] var shouldReset = true

  def reset(): Unit = {
    shouldReset = false
    instance.reset()
    currentKey = newCleanKey()

    if (oKeyPad.isEmpty)
      oKeyPad = for (b <- currentKey) yield trans5C(b)

    if (iKeyPad.isEmpty)
      iKeyPad = for (b <- currentKey) yield trans36(b)

    instance.update(iKeyPad)
  }

  def update(in: Array[Byte], offset: Int, length: Int) = {
    if (shouldReset) reset()
    instance.update(in, offset, length)
  }

  def update(s: String) = {
    if (shouldReset) reset()
    instance.update(s)
  }

  def update(b: Byte) = {
    if (shouldReset) reset()
    instance.update(b)
  }

  def update(in: Array[Byte]) = {
    if (shouldReset) reset()
    instance.update(in)
  }

  def digest(): Array[Byte] = {
    if (shouldReset) reset()
    shouldReset = true

    val digestedMsg = instance.digest()
    instance.update(oKeyPad)
    instance.update(digestedMsg)
    instance.digest()
  }

  def hexDigest(): String = {
    if (shouldReset) reset()
    Util.toHexString(digest())
  }

  lazy val selfTest: Boolean = {
    val ref = HMAC[MD]("my-key")
    ref.update("my-password")
    ref.hexDigest() == "620A23F782EE3F3A6E9D1833690DAA89F4672BAABFDFB599D2AB2AE6C0B9ED13"
  }

  private[this] def newCleanKey(): Array[Byte] = synchronized {
    val newKey = new Array[Byte](blockSize)

    if (key.length > blockSize) {
      instance.update(key)
      val d = instance.digest()
      System.arraycopy(d, 0, newKey, 0, d.length)
    }
    else {
      System.arraycopy(key, 0, newKey, 0, key.length)
    }

    newKey
  }
}

object HMAC {
  def apply[MD <: IMessageDigest : Builder](key: Array[Byte]): HMAC[MD] = {
    new HMAC(key)
  }

  def apply[MD <: IMessageDigest : Builder](key: String): HMAC[MD] = {
    new HMAC(Util.toBytes(key, "UTF-8"))
  }
  
  private val trans5C = (for (x <- 0 until 256) yield (x ^ 0x5c).toByte).toArray
  private val trans36 = (for (x <- 0 until 256) yield (x ^ 0x36).toByte).toArray
}