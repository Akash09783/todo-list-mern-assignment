export const validateTaskPayload = (req, res, next) => {
  const { title, date, priority, status } = req.body;

  if (req.method === 'POST') {
    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ success: false, error: 'Validation Error: Title is required and must be non-empty.' });
    }
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ success: false, error: 'Validation Error: Date is required and must follow YYYY-MM-DD format.' });
    }
  }

  if (priority && !['Low', 'Medium', 'High'].includes(priority)) {
    return res.status(400).json({ success: false, error: 'Validation Error: Priority must be Low, Medium, or High.' });
  }

  if (status && !['In Progress', 'Completed'].includes(status)) {
    return res.status(400).json({ success: false, error: 'Validation Error: Status must be In Progress or Completed.' });
  }

  next();
};
