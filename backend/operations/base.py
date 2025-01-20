from abc import ABC, abstractmethod
class Operation(ABC):
    @abstractmethod
    def execute(self, **args):
        pass

    @abstractmethod
    def get_name(self):
        pass
        
