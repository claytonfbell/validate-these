const vr = require("validator")
const sentenceCase = require("sentence-case")

const ApiError = require("./ApiError")

class validate {
  static instanceOf(nameValue, label) {
    return new Validator(nameValue, label)
  }

  constructor(nameValue, label = null) {
    this.name = Object.keys(nameValue)[0]
    this.value = Object.values(nameValue)[0]
    this.label = label === null ? sentenceCase(this.name) : label
  }

  fail(message) {
    throw new ApiError({ [this.name]: message }, 400, [this.name])
  }

  notNull() {
    if (this.value === null) {
      this.fail(`Value for **${this.label}** is missing.`)
    }
    return this
  }

  notEmpty() {
    this.notNull()
    if (this.value === "") {
      this.fail(`Value for **${this.label}** is empty.`)
    }
    return this
  }

  min(x) {
    this.notNull()
    if (x > 0) {
      this.notEmpty()
    }
    if (typeof this.value === "string") {
      if (this.value.length < x) {
        this.fail(
          `Value for **${this.label}** must be at least **${x}** characters.`
        )
      }
    }
    return this
  }

  max(x) {
    this.notNull()
    if (typeof this.value === "string") {
      if (this.value.length > x) {
        this.fail(
          `Value for **${this.label}** must be less than **${x}** characters.`
        )
      }
    }
    return this
  }

  greaterThanZero() {
    return this.greaterThan(0)
  }

  greaterThan(x) {
    this.notNull()
    if (typeof this.value === "number") {
      if (this.value <= x) {
        this.fail(`Value for **${this.label}** must be greater than **${x}**.`)
      }
    }
    return this
  }

  email() {
    this.notNull().min(5)

    if (!vr.isEmail(this.value)) {
      this.fail(`**Email address** does not look valid.`)
    }
    return this
  }

  match(regex) {
    const pattern = new RegExp(regex)
    const matched = pattern.test(this.value)
    if (!matched) {
      this.fail(`Value for **${this.label}** does not look valid.`)
    }
    return this
  }

  phone(allowBlank = false) {
    this.notNull()
    if (allowBlank === true) {
      if (this.value === "") {
        return this // allowing empty string
      }
    }
    return this.min(10)
      .max(20)
      .match("^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$")
  }

  numericString() {
    return this.min(1).match("^[0-9]+$")
  }

  boolean() {
    this.notNull()
    if (this.value !== true && this.value !== false) {
      this.fail(`Value for **${this.label}** does not look valid.`)
    }
    return this
  }
}

module.exports = validate
