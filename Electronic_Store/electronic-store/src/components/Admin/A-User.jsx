import React from "react";
import styles from "../../css/Admin/A-User.module.css";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Inactive" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "User", status: "Active" },
  { id: 4, name: "Emily Davis", email: "emily@example.com", role: "User", status: "Inactive" },
];

const ManageUsers = ({ onAdd, onEdit }) => {
  return (
    <div className={styles.userTable}>
      <div className={styles.tableHeader}>
        <h2>Manage Users</h2>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div>
                  <p>{user.name}</p>
                  <span>{user.email}</span>
                </div>
              </td>
              <td>{user.role}</td>
              <td className={user.status === "Inactive" ? styles.inactive : styles.active}>
                {user.status}
              </td>
              <td>
                <button onClick={() => onAdd()}>Add</button> | 
                <button onClick={() => onEdit(user)}>Edit</button> | 
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;