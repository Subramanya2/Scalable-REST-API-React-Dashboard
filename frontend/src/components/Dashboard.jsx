import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { LogOut, Plus, Trash2, Edit2, Loader2, CheckCircle, Circle } from 'lucide-react';

const Dashboard = ({ setAuth }) => {
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '', status: 'pending' });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await api.get('/auth/me');
                setUser(userRes.data.data);

                const tasksRes = await api.get('/tasks');
                setTasks(tasksRes.data.data);
            } catch (err) {
                if (err.response?.status === 401) {
                    logout();
                } else {
                    setError('Could not fetch data. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setAuth(false);
        navigate('/login');
    };

    const handleOpenModal = (task = null) => {
        if (task) {
            setCurrentTask(task);
            setFormData({ title: task.title, description: task.description, status: task.status });
        } else {
            setCurrentTask(null);
            setFormData({ title: '', description: '', status: 'pending' });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentTask(null);
    };

    const handleSaveTask = async (e) => {
        e.preventDefault();
        try {
            if (currentTask) {
                // Update
                const res = await api.put(`/tasks/${currentTask._id}`, formData);
                setTasks(tasks.map(t => t._id === currentTask._id ? res.data.data : t));
            } else {
                // Create
                const res = await api.post('/tasks', formData);
                setTasks([...tasks, res.data.data]);
            }
            handleCloseModal();
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to save task');
        }
    };

    const handleDeleteTask = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await api.delete(`/tasks/${id}`);
                setTasks(tasks.filter(t => t._id !== id));
            } catch (err) {
                alert(err.response?.data?.error || 'Failed to delete task');
            }
        }
    };

    const toggleTaskStatus = async (task) => {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        try {
            const res = await api.put(`/tasks/${task._id}`, { status: newStatus });
            setTasks(tasks.map(t => t._id === task._id ? res.data.data : t));
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to update task');
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Loader2 className="animate-spin" size={48} color="var(--primary)" style={{ animation: 'spin 1s linear infinite' }} />
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', padding: '2rem 0' }}>
            <div className="container animate-fade-in">
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Dashboard</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Welcome back, <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{user?.name}</span> {user?.role === 'admin' && '(Admin)'}</p>
                    </div>
                    <button onClick={logout} className="btn btn-secondary">
                        <LogOut size={18} /> Logout
                    </button>
                </header>

                {error && (
                    <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', border: '1px solid rgba(239,68,68,0.3)' }}>
                        {error}
                    </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem' }}>Your Tasks</h2>
                    <button onClick={() => handleOpenModal()} className="btn btn-primary">
                        <Plus size={18} /> New Task
                    </button>
                </div>

                {tasks.length === 0 ? (
                    <div className="card text-center" style={{ borderStyle: 'dashed', backgroundColor: 'transparent' }}>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>No tasks found. Create one to get started!</p>
                        <button onClick={() => handleOpenModal()} className="btn btn-primary">Create Task</button>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {tasks.map(task => (
                            <div key={task._id} className="card glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <button
                                            onClick={() => toggleTaskStatus(task)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: task.status === 'completed' ? 'var(--success)' : 'var(--text-muted)' }}
                                        >
                                            {task.status === 'completed' ? <CheckCircle size={24} /> : <Circle size={24} />}
                                        </button>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', textDecoration: task.status === 'completed' ? 'line-through' : 'none', color: task.status === 'completed' ? 'var(--text-muted)' : 'var(--text)' }}>
                                            {task.title}
                                        </h3>
                                    </div>
                                    <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '1rem', backgroundColor: 'var(--surface-hover)', color: 'var(--text-muted)' }}>
                                        {task.status}
                                    </span>
                                </div>

                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', flexGrow: 1, marginBottom: '1.5rem', textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}>
                                    {task.description}
                                </p>

                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                                    {user?.role === 'admin' && (
                                        <div style={{ marginRight: 'auto', fontSize: '0.8rem', color: 'var(--primary)', display: 'flex', alignItems: 'center' }}>
                                            User: {task.user?.name || task.user}
                                        </div>
                                    )}
                                    <button onClick={() => handleOpenModal(task)} className="btn btn-secondary" style={{ padding: '0.5rem' }} title="Edit">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDeleteTask(task._id)} className="btn btn-danger" style={{ padding: '0.5rem' }} title="Delete">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal for Create/Edit */}
                {showModal && (
                    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '1rem' }}>
                        <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '500px', backgroundColor: 'var(--surface)' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>
                                {currentTask ? 'Edit Task' : 'Create New Task'}
                            </h2>
                            <form onSubmit={handleSaveTask}>
                                <div className="form-group">
                                    <label className="form-label">Title</label>
                                    <input
                                        type="text"
                                        required
                                        maxLength="100"
                                        className="form-input"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        required
                                        maxLength="500"
                                        rows="4"
                                        className="form-input"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        style={{ resize: 'vertical' }}
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Status</label>
                                    <select
                                        className="form-select"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">{currentTask ? 'Update Task' : 'Create Task'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
