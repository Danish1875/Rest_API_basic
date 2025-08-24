const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// In-memory storage
let tasks = [];
let nextId = 1;

// Utility function to find task by ID
const findTaskById = (id) => {
  return tasks.find(task => task.id === parseInt(id));
};

// Validation function
const validateTask = (title, description) => {
  const errors = [];
  
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    errors.push('Title is required and must be a non-empty string');
  }
  
  if (description !== undefined && typeof description !== 'string') {
    errors.push('Description must be a string');
  }
  
  return errors;
};

// Routes

// GET /tasks - Get all tasks
app.get('/tasks', (req, res) => {
  res.status(200).json({
    success: true,
    data: tasks,
    count: tasks.length
  });
});

// GET /tasks/:id - Get task by ID
app.get('/tasks/:id', (req, res) => {
  const task = findTaskById(req.params.id);
  
  if (!task) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }
  
  res.status(200).json({
    success: true,
    data: task
  });
});

// POST /tasks - Create new task
app.post('/tasks', (req, res) => {
  const { title, description = '', completed = false } = req.body;
  
  // Validate input
  const errors = validateTask(title, description);
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }
  
  // Create new task
  const newTask = {
    id: nextId++,
    title: title.trim(),
    description: description.trim(),
    completed: Boolean(completed),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  tasks.push(newTask);
  
  res.status(201).json({
    success: true,
    data: newTask
  });
});

// PUT /tasks/:id - Update task
app.put('/tasks/:id', (req, res) => {
  const task = findTaskById(req.params.id);
  
  if (!task) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }
  
  const { title, description, completed } = req.body;
  
  // Validate input if title is being updated
  if (title !== undefined) {
    const errors = validateTask(title, description);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors
      });
    }
    task.title = title.trim();
  }
  
  // Update fields if provided
  if (description !== undefined) {
    task.description = description.trim();
  }
  
  if (completed !== undefined) {
    task.completed = Boolean(completed);
  }
  
  task.updatedAt = new Date().toISOString();
  
  res.status(200).json({
    success: true,
    data: task
  });
});

// DELETE /tasks/:id - Delete task
app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(task => task.id === parseInt(req.params.id));
  
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }
  
  const deletedTask = tasks.splice(taskIndex, 1)[0];
  
  res.status(200).json({
    success: true,
    message: 'Task deleted successfully',
    data: deletedTask
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Task API server running on http://localhost:${PORT}`);
  console.log('\nAvailable endpoints:');
  console.log('GET    /health           - Health check');
  console.log('GET    /tasks            - Get all tasks');
  console.log('GET    /tasks/:id        - Get task by ID');
  console.log('POST   /tasks            - Create new task');
  console.log('PUT    /tasks/:id        - Update task');
  console.log('DELETE /tasks/:id        - Delete task');
  console.log('\nExample usage:');
  console.log('curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d \'{"title":"Learn Node.js","description":"Build a REST API"}\'');
});

module.exports = app;