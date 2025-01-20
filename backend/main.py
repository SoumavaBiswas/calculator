from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from operation_registry import OperationsRegistry
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"], allow_credentials=True)
operationRegistry = OperationsRegistry()
operationRegistry.load_operations()


@app.post("/api/calculator")
async def calculate(request: Request, data: dict):
    expression = data.get("expression", "")
    if not expression:
        raise HTTPException(status_code=400, detail="Expression is required")

    # Pre-process the expression to handle custom operations like LOG, Power (^), etc.
    for op_name in operationRegistry.operations.keys():
        if op_name.upper() in expression:
            # Replace custom operations with their corresponding functions
            expression = expression.replace(f"{op_name.upper()}(", f"{op_name.lower()}(")

    # Define a function to execute the operations from the registry
    def execute_operation(operator, operand):
        op = operationRegistry.get_operation(operator)
        if not op:
            raise HTTPException(status_code=400, detail=f"Invalid operation: {operator}")
        return op.execute(operand)

    try:
        # Safely evaluate the expression by passing in the operations context
        result = eval(expression, {
            "log": lambda x: execute_operation("log", [x]), 
            "pow": lambda x, y: execute_operation("pow", [x, y]), 
            "sqrt": lambda x: execute_operation("sqrt", [x])
            })
        return JSONResponse(content={"result": str(result)})
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error evaluating expression: {str(e)}")


@app.get("/api/operations")
async def get_operations():
    return  JSONResponse(content={"result": operationRegistry.list_operations()})