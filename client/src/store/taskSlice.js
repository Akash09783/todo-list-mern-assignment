import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../services/api';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.getTasks(params);
      return response.data || [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const searchTasksThunk = createAsyncThunk(
  'tasks/searchTasksThunk',
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.searchTasks(query);
      return { query, results: response.data || [] };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchWeeklySummaries = createAsyncThunk(

  'tasks/fetchWeeklySummaries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getWeeklySummary();
      return response.data || [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const checkServerHealth = createAsyncThunk(
  'tasks/checkServerHealth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.checkHealth();
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.createTask(taskData);
      dispatch(fetchWeeklySummaries());
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, updates }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.updateTask(id, updates);
      dispatch(fetchWeeklySummaries());
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await api.deleteTask(id);
      dispatch(fetchWeeklySummaries());
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  tasks: [],
  searchResults: [],
  isSearching: false,
  weeklySummaries: [],
  serverStatus: { database: 'Checking...', status: 'ok' },
  loading: false,
  error: null,
  toast: null, // { title, message, type: 'success' | 'error' | 'info' }
  selectedDate: new Date().toISOString().split('T')[0],
  selectedWeekKey: '',
  currentScreen: 'home', // 'welcome', 'home', 'search'
  desktopFilter: 'all',
  desktopSearch: '',
  isModalOpen: false,
  editingTask: null,
  taskToDelete: null
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setCurrentScreen: (state, action) => {
      state.currentScreen = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setSelectedWeekKey: (state, action) => {
      state.selectedWeekKey = action.payload;
    },
    setDesktopFilter: (state, action) => {
      state.desktopFilter = action.payload;
    },
    setDesktopSearch: (state, action) => {
      state.desktopSearch = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.isSearching = false;
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setEditingTask: (state, action) => {
      state.editingTask = action.payload;
    },
    setTaskToDelete: (state, action) => {
      state.taskToDelete = action.payload;
    },
    setToast: (state, action) => {
      state.toast = action.payload;
    },
    clearToast: (state) => {
      state.toast = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(searchTasksThunk.pending, (state) => {
        state.isSearching = true;
      })
      .addCase(searchTasksThunk.fulfilled, (state, action) => {
        state.isSearching = false;
        state.searchResults = action.payload.results;
      })
      .addCase(searchTasksThunk.rejected, (state) => {
        state.isSearching = false;
      })

      .addCase(fetchWeeklySummaries.fulfilled, (state, action) => {
        state.weeklySummaries = action.payload;
      })

      .addCase(checkServerHealth.fulfilled, (state, action) => {
        state.serverStatus = action.payload;
      })

      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.tasks.push(action.payload);
        }
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.tasks.findIndex((t) => t._id === action.payload._id);
          if (index !== -1) {
            state.tasks[index] = action.payload;
          }
        }
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      });
  }
});

export const {
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
} = taskSlice.actions;

export default taskSlice.reducer;

