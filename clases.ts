class Operacion{
    
    private num1: number;
    private num2: number;
    private op: string;

    constructor(num1: number, num2: number, op: string){
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




