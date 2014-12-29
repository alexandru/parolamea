package parolamea.generator

case class Random(seed: Long) {
  def nextInt: (Int, Random) = {
    val newSeed = (seed * 0x5DEECE66DL + 0xBL) & 0xFFFFFFFFFFFFL
    val nextState = Random(newSeed)
    val n = (newSeed >>> 16).toInt
    (n, nextState)
  }
}

object Random {
  def from(ints: Array[Int]) = {
    val seed = ints.foldLeft(0L)((a, b) => 31 * a + b)
    Random(seed)
  }
}
