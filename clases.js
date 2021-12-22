"use strict";
exports.__esModule = true;
exports.Operacion = void 0;
var Operacion = /** @class */ (function () {
    function Operacion(num1, num2, op) {
        this.num1 = num1;
        this.num2 = num2;
        this.op = op.toLowerCase();
    }
    Operacion.prototype.resultado = function () {
        switch (this.op) {
            case "suma":
                return this.num1 + this.num2;
                break;
            case "resta":
                return this.num1 - this.num2;
                break;
            default:
                return "Este metodo no cuenta con esa operación.";
                break;
        }
    };
    return Operacion;
}());
exports.Operacion = Operacion;
