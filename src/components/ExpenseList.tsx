import {useState} from "react";

interface Expense {
    description: string,
    amount: number,
    category: string
}

interface Props {
    expenses: Expense[],
    onDelete: (index: number) => void
}


function ExpenseList({expenses, onDelete}: Props) {
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const filterExpenses = (category: string) => {
        if (category === "All Categories") {
            return expenses;
        }
        return expenses.filter(expense => expense.category === category);
    };
    const filteredExpenses = filterExpenses(selectedCategory);
    const totalAmount = filteredExpenses.reduce((total, expense) => total + expense.amount, 0);

    return (
        <div className="mt-5">
            <div className="mb-3">
                <select
                    onChange={event => setSelectedCategory(event.target.value)}
                    id="categories"
                    className="form-select"
                >
                    <option value="All Categories">All Categories</option>
                    <option value="Grocery">Groceries</option>
                    <option value="Utility">Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                </select>
            </div>
            <div className="mb-3">
                <table className="table table-bordered text-center">
                    <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        {filteredExpenses.map((expense, index) => (
                            <tr key={index}>
                                <td>{expense.description}</td>
                                <td>${expense.amount.toFixed(2)}</td>
                                <td>{expense.category}</td>
                                <td>
                                    <button className="btn btn-outline-danger" onClick={() => onDelete(index)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Total</th>
                            <th>${totalAmount.toFixed(2)}</th>
                            <th colSpan={2}></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}

export default ExpenseList;