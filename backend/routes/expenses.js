const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Add a new expense
router.post('/', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Filter expenses by category and date
router.get('/filter', async (req, res) => {
  const { category, date } = req.query;
  const query = {};
  if (category) query.category = category;
  if (date) query.date = new Date(date);
  
  try {
    const expenses = await Expense.find(query);
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get total expenses for a date range
router.get('/total', async (req, res) => {
  const { start, end } = req.query;
  try {
    const expenses = await Expense.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(start),
            $lte: new Date(end),
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]);
    res.json({ total: expenses[0]?.total || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;