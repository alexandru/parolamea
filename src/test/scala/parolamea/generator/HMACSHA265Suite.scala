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
