import "./App.css";
import {useEffect, useState} from "react";
import {freemem} from "os";

export const Calculator = () => {
    const [result, setResult] = useState<number>(0);
    const [display, setDisplay] = useState<string>("0");
    const [firstNumber, setFirstNumber] = useState<string>("0")
    const [secondNumber, setSecondNumber] = useState<string>("0")
    const [restNumber, setRestNumber] = useState<string>("0")
    const [isNumberClicked, setIsNumberClicked] = useState<boolean>(false)
    const [operator, setOperator] = useState<string>("")
    const [isresult, setIsResult] = useState<boolean>(false)
    const [CalculatedwithWurzelorHoch, setCalculatedwithWurzelorHoch] = useState(false)

    const Operators = ["+", "-", "*", "/", "=", "x2", "wurzel"];

    const parsedFirstNumber = parseFloat(firstNumber);
    const parsedSecondNumber = parseFloat(secondNumber);
    const parsedRestNumber = parseFloat(restNumber);


    const HandleKlick = (number: number) => {
        const stringNumber = number.toString();
        const stringToFind = "0"
        if (isresult) {
            if (restNumber.length === 1 && restNumber.includes(stringToFind)) {
                setRestNumber((restNumber.slice(0, -1) + stringNumber));
            } else {
                setRestNumber((restNumber + stringNumber));
            }
        } else {
            if (!isNumberClicked) {
                if (firstNumber.length === 1 && firstNumber.includes(stringToFind)) {
                    setFirstNumber((firstNumber.slice(0, -1) + stringNumber));
                } else {
                    setFirstNumber((firstNumber + stringNumber));
                }
            } else if (isNumberClicked) {
                if (secondNumber.length === 1 && secondNumber.includes(stringToFind)) {
                    setSecondNumber((secondNumber.slice(0, -1) + stringNumber));
                } else {
                    setSecondNumber((secondNumber + stringNumber));
                }
            }
        }
        setCalculatedwithWurzelorHoch(false)
    };

    const Remove = () => {
        if (!isNumberClicked && !CalculatedwithWurzelorHoch) {
            if (firstNumber.length === 1) {
                setFirstNumber("0")
            } else {
                setFirstNumber(firstNumber.slice(0, -1))
            }

        }
        if (isNumberClicked && !CalculatedwithWurzelorHoch) {
            if (secondNumber.length === 1) {
                setSecondNumber("0")
            } else {
                setSecondNumber(secondNumber.slice(0, -1))
            }

        }
        if (isresult && !CalculatedwithWurzelorHoch) {
            if (restNumber.length === 1) {
                setRestNumber("0")
            } else {
                setRestNumber(restNumber.slice(0, -1))
            }

        }

    }

    const Point = () => {
        if (!isNumberClicked) {
            if (!firstNumber.includes(".") && firstNumber.length > 0) {
                setFirstNumber(firstNumber + ".")
            } else {
                return null
            }

        }
        if (isNumberClicked) {
            if (!secondNumber.includes(".") && secondNumber.length > 0) {
                setSecondNumber(secondNumber + ".")
            } else {
                return null
            }

        }
        if (isresult) {
            if (!restNumber.includes(".") && restNumber.length > 0) {
                setRestNumber(restNumber + ".")
            } else {
                return null
            }
        }
        if (result) {
            console.log("lkol")
            setResult(0)
        }

    }


    useEffect(() => {
        if (!result) {
            setDisplay(firstNumber)
        }
        console.log("firstnumber " + firstNumber)
    }, [firstNumber])


    useEffect(() => {
        if (!result) {
            setDisplay(secondNumber)
        }
        console.log("seocondNumber " + secondNumber)
    }, [secondNumber])


    useEffect(() => {
        setDisplay(restNumber)
        console.log("restnumber " + restNumber)
    }, [restNumber])


    useEffect(() => {
        setDisplay(result.toString(10))
        console.log("restnumber " + result)
    }, [result])


    useEffect(() => {
        console.log("display" + display)

    }, [display])

// ---------------------- Problem
    useEffect(() => {
        console.log("result" + result)
        setFirstNumber("0")
        setSecondNumber("0")
    }, [result])


    useEffect(() => {
        console.log(operator)
    }, [operator])

    useEffect(() => {
        console.log(CalculatedwithWurzelorHoch)
    }, [CalculatedwithWurzelorHoch])


    const Operate = (operator: string) => {
        switch (operator) {
            case  "+":
                if (parsedFirstNumber && parsedSecondNumber) {
                    setResult(parsedFirstNumber + parsedSecondNumber)
                    setIsResult(true)
                }
                if (parsedRestNumber) {
                    setResult(result + parsedRestNumber)
                    setRestNumber("0")
                }

                setOperator("+")
                setIsNumberClicked(true)
                break

            case "-":
                if (parsedFirstNumber && parsedSecondNumber) {
                    setResult(parsedFirstNumber - parsedSecondNumber)
                    setIsResult(true)
                }
                if (parsedRestNumber) {
                    setResult(result - parsedRestNumber)
                    setRestNumber("0")
                }
                setOperator("-")
                setIsNumberClicked(true)
                break
            case "*":
                if (parsedFirstNumber && parsedSecondNumber) {
                    setResult(parsedFirstNumber * parsedSecondNumber)
                    setIsResult(true)
                }
                if (parsedRestNumber) {
                    setResult(result * parsedRestNumber)
                    setRestNumber("0")
                }
                setOperator("*")
                setIsNumberClicked(true)
                break
            case "/":
                if (parsedFirstNumber && parsedSecondNumber) {
                    setResult(parsedFirstNumber / parsedSecondNumber)
                    setIsResult(true)
                }
                if (parsedRestNumber) {
                    setResult(result / parsedRestNumber)
                    setRestNumber("0")
                }
                setOperator("/")
                setIsNumberClicked(true)
                break

            case "x2":
                if (!parsedRestNumber) {
                    if (!isNumberClicked) {
                        const newNumber = Math.pow(parsedFirstNumber, 2)
                        setFirstNumber(newNumber.toString())
                    } else if (isNumberClicked) {
                        const newNumber = Math.pow(parsedSecondNumber, 2)
                        setSecondNumber(newNumber.toString())
                    }

                } else if (parsedRestNumber) {
                    const newNumber = Math.pow(parsedRestNumber, 2)
                    setRestNumber(newNumber.toString())
                }
                if (result) {
                    setResult(Math.pow(result, 2))
                }
                setCalculatedwithWurzelorHoch(true)
                break

            case "wurzel":
                if (!parsedRestNumber) {
                    if (!isNumberClicked) {
                        const newNumber = Math.sqrt(parsedFirstNumber)
                        setFirstNumber(newNumber.toString())
                    } else if (isNumberClicked) {
                        const newNumber = Math.sqrt(parsedSecondNumber)
                        setSecondNumber(newNumber.toString())
                    }
                    console.log("first and second")
                } else if (parsedRestNumber) {
                    const newNumber = Math.sqrt(parsedRestNumber)
                    setRestNumber(newNumber.toString())
                }
                if (result) {
                    setResult(Math.pow(result, 2))
                }
                setCalculatedwithWurzelorHoch(true)
        }
    }

    const Calculate = () => {
        switch (operator) {
            case "+":
                if (!parsedRestNumber) {
                    setResult(parsedFirstNumber + parsedSecondNumber)
                    setIsResult(true)
                } else {
                    setResult(result + parsedRestNumber)
                    setRestNumber("0")
                }
                break
            //  Wenn restNumber nicht verwendet wird (d.h. es ist null oder der leere String), werden firstNumber und secondNumber für die Berechnung verwendet. Wenn restNumber vorhanden ist, wird es in aufeinanderfolgenden Berechnungen verwendet.
            // restNumber ist am Anfang noch 0
            case "-":
                if (!parsedRestNumber) {
                    setResult(parsedFirstNumber - parsedSecondNumber)
                    setIsResult(true)
                } else {
                    setResult(result - parsedRestNumber)
                    setRestNumber("0")
                }
                break
            case "*":
                if (!parsedRestNumber) {
                    setResult(parsedFirstNumber * parsedSecondNumber)
                    setIsResult(true)
                } else {
                    setResult(result * parsedRestNumber)
                    setRestNumber("0")
                }
                break
            case "/":
                if (!parsedRestNumber) {
                    setResult(parsedFirstNumber / parsedSecondNumber)
                    setIsResult(true)
                } else {
                    setResult(result / parsedRestNumber)
                    setRestNumber("0")
                }
                break
        }

    }


    const Clear = () => {
        setDisplay("0");
        setFirstNumber("0")
        setSecondNumber("0")
        setRestNumber("0")
        setResult(0)
        setIsResult(false)
        setIsNumberClicked(false)
    };


    return (
        <>
            <div className={"container"}>
                <div className={"allrows"}>
                    {<p className={"result"}>{display}</p> ? <p className={"result"}>{display}</p> :
                        <p className={"result"}>{result}</p>}
                    <div className={"firstrow"}>
                        {[7, 8, 9].map((number) => (
                            <div
                                className={"number"}
                                key={number}
                                onClick={() => HandleKlick(number)}>
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
                        {[1, 2, 3].map((number) => (
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

                    <div className={"lastrow"}>
                        {<button className={"clear"} onClick={Clear}>Clear</button>}
                        {[0].map((number) => (
                            <div
                                className={"number"}
                                key={number}
                                onClick={() => HandleKlick(number)}>
                                {number}
                            </div>
                        ))}
                        <button className={"delete"} onClick={(Remove)}>X</button>

                    </div>
                    <div className={"divideandresult"}>
                        <button className={"number"} onClick={() => Operate("/")}>
                            {Operators[3]}
                        </button>
                    </div>
                    <div className={"lastlastrow"}>
                        <button className={"number"} onClick={() => Operate("wurzel")}>
                            {Operators[6]}
                        </button>
                        <button className={`number`} onClick={() => Operate("x2")}>
                            {Operators[5]}
                        </button>

                        <button className={"number"} onClick={Point}>
                            .
                        </button>
                        <button className={"number"} onClick={Calculate}>
                            {Operators[4]}
                        </button>

                    </div>


                </div>

            </div>
        </>
    );
};

