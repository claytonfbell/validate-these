const validate = require("./index")

test("invalid email", () => {
  const email = "bad-email"
  expect(() => validate({ email }).email()).toThrow()
})

test("valid email", () => {
  const email = "claytonfbell@gmail.com"
  expect(validate({ email }).email())
})

test("invalid phone", () => {
  const phone = "bad-phone"
  expect(() => validate({ phone }).phone()).toThrow()
})

test("valid phone", () => {
  const phone = "555-555-5555"
  expect(validate({ phone }).phone())
})

test("invalid notNull", () => {
  const name = null
  expect(() => validate({ name }).notNull()).toThrow()
})

test("valid notNull", () => {
  const name = "Clay"
  expect(validate({ name }).notNull())
})

test("invalid notEmpty", () => {
  const name = ""
  expect(() => validate({ name }).notEmpty()).toThrow()
})

test("valid notEmpty", () => {
  const name = "Clay"
  expect(validate({ name }).notEmpty())
})

test("invalid min", () => {
  const name = "a"
  expect(() => validate({ name }).min(2)).toThrow()
})

test("valid min", () => {
  const name = "aa"
  expect(validate({ name }).min(2))
})

test("invalid max", () => {
  const name = "aaa"
  expect(() => validate({ name }).max(2)).toThrow()
})

test("valid max", () => {
  const name = "aa"
  expect(validate({ name }).max(2))
})

test("invalid boolean", () => {
  const name = "aaa"
  expect(() => validate({ name }).boolean()).toThrow()
})

test("valid boolean", () => {
  const name = false
  expect(validate({ name }).boolean())
})

test("invalid numericString", () => {
  const name = "aaa"
  expect(() => validate({ name }).numericString()).toThrow()
})

test("valid numericString", () => {
  const name = "01234"
  expect(validate({ name }).numericString())
})

test("invalid match", () => {
  const name = "aaa"
  expect(() => validate({ name }).match(/^aaa[0-9]+$/)).toThrow()
})

test("valid match", () => {
  const name = "aaa22"
  expect(validate({ name }).match(/^aaa[0-9]+$/))
})

test("invalid greaterThan", () => {
  const name = 2
  expect(() => validate({ name }).greaterThan(2)).toThrow()
})

test("valid greaterThan", () => {
  const name = 3
  expect(validate({ name }).greaterThan(2))
})
