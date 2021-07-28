function ifEqual(a, b, options) {
  return (a == b) ? options.fn(this) : options.inverse(this)
}

module.exports = { ifEqual }