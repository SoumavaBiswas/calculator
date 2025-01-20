
from operations.base import Operation
import os
import importlib


class OperationsRegistry:
    def __init__(self):
        self.operations = {}

    def register_operation(self, operation):
        self.operations[operation.get_name()] = operation
    

    def load_operations(self, directory="operations"):
        for filename in os.listdir(directory):
            if filename.endswith(".py") and filename!="base.py":
                module_name = f'{directory}.{filename[:-3]}'
                modlib = importlib.import_module(module_name)
        
                for attr in dir(modlib):
                    obj = getattr(modlib, attr)
                    if isinstance(obj, type) and issubclass(obj, Operation) and obj != Operation:
                        self.register_operation(obj())
    
    def get_operation(self, name):
        return self.operations[name]

    def list_operations(self):
        return list(self.operations)