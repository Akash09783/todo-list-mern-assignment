import { getISOWeekDetails } from './dateHelper.js';

export class MemoryStore {
  constructor() {
    this.tasks = [
      {
        _id: 'seed-1',
        title: 'Finishing Wireframe',
        description: 'Complete high-fidelity mobile prototype for todo app',
        date: new Date().toISOString().split('T')[0],
        startTime: '09:00',
        endTime: '11:00',
        priority: 'High',
        status: 'In Progress',
        createdAt: new Date().toISOString()
      },
      {
        _id: 'seed-2',
        title: 'Meeting with team',
        description: 'Sync regarding sprint goals and architecture',
        date: new Date().toISOString().split('T')[0],
        startTime: '11:30',
        endTime: '12:30',
        priority: 'Medium',
        status: 'In Progress',
        createdAt: new Date().toISOString()
      },
      {
        _id: 'seed-3',
        title: 'Buy a cat food',
        description: 'Get royal canin dry food from pet supermarket',
        date: new Date().toISOString().split('T')[0],
        startTime: '17:00',
        endTime: '17:30',
        priority: 'Low',
        status: 'Completed',
        createdAt: new Date().toISOString()
      },
      {
        _id: 'seed-4',
        title: 'Finishing daily commission',
        description: 'Submit daily review PR and design document',
        date: new Date().toISOString().split('T')[0],
        startTime: '18:00',
        endTime: '19:00',
        priority: 'Medium',
        status: 'Completed',
        createdAt: new Date().toISOString()
      }
    ];
  }

  getAll(search, date) {
    let list = [...this.tasks];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        t => t.title.toLowerCase().includes(q) || (t.description && t.description.toLowerCase().includes(q))
      );
    }
    if (date) {
      list = list.filter(t => t.date === date);
    }
    return list.sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));
  }

  search(query) {
    if (!query || !query.trim()) return [...this.tasks];
    const q = query.trim().toLowerCase();
    return this.tasks
      .filter(t => t.title.toLowerCase().includes(q) || (t.description && t.description.toLowerCase().includes(q)))
      .sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));
  }

  create(data) {

    const task = {
      _id: 'task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      title: data.title,
      description: data.description || '',
      date: data.date,
      startTime: data.startTime || '',
      endTime: data.endTime || '',
      priority: data.priority || 'Medium',
      status: data.status || 'In Progress',
      createdAt: new Date().toISOString()
    };
    this.tasks.push(task);
    return task;
  }

  update(id, data) {
    const idx = this.tasks.findIndex(t => t._id === id);
    if (idx === -1) return null;
    this.tasks[idx] = { ...this.tasks[idx], ...data, updatedAt: new Date().toISOString() };
    return this.tasks[idx];
  }

  delete(id) {
    const idx = this.tasks.findIndex(t => t._id === id);
    if (idx === -1) return null;
    return this.tasks.splice(idx, 1)[0];
  }

  getWeeklySummary() {
    const map = {};
    for (const t of this.tasks) {
      const parts = t.date.split('-');
      const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      const { weekNumber, year } = getISOWeekDetails(d);
      const key = `${year}-W${String(weekNumber).padStart(2, '0')}`;
      if (!map[key]) {
        const day = d.getDay();
        const diffMonday = d.getDate() - day + (day === 0 ? -6 : 1);
        const mon = new Date(d);
        mon.setDate(diffMonday);
        const sun = new Date(mon);
        sun.setDate(mon.getDate() + 6);

        map[key] = {
          weekKey: key,
          weekNumber,
          year,
          startDate: mon.toISOString().split('T')[0],
          endDate: sun.toISOString().split('T')[0],
          totalTasks: 0,
          completedTasks: 0,
          openTasks: 0,
          tasks: []
        };
      }
      map[key].totalTasks++;
      if (t.status === 'Completed') {
        map[key].completedTasks++;
      } else {
        map[key].openTasks++;
      }
      map[key].tasks.push(t);
    }
    return Object.values(map).sort((a, b) => b.weekKey.localeCompare(a.weekKey));
  }
}

export const memoryStore = new MemoryStore();
