import React from 'react';
import DesktopSidebar from './DesktopSidebar';
import DesktopHeader from './DesktopHeader';
import DesktopStatCards from './DesktopStatCards';
import DesktopWeekStrip from './DesktopWeekStrip';
import DesktopTaskList from './DesktopTaskList';

export default function DesktopDashboard({
  desktopFilter,
  desktopSearch,
  selectedDate,
  selectedWeekKey,
  tasks,
  filteredTasks,
  weeklySummaries,
  currentWeekSummary,
  weekDays,
  totalTasks,
  totalPending,
  totalCompleted,
  progressPct,
  serverStatus,
  loading,
  onFilterSelect,
  onSearchChange,
  onWeekSelect,
  onDateSelect,
  onGoToToday,
  onOpenCreate,
  onOpenEdit,
  onToggleStatus,
  onDeleteTask,
  onRefresh
}) {
  const todayTasksCount = tasks.filter((t) => t.date === selectedDate).length;

  return (
    <div className="hidden md:flex min-h-screen">
      <DesktopSidebar
        desktopFilter={desktopFilter}
        totalTasks={totalTasks}
        totalPending={totalPending}
        totalCompleted={totalCompleted}
        selectedDate={selectedDate}
        todayTasksCount={todayTasksCount}
        weeklySummaries={weeklySummaries}
        selectedWeekKey={selectedWeekKey}
        serverStatus={serverStatus}
        loading={loading}
        onFilterSelect={onFilterSelect}
        onWeekSelect={onWeekSelect}
        onOpenCreate={onOpenCreate}
        onRefresh={onRefresh}
      />

      <main className="flex-1 flex flex-col overflow-y-auto">
        <DesktopHeader
          search={desktopSearch}
          onSearchChange={onSearchChange}
          currentWeekSummary={currentWeekSummary}
        />

        <div className="p-8 space-y-6 max-w-7xl w-full mx-auto">
          <DesktopStatCards
            desktopFilter={desktopFilter}
            totalCompleted={totalCompleted}
            totalPending={totalPending}
            totalTasks={totalTasks}
            progressPct={progressPct}
            onFilterSelect={onFilterSelect}
          />

          <DesktopWeekStrip
            weekDays={weekDays}
            onSelectDate={onDateSelect}
            onGoToToday={onGoToToday}
          />

          <DesktopTaskList
            desktopFilter={desktopFilter}
            selectedDate={selectedDate}
            tasks={filteredTasks}
            onToggleStatus={onToggleStatus}
            onOpenEdit={onOpenEdit}
            onOpenCreate={onOpenCreate}
            onDeleteTask={onDeleteTask}
          />
        </div>
      </main>
    </div>
  );
}
