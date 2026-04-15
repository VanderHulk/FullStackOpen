// logging functions
// information for printing normal log messages and error for all error messages

const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}

module.exports = { info, error }