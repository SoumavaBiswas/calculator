from operations.base import Operation

class Mod(Operation):
    def execute(self, operands):
        if len(operands)!=2:
            raise ValueError("Mod takes exactly two arguments")
        return operands[0] % operands[1]
    
    def get_name(self):
        return "%"