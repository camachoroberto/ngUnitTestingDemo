"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var strength_pipe_1 = require("./strength.pipe");
describe('StrengthPipe', function () {
    it('should diplay weak if strength is 5', function () {
        var pipe = new strength_pipe_1.StrengthPipe();
        var val = pipe.transform(5);
        expect(val).toEqual('5 (weak)');
    });
    it('should diplay strong if strength is 10', function () {
        var pipe = new strength_pipe_1.StrengthPipe();
        var val = pipe.transform(10);
        expect(val).toEqual('10 (strong)');
    });
});
//# sourceMappingURL=strengh.pipe.spec.js.map