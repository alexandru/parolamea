package parolamea.generator

import minitest.SimpleTestSuite

object PasswordSuite extends SimpleTestSuite {
  test("should work") {
    val pw1 = Password.generate("my-master-password", "facebook.com", 4).mkString("-")
    assertEquals(pw1, "It14-E5L9-Rb81-E6af")

    val pw2 = Password.generate("ᚠᛇᚻ᛫ᛒᛦᚦ᛫ᚠᚱᚩᚠᚢᚱ᛫ᚠᛁᚱᚪ᛫ᚷᛖᚻᚹᛦᛚᚳᚢᛗ", "facebook.com", 4).mkString("-")
    assertEquals(pw2, "t4aC-olnD-P7cu-IxWU")
  }
}
