import React, { useState } from 'react';
import axios from 'axios';

const ExpenseForm = ({ setExpenses }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/expenses', formData);
      setExpenses(prev => [...prev, res.data]);
      setFormData({ amount: '', category: '', date: '', description: '' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
      />
      <input
        type="text"
        placeholder="Category"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      />
      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;