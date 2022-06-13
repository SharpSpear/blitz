export default class Debouncer {
  timeout: null | ReturnType<typeof setTimeout>
  n: number
  func: Function

  constructor(func, n) {
    this.timeout = null
    this.n = n || 500
    this.func = func
  }

  execute = (e) => {
    this.cancel()
    this.timeout = setTimeout(() => {
      this.func(e)
    }, this.n)
  }

  cancel = () => {
    if (this.timeout) clearTimeout(this.timeout)
  }
}
