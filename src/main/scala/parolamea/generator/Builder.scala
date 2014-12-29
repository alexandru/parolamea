package parolamea.generator

trait Builder[T] {
  def newInstance(): T
}
