module.exports = class extends Error {
    constructor(errors, status = 400) {
      const message = Object.values(errors).join(" ")
      const invalidArgs = Object.keys(errors)
      super(message)
      this.name = "ApiErrror"
      this.status = status
      this.invalidArgs = invalidArgs
    }
  }