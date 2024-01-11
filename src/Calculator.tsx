import "./App.css";
import { useEffect, useState } from "react";
import {unzip} from "zlib";
import {freemem} from "os";

export const Calculator = () => {
    const [result, setResult] = useState<number>(0);
    const [display, setDisplay] = useState<number | string>(0);
    const [firstNumber, setFirstNumber] = useState<number>(0)
    const [secondNumber, setSecondNumber] = useState<number>(0)
    const [restNumber, setRestNumber] = useState<number>(0)
    const [isCalculate, setIsCalculate] = useState<boolean>(false)
    const [operator, setOperator] = useState<string>("")
    const [isresult, setIsResult] = useState<boolean>(false)


    const Operators = ["+", "-", "*", "/", "="];


    const HandleKlick = (number: number) => {
        if (!isresult) {
            if (!isCalculate) {
                setFirstNumber(firstNumber * 10 + number)
            } else if (isCalculate) {
                setSecondNumber(secondNumber * 10 + number)
            }
        }
        else {

            setRestNumber(restNumber * 10 + number)
        }

        };



    useEffect(() => {
        setDisplay(firstNumber)
     console.log("firstnumber " +firstNumber)

    },[firstNumber])

    useEffect(() => {
        setDisplay(secondNumber)
        console.log("seocondNumber " + secondNumber)
    },[secondNumber])

    useEffect(() => {
        setDisplay(restNumber)
        console.log("restnumber " + restNumber)
    },[restNumber])



    const Operate = (operator: string) => {
        if (operator === "+"){
            setOperator("+")
            setIsCalculate(!isCalculate)

        }
        else if (operator === "-"){
            setOperator("-")
            setIsCalculate(!isCalculate)
        }
        else if (operator === "*"){
            setOperator("*")
            setIsCalculate(!isCalculate)
        }
        setIsCalculate(true)

    }

    const Calculate = () => {
        if (isCalculate){
            switch (operator){
                case "+":

                    if (!restNumber) {
                        setResult(firstNumber + secondNumber)
                        setIsResult(true)
                    }
                    else {
                        setResult(result + restNumber)
                        setRestNumber(0)
                    }
                    break
                case "-":
                    if (!restNumber) {
                        setResult(firstNumber - secondNumber)
                        setIsResult(true)
                    }
                    else {
                        setResult(result - restNumber)
                        setRestNumber(0)
                    }
                    break
                case "*":
                    if (!restNumber){
                        setResult(firstNumber * secondNumber)
                        setIsResult(true)
                    }
                    else {
                        setResult(result * restNumber)
                        setRestNumber(0)
                    }

                }
        }
    }

    useEffect(() => {
        console.log("result" + result)
    },[result])

    const Clear = () => {
        setDisplay(0);
        setFirstNumber(0)
        setSecondNumber(0)
        setRestNumber(0)
        setResult(0)
        setIsResult(false)
        setIsCalculate(false)
    };

    return (
        <>
            <div className={"container"}>
                <div className={"allrows"}>
                    <p className={"result"}>{result ? result : display}</p>
                    <div className={"firstrow"}>
                        {[1, 2, 3].map((number) => (
                            <div
                                className={"number"}
                                key={number}
                                onClick={() => HandleKlick(number)}
                            >
                                {number}
                            </div>
                        ))}
                        <button className={"number"} onClick={() => Operate("+")}>
                            {Operators[0]}
                        </button>
                    </div>
                    <div className={"secondrow"}>
                        {[4, 5, 6].map((number) => (
                            <div
                                className={"number"}
                                key={number}
                                onClick={() => HandleKlick(number)}>
                                {number}
                            </div>
                        ))}
                        <button className={"number"} onClick={() => Operate("-")}>
                            {Operators[1]}
                        </button>

                    </div>
                    <div className={"thirdrow"}>
                        {[7, 8, 9].map((number) => (
                            <div
                                className={"number"}
                                key={number}
                                onClick={() => HandleKlick(number)}>
                                {number}
                            </div>
                        ))}
                        <button className={"number"} onClick={() => Operate("*")}>
                            {Operators[2]}
                        </button>
                    </div>
                    <button className={"number"} onClick={Calculate}>
                        {Operators[4]}
                    </button>
                    <button onClick={Clear}>Clear</button>
                </div>
            </div>
        </>
    );
};
