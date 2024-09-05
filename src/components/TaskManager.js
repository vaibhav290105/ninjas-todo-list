import React, { useState, useEffect } from 'react';
import './TaskManager.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleCreateTask = () => {
    if (taskName && taskDescription) {
      const newTask = { name: taskName, description: taskDescription };
      setTasks([...tasks, newTask]);
      setTaskName('');
      setTaskDescription('');
    }
  };

  const handleEditTask = (index) => {
    setTaskName(tasks[index].name);
    setTaskDescription(tasks[index].description);
    setEditIndex(index);
    setIsEditing(true);
  };

  const handleUpdateTask = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editIndex] = { name: taskName, description: taskDescription };
    setTasks(updatedTasks);
    setTaskName('');
    setTaskDescription('');
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const clearModal = () => {
    setTaskName('');
    setTaskDescription('');
    setIsEditing(false);
  };

  return (
    <div className="task-container">
      <button className="create-task" data-bs-toggle="modal" data-bs-target="#createTaskModal">
        Create Task
      </button>

      {/* Modal for Creating Task */}
      <div className="modal fade" id="createTaskModal" tabIndex="-1" aria-labelledby="createTaskModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content modal-container">
            <div className="modal-header header">
              <h5 className="modal-title" id="createTaskModalLabel">{isEditing ? 'Update Task' : 'Create Task'}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={clearModal}></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Task Name"
              />
              <textarea
                className="form-control mt-3"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Task Description"
              ></textarea>
            </div>
            <div className="modal-footer">
              {isEditing ? (
                <>
                  <button className="update" onClick={handleUpdateTask} data-bs-dismiss="modal">Update</button>
                  <button className="cancel" onClick={clearModal} data-bs-dismiss="modal">Cancel</button>
                </>
              ) : (
                <button className="create" onClick={handleCreateTask} data-bs-dismiss="modal">Create</button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="task-list">
        {tasks.map((task, index) => (
          <div key={index} className="task-card">
            <h5>{task.name}</h5>
            <p>{task.description}</p>
            <button
              className="edit-btn far fa-edit m-3"
              onClick={() => handleEditTask(index)}
              data-bs-toggle="modal"
              data-bs-target="#createTaskModal"
            ></button>
            <button
              className="delete-btn fas fa-trash-alt"
              onClick={() => handleDeleteTask(index)}
            ></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
