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

import parolamea.generator.SHA256._

final class SHA256 private ()
  extends BaseHash("sha-256", 32, BLOCK_SIZE) {

  /** 256-bit interim result. */
  var h0, h1, h2, h3, h4, h5, h6, h7: Int = _

  protected def transform(in: Array[Byte], offset: Int): Unit = {
    val result = sha(h0, h1, h2, h3, h4, h5, h6, h7, in, offset)
    h0 = result(0)
    h1 = result(1)
    h2 = result(2)
    h3 = result(3)
    h4 = result(4)
    h5 = result(5)
    h6 = result(6)
    h7 = result(7)
  }

  protected def padBuffer: Array[Byte] = {
    val n = (count % BLOCK_SIZE).asInstanceOf[Int]   
    var padding = if (n < 56) 56 - n else 120 - n
    val result = new Array[Byte](padding + 8)

    // padding is always binary 1 followed by binary 0s
    result(0) = 0x80.toByte
    // save number of bits, casting the long to an array of 8 bytes
    val bits = count << 3

    result(padding) = (bits >>> 56).toByte
    padding += 1
    result(padding) = (bits >>> 48).toByte
    padding += 1
    result(padding) = (bits >>> 40).toByte
    padding += 1
    result(padding) = (bits >>> 32).toByte
    padding += 1
    result(padding) = (bits >>> 24).toByte
    padding += 1
    result(padding) = (bits >>> 16).toByte
    padding += 1
    result(padding) = (bits >>> 8).toByte
    padding += 1
    result(padding) = bits.toByte
    
    result
  }

  protected def getResult: Array[Byte] = {
    Array[Byte](
      (h0 >>> 24).toByte, (h0 >>> 16).toByte, (h0 >>> 8).toByte, h0.toByte, 
      (h1 >>> 24).toByte, (h1 >>> 16).toByte, (h1 >>> 8).toByte, h1.toByte,
      (h2 >>> 24).toByte, (h2 >>> 16).toByte, (h2 >>> 8).toByte, h2.toByte,
      (h3 >>> 24).toByte, (h3 >>> 16).toByte, (h3 >>> 8).toByte, h3.toByte,
      (h4 >>> 24).toByte, (h4 >>> 16).toByte, (h4 >>> 8).toByte, h4.toByte,
      (h5 >>> 24).toByte, (h5 >>> 16).toByte, (h5 >>> 8).toByte, h5.toByte,
      (h6 >>> 24).toByte, (h6 >>> 16).toByte, (h6 >>> 8).toByte, h6.toByte,
      (h7 >>> 24).toByte, (h7 >>> 16).toByte, (h7 >>> 8).toByte, h7.toByte)
  }

  protected def resetContext(): Unit = {
    // magic SHA-256 initialisation constants
    h0 = 0x6a09e667
    h1 = 0xbb67ae85
    h2 = 0x3c6ef372
    h3 = 0xa54ff53a
    h4 = 0x510e527f
    h5 = 0x9b05688c
    h6 = 0x1f83d9ab
    h7 = 0x5be0cd19
  }

  override def clone() = {
    val ref = new SHA256
    ref.h0 = this.h0
    ref.h1 = this.h1
    ref.h2 = this.h2
    ref.h3 = this.h3
    ref.h4 = this.h4
    ref.h5 = this.h5
    ref.h6 = this.h6
    ref.h7 = this.h7
    ref.count = this.count
    ref.buffer = this.buffer.clone()
    ref
  }

  def selfTest: Boolean =
    isValid
}

object SHA256 {
  def apply(): SHA256 = {
    new SHA256
  }

  implicit val builder = new Builder[SHA256] {
    def newInstance() = apply()
  }

  private final val k: Array[Int] = Array(
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
    0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
    0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
    0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
    0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
    0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  )

  private final val BLOCK_SIZE: Int = 64

  private final val DIGEST0: String =
    "BA7816BF8F01CFEA414140DE5DAE2223B00361A396177A9CB410FF61F20015AD"

  private val w = new Array[Int](64)

  private lazy val isValid = {
    val md = new SHA256
    md.update(0x61.toByte)
    md.update(0x62.toByte)
    md.update(0x63.toByte)
    val result: String = Util.toString(md.digest())
    DIGEST0 == result
  }

  private def sha(
    hh0: Int, hh1: Int, hh2: Int, hh3: Int, hh4: Int, hh5: Int,
    hh6: Int, hh7: Int, in: Array[Byte], offset: Int): Array[Int] = synchronized {

    var A = hh0
    var B = hh1
    var C = hh2
    var D = hh3
    var E = hh4
    var F = hh5
    var G = hh6
    var H = hh7
    var r, T, T2: Int = 0
    var inOffset = offset

    r = 0
    while (r < 16) {
      w(r) = in(inOffset) << 24 |
        (in(inOffset+1) & 0xFF) << 16 |
        (in(inOffset+2) & 0xFF) << 8 |
        (in(inOffset+3) & 0xFF)

      inOffset += 4
      r += 1
    }

    r = 16
    while (r < 64) {
      T = w(r - 2)
      T2 = w(r - 15)
      w(r) =
        (((T >>> 17) | (T << 15)) ^ ((T >>> 19) | (T << 13)) ^ (T >>> 10)) +
        w(r - 7) +
        (((T2 >>> 7) | (T2 << 25)) ^ ((T2 >>> 18) | (T2 << 14)) ^ (T2 >>> 3)) +
        w(r - 16)

      r += 1
    }

    r = 0
    while (r < 64) {
      T = (H
        + (((E >>> 6) | (E << 26))
        ^ ((E >>> 11) | (E << 21))
        ^ ((E >>> 25) | (E << 7)))
        + ((E & F) ^ (~E & G)) + k(r) + w(r))

      T2 = (((A >>> 2) | (A << 30))
        ^ ((A >>> 13) | (A << 19))
        ^ ((A >>> 22) | (A << 10))) + ((A & B) ^ (A & C) ^ (B & C))

      H = G
      G = F
      F = E
      E = D + T
      D = C
      C = B
      B = A
      A = T + T2

      r += 1
    }

    Array[Int](
      hh0 + A, hh1 + B, hh2 + C, hh3 + D,
      hh4 + E, hh5 + F, hh6 + G, hh7 + H
    )
  }
}

