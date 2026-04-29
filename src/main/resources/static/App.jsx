const { useState, useEffect, useCallback } = React;
const API_URL = '/students';

const App = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', course: '' });
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState([]);

  // Fetch Students
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setStudents(data);
      setFilteredStudents(data);
    } catch (error) {
      addToast('Failed to connect to server', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Search Filter
  useEffect(() => {
    const filtered = students.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.course.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Toast System
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editId ? 'PUT' : 'POST';
      const url = editId ? `${API_URL}/${editId}` : API_URL;
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        addToast(editId ? 'Student updated successfully!' : 'New student added!');
        setFormData({ name: '', email: '', course: '' });
        setEditId(null);
        fetchStudents();
      } else {
        addToast('Operation failed', 'error');
      }
    } catch (error) {
      addToast('Network error', 'error');
    }
  };

  // Edit Mode
  const handleEdit = (student) => {
    setEditId(student.id);
    setFormData({ name: student.name, email: student.email, course: student.course });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this student?')) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        addToast('Student record removed', 'info');
        fetchStudents();
      }
    } catch (error) {
      addToast('Delete failed', 'error');
    }
  };

  // Stats
  const stats = {
    total: students.length,
    courses: [...new Set(students.map(s => s.course))].length,
    active: filteredStudents.length
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="brand">
            <div className="brand-icon">🎓</div>
            <span className="brand-name">Studix Student Manager</span>
          </div>
          <div className="header-badge" style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
            Logged in as Admin
          </div>
        </div>
      </nav>

      <div className="container">
        {/* SIDEBAR FORM */}
        <aside>
          <div className="glass-card">
            <h2 className="form-title">
              {editId ? '✏️ Edit Record' : '➕ Enroll Student'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Full Name</label>
                <input 
                  type="text" name="name" className="input-field" 
                  placeholder="e.g. John Doe" value={formData.name}
                  onChange={handleInputChange} required 
                />
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <input 
                  type="email" name="email" className="input-field" 
                  placeholder="john@example.com" value={formData.email}
                  onChange={handleInputChange} required 
                />
              </div>
              <div className="input-group">
                <label>Major Course</label>
                <input 
                  type="text" name="course" className="input-field" 
                  placeholder="e.g. Computer Science" value={formData.course}
                  onChange={handleInputChange} required 
                />
              </div>
              
              <button type="submit" className="btn btn-primary">
                {editId ? 'Update Information' : 'Enroll Student'}
              </button>
              
              {editId && (
                <button 
                  type="button" className="btn btn-secondary" style={{marginTop: '10px'}}
                  onClick={() => {setEditId(null); setFormData({name:'', email:'', course:''})}}
                >
                  Cancel Edit
                </button>
              )}
            </form>
          </div>
        </aside>

        {/* MAIN LIST AREA */}
        <main>
          {/* STATS OVERVIEW */}
          <div className="stats-overview">
            <div className="stat-card">
              <span className="stat-label">Total Enrollment</span>
              <span className="stat-value">{stats.total}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Unique Courses</span>
              <span className="stat-value">{stats.courses}</span>
            </div>
          </div>

          <div className="glass-card">
            <div className="table-header">
              <h2 style={{fontSize: '20px', fontWeight: '700'}}>Directory</h2>
              <div className="search-box">
                <span className="search-icon">🔍</span>
                <input 
                  type="text" className="search-input" 
                  placeholder="Search database..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="table-container">
              {loading ? (
                <div style={{padding: '40px', textAlign: 'center'}}>
                  <div className="spinner" style={{margin: '0 auto'}}></div>
                  <p style={{marginTop: '15px', color: 'var(--text-muted)'}}>Connecting to Database...</p>
                </div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Email</th>
                      <th>Course</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map(student => (
                        <tr key={student.id} className="student-row">
                          <td>
                            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                              <div style={{width: '32px', height: '32px', borderRadius: '50%', background: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px'}}>👤</div>
                              <span style={{fontWeight: '600', color: '#fff'}}>{student.name}</span>
                            </div>
                          </td>
                          <td>{student.email}</td>
                          <td>
                            <span className="course-badge">{student.course}</span>
                          </td>
                          <td>
                            <div className="actions">
                              <button className="action-btn btn-edit" onClick={() => handleEdit(student)}>✏️</button>
                              <button className="action-btn btn-delete" onClick={() => handleDelete(student.id)}>🗑️</button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" style={{textAlign: 'center', padding: '40px', color: 'var(--text-muted)'}}>
                          No records found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* TOAST NOTIFICATIONS */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            <span style={{fontSize: '18px'}}>{toast.type === 'error' ? '❌' : '✅'}</span>
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
};

// Mount the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
