// frontend/src/App.js
import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseFilter from './components/ExpenseFilter';
import './styles.css'; // Import the CSS file

function App() {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <ExpenseForm setExpenses={setExpenses} />
      <div className="filter-section">
        <ExpenseFilter setExpenses={setExpenses} setTotal={setTotal} />
      </div>
      <ExpenseList expenses={expenses} />
      <h3>Total Expenses: ${total}</h3>
    </div>
  );
}

export default App;