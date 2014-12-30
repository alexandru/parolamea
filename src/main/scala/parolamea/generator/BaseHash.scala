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
 * A base abstract class to facilitate generator implementations.
 *
 * @param name the canonical name prefix of this instance.
 * @param hashSize the block size of the output in bytes.
 * @param blockSize the block size of the internal transform.
 */
abstract class BaseHash(
  val name: String,
  val hashSize: Int,
  val blockSize: Int)
  extends IMessageDigest {

  /** Number of bytes processed so far. */
  protected var count: Long = 0L

  /** Temporary input buffer. */
  protected var buffer: Array[Byte] =
    new Array[Byte](blockSize)

  locally {
    resetContext()
  }

  def update(b: Byte) {
    val i: Int = (count % blockSize).asInstanceOf[Int]
    count += 1
    buffer(i) = b
    if (i == (blockSize - 1)) transform(buffer, 0)
  }

  def update(b: Array[Byte]): Unit = {
    update(b, 0, b.length)
  }

  def update(s: String): Unit = {
    update(Util.toBytes(s, "UTF-8"))
  }

  def update(b: Array[Byte], offset: Int, len: Int): Unit = {
    var n: Int = (count % blockSize).asInstanceOf[Int]
    count += len

    val partLen: Int = blockSize - n
    var i: Int = 0

    if (len >= partLen) {
      System.arraycopy(b, offset, buffer, n, partLen)
      transform(buffer, 0)

      i = partLen
      while (i + blockSize - 1 < len) {
        transform(b, offset + i)
        i += blockSize
      }

      n = 0
    }

    if (i < len) System.arraycopy(b, offset + i, buffer, n, len - i)
  }

  def digest(): Array[Byte] = {
    val tail: Array[Byte] = padBuffer
    update(tail, 0, tail.length)
    val result: Array[Byte] = getResult
    reset()
    result
  }

  def hexDigest(): String = {
    Util.toHexString(digest())
  }

  def reset(): Unit = {
    count = 0L
    var i: Int = 0
    val zero = 0.toByte

    while (i < blockSize) {
      i += 1
      buffer(i - 1) = zero
    }

    resetContext()
  }

  def selfTest: Boolean

  /**
   * Returns the byte array to use as padding before completing a generator
   * operation.
   *
   * @return the bytes to pad the remaining bytes in the buffer before
   *         completing a generator operation.
   */
  protected def padBuffer: Array[Byte]

  /**
   * Constructs the result from the contents of the current context.
   *
   * @return the output of the completed generator operation.
   */
  protected def getResult: Array[Byte]

  /** Resets the instance for future re-use. */
  protected def resetContext(): Unit

  /**
   * The block digest transformation per se.
   *
   * @param in the <i>blockSize</i> long block, as an array of bytes to digest.
   * @param offset the index where the data to digest is located within the
   *               input buffer.
   */
  protected def transform(in: Array[Byte], offset: Int)
}

