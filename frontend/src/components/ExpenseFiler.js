import React, { useState } from 'react';
import axios from 'axios';

const ExpenseFilter = ({ setExpenses, setTotal }) => {
  const [filter, setFilter] = useState({ category: '', date: '', start: '', end: '' });

  const handleFilter = async () => {
    try {
      const res = await axios.get('http://localhost:5000/expenses/filter', {
        params: { category: filter.category, date: filter.date },
      });
      setExpenses(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTotal = async () => {
    try {
      const res = await axios.get('http://localhost:5000/expenses/total', {
        params: { start: filter.start, end: filter.end },
      });
      setTotal(res.data.total);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Category"
        value={filter.category}
        onChange={(e) => setFilter({ ...filter, category: e.target.value })}
      />
      <input
        type="date"
        value={filter.date}
        onChange={(e) => setFilter({ ...filter, date: e.target.value })}
      />
      <button onClick={handleFilter}>Filter Expenses</button>
      <input
        type="date"
        placeholder="Start Date"
        value={filter.start}
        onChange={(e) => setFilter({ ...filter, start: e.target.value })}
      />
      <input
        type="date"
        placeholder="End Date"
        value={filter.end}
        onChange={(e) => setFilter({ ...filter, end: e.target.value })}
      />
      <button onClick={handleTotal}>Get Total</button>
    </div>
  );
};

export default ExpenseFilter;