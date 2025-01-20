from operations.base import Operation
import math

class Log(Operation):
    def execute(self, operands):
        if len(operands)!=1:
            raise ValueError("Log takes exactly 1 argument")
        return math.log(operands[0])

    def get_name(self):
        return "log"