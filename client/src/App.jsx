import React, { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskModal from './components/TaskModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import MobileLayout from './components/mobile/MobileLayout';
import DesktopDashboard from './components/desktop/DesktopDashboard';
import { getWeekDaysForDate, filterTasks } from './utils/dateUtils';
import {
  fetchTasks,
  searchTasksThunk,
  fetchWeeklySummaries,
  checkServerHealth,
  createTask,
  updateTask,
  deleteTask,
  setCurrentScreen,
  setSelectedDate,
  setSelectedWeekKey,
  setDesktopFilter,
  setDesktopSearch,
  clearSearchResults,
  setIsModalOpen,
  setEditingTask,
  setTaskToDelete,
  setToast,
  clearToast
} from './store/taskSlice';

export default function App() {
  const dispatch = useDispatch();

  const {
    tasks,
    searchResults,
    isSearching,
    weeklySummaries,
    serverStatus,
    loading,
    toast,
    selectedDate,
    selectedWeekKey,
    currentScreen,
    desktopFilter,
    desktopSearch,
    isModalOpen,
    editingTask,
    taskToDelete
  } = useSelector((state) => state.tasks);

  const showToast = useCallback(
    (title, message, type = 'success') => {
      dispatch(setToast({ title, message, type }));
      setTimeout(() => {
        dispatch(clearToast());
      }, 3500);
    },
    [dispatch]
  );

  const loadData = useCallback(() => {
    dispatch(fetchTasks());
    dispatch(fetchWeeklySummaries()).then((res) => {
      if (res.payload && res.payload.length > 0 && !selectedWeekKey) {
        dispatch(setSelectedWeekKey(res.payload[0].weekKey));
      }
    });
    dispatch(checkServerHealth());
  }, [dispatch, selectedWeekKey]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSaveTask = async (taskData) => {
    try {
      if (taskData._id) {
        await dispatch(updateTask({ id: taskData._id, updates: taskData })).unwrap();
        showToast('Task Updated', `"${taskData.title}" was updated successfully.`);
      } else {
        await dispatch(createTask(taskData)).unwrap();
        showToast('Task Created', `"${taskData.title}" was added to your schedule.`);
      }
      dispatch(setIsModalOpen(false));
      dispatch(setEditingTask(null));
    } catch (err) {
      showToast('Error', err || 'Failed to save task', 'error');
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      const nextStatus = task.status === 'Completed' ? 'In Progress' : 'Completed';
      await dispatch(updateTask({ id: task._id, updates: { status: nextStatus } })).unwrap();
      showToast(
        nextStatus === 'Completed' ? 'Task Completed! 🎉' : 'Task In Progress',
        `"${task.title}" status updated to ${nextStatus}.`
      );
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  const promptDeleteTask = (id) => {
    const task = tasks.find((t) => t._id === id);
    dispatch(setTaskToDelete({ id, title: task ? task.title : 'this task' }));
  };

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;
    const { id, title } = taskToDelete;
    try {
      dispatch(setTaskToDelete(null));
      await dispatch(deleteTask(id)).unwrap();
      showToast('Task Deleted', `"${title}" has been deleted.`, 'info');
    } catch (err) {
      showToast('Delete Failed', err || 'Failed to delete task', 'error');
    }
  };

  const handleOpenEdit = (task) => {
    dispatch(setEditingTask(task));
    dispatch(setIsModalOpen(true));
  };

  const handleOpenCreate = () => {
    dispatch(setEditingTask(null));
    dispatch(setIsModalOpen(true));
  };

  const currentWeekSummary = useMemo(
    () => weeklySummaries.find((w) => w.weekKey === selectedWeekKey),
    [weeklySummaries, selectedWeekKey]
  );

  const currentWeekDays = useMemo(() => getWeekDaysForDate(selectedDate), [selectedDate]);

  const totalCompleted = useMemo(
    () => tasks.filter((t) => t.status === 'Completed').length,
    [tasks]
  );
  const totalPending = useMemo(
    () => tasks.filter((t) => t.status !== 'Completed').length,
    [tasks]
  );
  const totalTasks = tasks.length;
  const progressPct = totalTasks === 0 ? 0 : Math.round((totalCompleted / totalTasks) * 100);

  const desktopFilteredTasks = useMemo(
    () =>
      filterTasks(tasks, {
        search: desktopSearch,
        filter: desktopFilter,
        selectedDate
      }),
    [tasks, desktopSearch, desktopFilter, selectedDate]
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans relative">
      <Toast toast={toast} onClose={() => dispatch(clearToast())} />

      <DeleteConfirmModal
        isOpen={Boolean(taskToDelete)}
        taskTitle={taskToDelete?.title}
        onClose={() => dispatch(setTaskToDelete(null))}
        onConfirm={handleConfirmDelete}
      />

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          dispatch(setIsModalOpen(false));
          dispatch(setEditingTask(null));
        }}
        onSave={handleSaveTask}
        editingTask={editingTask}
        defaultDate={selectedDate}
      />

      <MobileLayout
        currentScreen={currentScreen}
        tasks={tasks}
        searchResults={searchResults}
        isSearching={isSearching}
        onSearchApi={(query) => {
          if (query && query.trim()) {
            dispatch(searchTasksThunk(query));
          } else {
            dispatch(clearSearchResults());
          }
        }}
        selectedDate={selectedDate}
        serverStatus={serverStatus}
        loading={loading}
        weeklySummaries={weeklySummaries}
        currentWeekSummary={currentWeekSummary}
        selectedWeekKey={selectedWeekKey}
        onRefresh={loadData}
        onSelectScreen={(screen) => dispatch(setCurrentScreen(screen))}
        onSelectDate={(date) => dispatch(setSelectedDate(date))}
        onSelectWeek={(weekKey) => dispatch(setSelectedWeekKey(weekKey))}
        onOpenCreate={handleOpenCreate}
        onOpenEdit={handleOpenEdit}
        onToggleStatus={handleToggleStatus}
        onDeleteTask={promptDeleteTask}
      />

      <DesktopDashboard
        desktopFilter={desktopFilter}
        desktopSearch={desktopSearch}
        selectedDate={selectedDate}
        selectedWeekKey={selectedWeekKey}
        tasks={tasks}
        filteredTasks={desktopFilteredTasks}
        weeklySummaries={weeklySummaries}
        currentWeekSummary={currentWeekSummary}
        weekDays={currentWeekDays}
        totalTasks={totalTasks}
        totalPending={totalPending}
        totalCompleted={totalCompleted}
        progressPct={progressPct}
        serverStatus={serverStatus}
        loading={loading}
        onFilterSelect={(filter) => dispatch(setDesktopFilter(filter))}
        onSearchChange={(query) => dispatch(setDesktopSearch(query))}
        onWeekSelect={(weekKey) => dispatch(setSelectedWeekKey(weekKey))}
        onDateSelect={(date) => {
          dispatch(setSelectedDate(date));
          dispatch(setDesktopFilter('today'));
        }}
        onGoToToday={() => {
          const todayIso = new Date().toISOString().split('T')[0];
          dispatch(setSelectedDate(todayIso));
          dispatch(setDesktopFilter('today'));
        }}
        onOpenCreate={handleOpenCreate}
        onOpenEdit={handleOpenEdit}
        onToggleStatus={handleToggleStatus}
        onDeleteTask={promptDeleteTask}
        onRefresh={loadData}
      />
    </div>
  );
}
