const rewire = require("rewire")
const index = rewire("./index")
const test = index.__get__("test")
// @ponicode
describe("test", () => {
    test("0", () => {
        let callFunction = () => {
            test("Île-de-France", "foo bar")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            test("Île-de-France", "Foo bar")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            test("Florida", "Foo bar")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            test("Florida", "This is a Text")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            test("Île-de-France", "This is a Text")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            test(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
