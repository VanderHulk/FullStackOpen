// logging functions
// information for printing normal log messages and error for all error messages

const info = (...params) => {
  // condition is for looger not to print to the console in test mode
  if(process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

const error = (...params) => {
  if(process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

module.exports = { info, error }