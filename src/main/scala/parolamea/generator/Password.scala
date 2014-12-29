package parolamea.generator

object Password {
  def generate(masterKey: String, identifier: String, groupCount: Int): List[String] = {
    val hmac = HMAC[SHA256](identifier + secret)
    hmac.update(masterKey)

    val bytes = hmac.digest()
    val ints = {
      val ints = new Array[Int](bytes.length / 4)
      var intsIdx = 0
      var bytesIdx = 0
      while (intsIdx < ints.length) {
        ints(intsIdx) = bytes(bytesIdx) << 24 |
          (bytes(bytesIdx+1) & 0xFF) << 16 |
          (bytes(bytesIdx+2) & 0xFF) << 8 |
          (bytes(bytesIdx+3) & 0xFF)

        bytesIdx += 4
        intsIdx += 1
      }
      ints
    }

    val groups = new Array[String](groupCount)
    var random0 = Random.from(ints)

    for (idx <- 0 until groupCount) {
      val (r1, random1) = random0.nextInt
      val (r2, random2) = random1.nextInt
      val (r3, random3) = random2.nextInt
      val (r4, random4) = random3.nextInt

      groups(idx) =
        letters(math.abs(r1) % letters.length) +
        letters(math.abs(r2) % letters.length) +
        letters(math.abs(r3) % letters.length) +
        letters(math.abs(r4) % letters.length)

      random0 = random4
    }

    groups.toList
  }

  final val letters = Array(
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
    "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
    "u", "v", "w", "x", "y", "z", "A", "B", "C", "D",
    "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
    "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X",
    "Y", "Z")

  private[this] final val secret =
    "NkSCwmKP95Wpi6xu"
}
