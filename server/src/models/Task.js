import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters']
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    date: {
      type: String, 
      required: [true, 'Task date is required']
    },
    startTime: {
      type: String, 
      default: ''
    },
    endTime: {
      type: String, 
      default: ''
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    },
    status: {
      type: String,
      enum: ['In Progress', 'Completed'],
      default: 'In Progress'
    },
   
    weekNumber: {
      type: Number,
      index: true
    },
    year: {
      type: Number,
      index: true
    }
  },
  {
    timestamps: true
  }
);


taskSchema.pre('save', function (next) {
  if (this.date) {
    const taskDate = new Date(this.date);
    if (!isNaN(taskDate.getTime())) {
      const d = new Date(Date.UTC(taskDate.getFullYear(), taskDate.getMonth(), taskDate.getDate()));
      const dayNum = d.getUTCDay() || 7;
      d.setUTCDate(d.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
      this.weekNumber = weekNo;
      this.year = d.getUTCFullYear();
    }
  }
  next();
});


taskSchema.index({ title: 'text', description: 'text' });
taskSchema.index({ date: 1, status: 1 });

const Task = mongoose.model('Task', taskSchema);

export default Task;
