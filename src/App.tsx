import './App.css'
import Form from "./components/Form.tsx";
import ExpenseList from "./components/ExpenseList.tsx";
import {useState} from "react";

interface Expense {
    description: string,
    amount: number,
    category: string
}

function App() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const addExpense = (expense: Expense) => {
        setExpenses([...expenses, expense])
    };
    const deleteExpense = (index: number) => {
        const updatedExpenses = [...expenses];
        updatedExpenses.splice(index, 1);
        setExpenses(updatedExpenses);
    }

    return (
        <>
            <Form onSubmit={ expense => addExpense(expense) }/>
            <ExpenseList expenses={expenses} onDelete={index => deleteExpense(index)}/>
        </>
    )
}

export default App
