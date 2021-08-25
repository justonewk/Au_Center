const rewire = require("rewire")
const auto = rewire("./auto")
const clock = auto.__get__("clock")
// @ponicode
describe("clock", () => {
    test("0", () => {
        let callFunction = () => {
            clock()
        }
    
        expect(callFunction).not.toThrow()
    })
})
