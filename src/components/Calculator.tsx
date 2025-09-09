"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Operation = "+" | "-" | "×" | "÷" | null;

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<Operation>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? String(num) : display + num);
    }
  };

  const inputOperation = (nextOperation: Operation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = performCalculation(currentValue, inputValue, operation);

      if (newValue === "Error") {
        setDisplay("Error");
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(true);
        return;
      }

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const performCalculation = (
    firstValue: number,
    secondValue: number,
    operation: Operation
  ): number | "Error" => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        if (secondValue === 0) {
          return "Error";
        }
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const calculate = () => {
    if (operation && previousValue !== null) {
      const inputValue = parseFloat(display);
      const newValue = performCalculation(previousValue, inputValue, operation);

      if (newValue === "Error") {
        setDisplay("Error");
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(true);
        return;
      }

      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const formatDisplay = (value: string): string => {
    if (value === "Error") return value;
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    
    // Handle very large numbers
    if (Math.abs(num) > 999999999) {
      return num.toExponential(3);
    }
    
    // Remove unnecessary decimal places
    if (num % 1 === 0) {
      return num.toString();
    }
    
    return parseFloat(num.toFixed(8)).toString();
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl bg-white">
      <CardContent className="p-6">
        {/* Display */}
        <div className="mb-6">
          <div className="bg-gray-900 text-white p-4 rounded-lg text-right">
            <div className="text-3xl font-mono font-bold min-h-[2.5rem] flex items-center justify-end">
              {formatDisplay(display)}
            </div>
            {operation && previousValue !== null && (
              <div className="text-sm text-gray-400 mt-1">
                {previousValue} {operation}
              </div>
            )}
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* First Row: Clear and Operations */}
          <Button
            variant="destructive"
            className="col-span-2 h-14 text-lg font-semibold"
            onClick={clear}
          >
            Clear
          </Button>
          <Button
            variant="secondary"
            className="h-14 text-lg font-semibold bg-orange-100 hover:bg-orange-200 text-orange-800"
            onClick={() => inputOperation("÷")}
          >
            ÷
          </Button>
          <Button
            variant="secondary"
            className="h-14 text-lg font-semibold bg-orange-100 hover:bg-orange-200 text-orange-800"
            onClick={() => inputOperation("×")}
          >
            ×
          </Button>

          {/* Second Row: 7, 8, 9, - */}
          <Button
            variant="outline"
            className="h-14 text-lg font-semibold hover:bg-gray-50"
            onClick={() => inputNumber("7")}
          >
            7
          </Button>
          <Button
            variant="outline"
            className="h-14 text-lg font-semibold hover:bg-gray-50"
            onClick={() => inputNumber("8")}
          >
            8
          </Button>
          <Button
            variant="outline"
            className="h-14 text-lg font-semibold hover:bg-gray-50"
            onClick={() => inputNumber("9")}
          >
            9
          </Button>
          <Button
            variant="secondary"
            className="h-14 text-lg font-semibold bg-orange-100 hover:bg-orange-200 text-orange-800"
            onClick={() => inputOperation("-")}
          >
            -
          </Button>

          {/* Third Row: 4, 5, 6, + */}
          <Button
            variant="outline"
            className="h-14 text-lg font-semibold hover:bg-gray-50"
            onClick={() => inputNumber("4")}
          >
            4
          </Button>
          <Button
            variant="outline"
            className="h-14 text-lg font-semibold hover:bg-gray-50"
            onClick={() => inputNumber("5")}
          >
            5
          </Button>
          <Button
            variant="outline"
            className="h-14 text-lg font-semibold hover:bg-gray-50"
            onClick={() => inputNumber("6")}
          >
            6
          </Button>
          <Button
            variant="secondary"
            className="h-14 text-lg font-semibold bg-orange-100 hover:bg-orange-200 text-orange-800"
            onClick={() => inputOperation("+")}
          >
            +
          </Button>

          {/* Fourth Row: 1, 2, 3, = (spans 2 rows) */}
          <Button
            variant="outline"
            className="h-14 text-lg font-semibold hover:bg-gray-50"
            onClick={() => inputNumber("1")}
          >
            1
          </Button>
          <Button
            variant="outline"
            className="h-14 text-lg font-semibold hover:bg-gray-50"
            onClick={() => inputNumber("2")}
          >
            2
          </Button>
          <Button
            variant="outline"
            className="h-14 text-lg font-semibold hover:bg-gray-50"
            onClick={() => inputNumber("3")}
          >
            3
          </Button>
          <Button
            variant="default"
            className="row-span-2 h-[7.5rem] text-xl font-bold bg-blue-600 hover:bg-blue-700 text-white"
            onClick={calculate}
          >
            =
          </Button>

          {/* Fifth Row: 0 (spans 2 columns), . */}
          <Button
            variant="outline"
            className="col-span-2 h-14 text-lg font-semibold hover:bg-gray-50"
            onClick={() => inputNumber("0")}
          >
            0
          </Button>
          <Button
            variant="outline"
            className="h-14 text-lg font-semibold hover:bg-gray-50"
            onClick={() => inputNumber(".")}
            disabled={display.includes(".")}
          >
            .
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}