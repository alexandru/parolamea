package parolamea.generator

/**
 * The basic visible methods of any generator algorithm.
 * <p>
 * A generator (or message digest) algorithm produces its output by iterating a basic
 * compression function on blocks of data.
 */
trait IMessageDigest extends Cloneable {
  /**
   * Returns the canonical name of this algorithm.
   *
   * @return the canonical name of this instance.
   */
  def name: String

  /**
   * Returns the output length in bytes of this message digest algorithm.
   *
   * @return the output length in bytes of this message digest algorithm.
   */
  def hashSize: Int

  /**
   * Returns the algorithm's (inner) block size in bytes.
   *
   * @return the algorithm's inner block size in bytes.
   */
  def blockSize: Int

  /**
   * Continues a message digest operation using the input string.
   *
   * @param s the input string to digest.
   */
  def update(s: String): Unit

  /**
   * Continues a message digest operation using the input byte.
   *
   * @param b the input byte to digest.
   */
  def update(b: Byte)

  /**
   * Continues a message digest operation, by filling the buffer, processing
   * data in the algorithm's HASH_SIZE-bit block(s), updating the context and
   * count, and buffering the remaining bytes in buffer for the next operation.
   *
   * @param in the input block.
   */
  def update(in: Array[Byte])

  /**
   * Continues a message digest operation, by filling the buffer, processing
   * data in the algorithm's HASH_SIZE-bit block(s), updating the context and
   * count, and buffering the remaining bytes in buffer for the next operation.
   *
   * @param in the input block.
   * @param offset start of meaningful bytes in input block.
   * @param length number of bytes, in input block, to consider.
   */
  def update(in: Array[Byte], offset: Int, length: Int)

  /**
   * Completes the message digest by performing final operations such as padding
   * and resetting the instance.
   *
   * @return the array of bytes representing the generator value.
   */
  def digest(): Array[Byte]

  /**
   * Completes the message digest by performing final operations such as padding
   * and resetting the instance.
   *
   * @return representing the generator value as a string.
   */
  def hexDigest(): String

  /**
   * Resets the current context of this instance clearing any eventually cached
   * intermediary values.
   */
  def reset(): Unit

  /**
   * A basic test. Ensures that the digest of a pre-determined message is equal
   * to a known pre-computed value.
   *
   * @return <code>true</code> if the implementation passes a basic self-test.
   *         Returns <code>false</code> otherwise.
   */
  def selfTest: Boolean
}