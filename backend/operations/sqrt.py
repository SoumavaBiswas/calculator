from operations.base import Operation
import math

class sqrt(Operation):
    def execute(self, operands):
        if len(operands)!=1:
            raise ValueError("Sqrt takes exactly one argument")
        return math.sqrt(operands[0])

    def get_name(self):
        return "sqrt"