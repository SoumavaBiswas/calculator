import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import { CssBaseline, Box } from "@mui/material";
import Container from '@mui/material/Container';
import HistoryIcon from '@mui/icons-material/History';



const instance = axios.create({
    baseURL:"http://localhost:8001/api"
})

function Calculator() {

    let [expression, setExpression] = useState("");
    const [result, setResult] = useState("");
    const [history, setHistory] = useState([]);
    const [historyCount, setHistoryCount] = useState(0);
    const [operations, setOperations] = useState([])


    const handleBasicOperation = (e) => {
        let new_expression = ''
        if(!result){
            new_expression = expression.concat(e.target.innerText)
        }
        else{
            new_expression = result.concat(e.target.innerText)
            setResult('')
        }
        setExpression(new_expression)
       
    }

    const handleClear = () => {
        setResult("")
        setExpression("")
    }

    const handleSubmit = () => {

        const powPattern = /(\d+)POW(\d+)/

        if (powPattern.test(expression)) {
            const transformedExpression = expression.replace(powPattern, (match, p1, p2) => {
                return `POW(${p1},${p2})`;
            });
            setExpression(transformedExpression);  
        }
        async function evaluate(){
            try{
                const evaluated_result = await instance.post("/calculator",{expression})
                console.log(evaluated_result)
                setResult(evaluated_result.data.result)
                setHistory([...history, {expression: expression, result: evaluated_result.data.result}])
            }catch(e){
                console.log(e)
            }
        }
        evaluate()
    }


    const handleCustomOperation = (e) => {
        let operation = e.target.innerText
        setExpression(`${operation}(${expression})`)
    }

    useEffect(()=>{
        async function fetchOperations(){
            
            try{
                const operationResponse = await instance.get('/operations')
                setOperations(operationResponse.data["result"])
            }
            catch(e){
                console.log(e)
            }
        }
        fetchOperations()
    }, [])

    const handleHistory = () => {
        setHistoryCount(historyCount + 1);
        if (history.length > 0) {
            const lastEntry = historyCount > 0 ? history[history.length - 1] : history[history.length - 2];
            console.log(history);
            console.log(lastEntry.expression, lastEntry.result);
            setExpression(lastEntry.expression);
            setResult(lastEntry.result);
            history.pop()
        }
    }
   
    return (
        <>
            <CssBaseline />
                <Container maxWidth="sm">
                    <h1>Simple Calculator</h1>
                    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>

                    {/* Show Expression */}
                    <TextField
                        id="expression"
                        variant="outlined"
                        value={expression}
                        readOnly
                        
                    />

                    {/* Show Result */}
                    <TextField
                        id="result"
                        variant="outlined"
                        value={result}
                        readOnly
                        
                    />

                    {/* History Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleHistory}
                        startIcon={<HistoryIcon />}
                    >
                        History
                    </Button>
                    </Box>
                    <ButtonGroup variant="outlined" aria-label="Basic button group">
                        {[1, 2, 3, '+'].map((num)=>(
                             <Button key={num} onClick={handleBasicOperation}>{num}</Button>
                        ))}
                    </ButtonGroup><br/>
                    <ButtonGroup variant="outlined" aria-label="Basic button group">
                        {[4, 5, 6, '-'].map((num)=>(
                                <Button key={num} onClick={handleBasicOperation}>{num}</Button>
                            ))}
                    </ButtonGroup><br/>
                    <ButtonGroup variant="outlined" aria-label="Basic button group">
                        {[7, 8, 9, '*'].map((num)=>(
                                <Button key={num} onClick={handleBasicOperation}>{num}</Button>
                            ))}
                    </ButtonGroup><br/>
                    <ButtonGroup variant="outlined" aria-label="Basic button group">
                        {
                            [0, '=', "/", "C"].map((num) => {
                                if (num === "C") {
                                    return <Button key={num} onClick={handleClear}>{num}</Button>;
                                } else if (num === "=") {
                                    return <Button key={num} onClick={handleSubmit}>{num}</Button>;
                                } else {
                                    return <Button key={num} onClick={handleBasicOperation}>{num}</Button>;
                                }
                            })
                        }
                    </ButtonGroup><br/>
                    <ButtonGroup variant="outlined" aria-label="Basic button group">
                        {
                            operations.map((num) => (
                                (num!=="%") && (num!=="pow")?<Button key={num} onClick={handleCustomOperation}>{num}</Button>:
                                    <Button key={num} onClick={handleBasicOperation}>{num}</Button>
                            
                            ))
                        }
                    </ButtonGroup><br/>
            </Container>
        </>

    );
}
export default Calculator;