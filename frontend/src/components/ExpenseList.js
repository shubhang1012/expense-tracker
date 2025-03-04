import React from 'react';

const ExpenseList = ({ expenses }) => {
  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map(expense => (
          <li key={expense._id}>
            ${expense.amount} - {expense.category} - {new Date(expense.date).toLocaleDateString()} - {expense.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;