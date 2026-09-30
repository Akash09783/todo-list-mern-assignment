// Monday as start of week: Sunday (0) -> offset -6, others -> (1 - day)
export function getWeekDaysForDate(selectedDate) {
  const cur = new Date(selectedDate);
  const day = cur.getDay();
  const diffToMonday = cur.getDate() - (day === 0 ? 6 : day - 1);
  const monday = new Date(cur);
  monday.setDate(diffToMonday);

  const days = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const iso = d.toISOString().split('T')[0];
    days.push({
      dateStr: iso,
      dayName: dayNames[d.getDay()],
      dayNumber: String(d.getDate()).padStart(2, '0'),
      monthName: d.toLocaleDateString('en-US', { month: 'short' }),
      isToday: new Date().toISOString().split('T')[0] === iso,
      isSelected: selectedDate === iso
    });
  }

  return days;
}

export function filterTasks(tasks, { search = '', filter = 'all', selectedDate = '' }) {
  return tasks.filter((t) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        t.title.toLowerCase().includes(q) ||
        (t.description && t.description.toLowerCase().includes(q));
      if (!match) return false;
    }
    if (filter === 'today') return t.date === selectedDate;
    if (filter === 'pending') return t.status !== 'Completed';
    if (filter === 'completed') return t.status === 'Completed';
    return true;
  });
}
