package parolamea.generator

object Util {
  def toBytes(s: String, encoding: String): Array[Byte] = {
    val bytes = s.getBytes(encoding)
    var trailingZero = bytes.length
    while (bytes(trailingZero - 1) == 0) trailingZero -= 1

    if (trailingZero < bytes.length) {
      val newArray = new Array[Byte](trailingZero)
      System.arraycopy(bytes, 0, newArray, 0, trailingZero)
      newArray
    }
    else
      bytes
  }

  /**
   * <p>Returns a string of hexadecimal digits from a byte array, starting at
   * <code>offset</code> and consisting of <code>length</code> bytes. Each byte
   * is converted to 2 hex symbols; zero(es) included.</p>
   *
   * @param ba the byte array to convert.
   * @param offset the index from which to start considering the bytes to
   *               convert.
   * @param length the count of bytes, starting from the designated offset to
   *               convert.
   * @return a string of hexadecimal characters (two for each byte)
   *         representing the designated input byte sub-array.
   */
  def toString(ba: Array[Byte], offset: Int, length: Int): String = {
    val buf: Array[Char] = new Array[Char](length * 2)

    var i: Int = 0
    var j: Int = 0
    var k: Int = 0

    while (i < length) {
      k = ba(offset + i)
      i += 1

      buf(j) = HEX_DIGITS((k >>> 4) & 0x0F)
      j += 1

      buf(j) = HEX_DIGITS(k & 0x0F)
      j += 1
    }

    new String(buf)
  }

  /**
   * <p>Returns a string of hexadecimal digits from a byte array. Each byte is
   * converted to 2 hex symbols; zero(es) included.</p>
   *
   * <p>This method calls the method with same name and three arguments as:</p>
   *
   * <pre>
   * toString(ba, 0, ba.length);
   * </pre>
   *
   * @param ba the byte array to convert.
   * @return a string of hexadecimal characters (two for each byte)
   *         representing the designated input byte array.
   */
  def toString(ba: Array[Byte]): String = {
    toString(ba, 0, ba.length)
  }

  private final val HEX_DIGITS: Array[Char] =
    "0123456789ABCDEF".toCharArray
}


