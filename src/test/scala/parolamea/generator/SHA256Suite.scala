package parolamea.generator

import minitest.SimpleTestSuite

object SHA256Suite extends SimpleTestSuite {
  test("selfTest") {
    val sha256 = SHA256()
    assert(sha256.selfTest)
  }
}
