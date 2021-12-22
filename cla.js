class Operacion{
    
    #num1;
    #num2; 
    #op;

    constructor(num1, num2, op){
        this.num1 = num1;
        this.num2 = num2;
        this.op = op.toLowerCase();
    }

    resultado(){
        switch (this.op) {
            case "suma":
                return this.num1 + this.num2 
                break;

            case "resta":
                return this.num1 - this.num2
                break;    
        
            default:
                return "Este metodo no cuenta con ese cálculo";
                break;
        }
    }
}

export {Operacion};