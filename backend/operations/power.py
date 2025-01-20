from operations.base import Operation

class Power(Operation):
    def execute(self, operands):
        if len(operands)!=2:
            raise ValueError("Power function takes exactly two argument")
        return operands[0]**operands[1]
    
    def get_name(self):
        return "pow"