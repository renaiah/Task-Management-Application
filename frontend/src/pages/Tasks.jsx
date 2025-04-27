import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Tasks.css'; 
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskData, setEditedTaskData] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      navigate('/');
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post('http://localhost:5000/api/tasks', newTask, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewTask({ title: '', description: '' });
      fetchTasks();
    } catch (err) {
      alert('Create failed');
    }
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleEdit = task => {
    setEditingTask(task._id);
    setEditedTaskData({ title: task.title, description: task.description });
  };

  const handleUpdate = async id => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, editedTaskData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      alert('Update failed');
    }
  };

  useEffect(() => { 
    fetchTasks(); 
  }, []);

  return (
    <div className="container task-container d-flex flex-column align-items-center">
      <h2 className="my-4">Tasks</h2>
      <div className="mb-3 w-100" style={{ maxWidth: '500px' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          value={newTask.title}
          onChange={e => setNewTask({ ...newTask, title: e.target.value })}
        />
      </div>
      <div className="mb-3 w-100" style={{ maxWidth: '500px' }}>
        <textarea
          className="form-control"
          placeholder="Description"
          value={newTask.description}
          onChange={e => setNewTask({ ...newTask, description: e.target.value })}
          rows="3"
        ></textarea>
      </div>
      <button className="btn btn-primary mb-3" onClick={handleCreate}>Create</button>
      <ul className="list-group w-100" style={{ maxWidth: '500px' }}>
        {tasks.map(task => (
          <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{task.title}</strong>: {task.description}
            </div>
            <div>
              <button className="btn btn-secondary me-2" onClick={() => handleEdit(task)}><MdEditSquare /></button>
              <button className="btn btn-danger" onClick={() => handleDelete(task._id)}><MdDelete /></button>
            </div>
            {editingTask === task._id && (
              <div className="mt-3">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Edit Title"
                    value={editedTaskData.title}
                    onChange={e => setEditedTaskData({ ...editedTaskData, title: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Edit Description"
                    value={editedTaskData.description}
                    onChange={e => setEditedTaskData({ ...editedTaskData, description: e.target.value })}
                    rows="3"
                  ></textarea>
                </div>
                <button className="btn btn-success" onClick={() => handleUpdate(task._id)}>Update</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
