import React from 'react';
import WelcomeScreen from '../WelcomeScreen';
import HomeScreen from '../HomeScreen';
import SearchScreen from '../SearchScreen';
import MobileHeader from './MobileHeader';
import MobileNavBar from './MobileNavBar';

export default function MobileLayout({
  currentScreen,
  tasks,
  searchResults,
  isSearching,
  onSearchApi,
  selectedDate,
  serverStatus,
  loading,
  weeklySummaries,
  currentWeekSummary,
  selectedWeekKey,
  onRefresh,
  onSelectScreen,
  onSelectDate,
  onSelectWeek,
  onOpenCreate,
  onOpenEdit,
  onToggleStatus,
  onDeleteTask
}) {
  return (
    <div className="md:hidden flex flex-col min-h-screen bg-slate-50">
      <MobileHeader serverStatus={serverStatus} loading={loading} onRefresh={onRefresh} />

      <div className="flex-1 relative flex flex-col">
        {currentScreen === 'welcome' && (
          <div className="min-h-[calc(100vh-110px)] pb-20">
            <WelcomeScreen onGetStarted={() => onSelectScreen('home')} />
          </div>
        )}

        {currentScreen === 'home' && (
          <div className="min-h-[calc(100vh-110px)] pb-20">
            <HomeScreen
              tasks={tasks}
              selectedDate={selectedDate}
              onSelectDate={onSelectDate}
              onOpenCreate={onOpenCreate}
              onOpenEdit={onOpenEdit}
              onToggleStatus={onToggleStatus}
              onDeleteTask={onDeleteTask}
              onOpenSearch={() => onSelectScreen('search')}
              weeklySummaries={weeklySummaries}
              currentWeekSummary={currentWeekSummary}
              selectedWeekKey={selectedWeekKey}
              onSelectWeek={onSelectWeek}
            />
          </div>
        )}

        {currentScreen === 'search' && (
          <div className="min-h-[calc(100vh-110px)] pb-20">
            <SearchScreen
              tasks={tasks}
              searchResults={searchResults}
              isSearching={isSearching}
              onSearchApi={onSearchApi}
              onBack={() => onSelectScreen('home')}
              onToggleStatus={onToggleStatus}
              onDeleteTask={onDeleteTask}
              onOpenEdit={onOpenEdit}
            />
          </div>
        )}
      </div>

      <MobileNavBar
        currentScreen={currentScreen}
        onSelectScreen={onSelectScreen}
        onOpenCreate={onOpenCreate}
      />
    </div>
  );
}
