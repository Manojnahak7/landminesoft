import React, { useState, useEffect } from "react";
import "../../components/Admin/AdminPannel.css";
import { useAuth } from "../../context/AuthContext";

const API_BASE = "http://localhost:7689";

const AdminPanel = () => {
  const { user, logout } = useAuth();

  if (!user || user.role !== "ADMIN") {
    return (
      <div className="admin-access-denied">
        <h2>🚫 Access Denied</h2>
        <p>Only admins can access this panel.</p>
      </div>
    );
  }

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/admin/users`);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-section">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <div className="admin-user-info">
          <span>👑 Admin: {user.fullName}</span>
          <button onClick={logout} className="admin-logout-btn">
            Logout
          </button>
        </div>
      </div>

      <div className="admin-card">
        <h2>All Users ({users.length})</h2>

        {loading ? (
          <div className="admin-loading">Loading users...</div>
        ) : (
          <div className="admin-users-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>College</th>
                  <th>CGPA</th>
                  <th>Company</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.fullName}</td>
                    <td>{u.email}</td>
                    <td>{u.city}</td>
                    <td>{u.collegeName}</td>
                    <td>{u.cgpa}</td>
                    <td>{u.currentCompany || "-"}</td>
                    <td>
                      <span
                        className={`role-badge role-${u.role.toLowerCase()}`}
                      >
                        {u.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminPanel;
