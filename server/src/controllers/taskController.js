import Task from '../models/Task.js';
import { getISOWeekDetails } from '../helpers/dateHelper.js';
import { memoryStore } from '../helpers/memoryStore.js';

export const getTasks = async (req, res) => {
  try {
    const isMongoConnected = req.isMongoConnected;
    const { search, date, weekKey } = req.query;

    if (!isMongoConnected) {
      let tasks = memoryStore.getAll(search, date);
      if (weekKey) {
        const summaries = memoryStore.getWeeklySummary();
        const found = summaries.find(s => s.weekKey === weekKey);
        tasks = found ? found.tasks : [];
      }
      return res.json({ success: true, count: tasks.length, data: tasks, mode: 'memory' });
    }

    let filter = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    if (date) {
      filter.date = date;
    }
    if (weekKey) {
      const [y, w] = weekKey.split('-W');
      filter.year = parseInt(y, 10);
      filter.weekNumber = parseInt(w, 10);
    }

    const tasks = await Task.find(filter).sort({ startTime: 1, createdAt: -1 });
    return res.json({ success: true, count: tasks.length, data: tasks, mode: 'mongodb' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const searchTasks = async (req, res) => {
  try {
    const isMongoConnected = req.isMongoConnected;
    const { q = '', query = '' } = req.query;
    const searchTerm = (q || query).trim();

    if (!isMongoConnected) {
      const results = memoryStore.search(searchTerm);
      return res.json({
        success: true,
        count: results.length,
        query: searchTerm,
        data: results,
        mode: 'memory'
      });
    }

    let filter = {};
    if (searchTerm) {
      filter.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } }
      ];
    }

    const tasks = await Task.find(filter).sort({ startTime: 1, createdAt: -1 });
    return res.json({
      success: true,
      count: tasks.length,
      query: searchTerm,
      data: tasks,
      mode: 'mongodb'
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const isMongoConnected = req.isMongoConnected;
    const { title, description, date, startTime, endTime, priority, status } = req.body;

    if (!title || !date) {
      return res.status(400).json({ success: false, error: 'Title and Date are required.' });
    }

    if (!isMongoConnected) {
      const task = memoryStore.create({ title, description, date, startTime, endTime, priority, status });
      return res.status(201).json({ success: true, data: task, mode: 'memory' });
    }

    const task = new Task({ title, description, date, startTime, endTime, priority, status });
    await task.save();
    return res.status(201).json({ success: true, data: task, mode: 'mongodb' });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const isMongoConnected = req.isMongoConnected;
    const { id } = req.params;
    const updates = req.body;

    if (!isMongoConnected) {
      const updated = memoryStore.update(id, updates);
      if (!updated) return res.status(404).json({ success: false, error: 'Task not found' });
      return res.json({ success: true, data: updated, mode: 'memory' });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    Object.assign(task, updates);
    await task.save();
    return res.json({ success: true, data: task, mode: 'mongodb' });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const isMongoConnected = req.isMongoConnected;
    const { id } = req.params;

    if (!isMongoConnected) {
      const deleted = memoryStore.delete(id);
      if (!deleted) return res.status(404).json({ success: false, error: 'Task not found' });
      return res.json({ success: true, data: deleted, mode: 'memory' });
    }

    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    return res.json({ success: true, data: task, mode: 'mongodb' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const getWeeklySummary = async (req, res) => {
  try {
    const isMongoConnected = req.isMongoConnected;

    if (!isMongoConnected) {
      const summary = memoryStore.getWeeklySummary();
      return res.json({ success: true, data: summary, mode: 'memory' });
    }

    const aggregated = await Task.aggregate([
      {
        $match: {
          year: { $exists: true, $ne: null },
          weekNumber: { $exists: true, $ne: null }
        }
      },
      {
        $group: {
          _id: { year: '$year', weekNumber: '$weekNumber' },
          totalTasks: { $sum: 1 },
          completedTasks: {
            $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] }
          },
          openTasks: {
            $sum: { $cond: [{ $ne: ['$status', 'Completed'] }, 1, 0] }
          },
          tasks: { $push: '$$ROOT' }
        }
      },
      {
        $project: {
          _id: 0,
          weekKey: {
            $concat: [
              { $toString: '$_id.year' },
              '-W',
              {
                $cond: [
                  { $lt: ['$_id.weekNumber', 10] },
                  { $concat: ['0', { $toString: '$_id.weekNumber' }] },
                  { $toString: '$_id.weekNumber' }
                ]
              }
            ]
          },
          weekNumber: '$_id.weekNumber',
          year: '$_id.year',
          totalTasks: 1,
          completedTasks: 1,
          openTasks: 1,
          tasks: 1
        }
      },
      { $sort: { weekKey: -1 } }
    ]);

    return res.json({ success: true, data: aggregated, mode: 'mongodb' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
