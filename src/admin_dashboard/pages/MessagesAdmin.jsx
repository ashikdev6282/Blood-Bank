import React, { useState } from 'react';
import './messagesadmin.css';
import { Modal, Button } from 'react-bootstrap';

const MessagesAdmin = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Ashik T. N.",
      email: "ashik@example.com",
      phone: "+91 9876543210",
      message: "I would like to volunteer in your next blood donation drive. Please get in touch.",
      date: "2025-06-15",
      status: "unread"
    },
    {
      id: 2,
      name: "Sana P.",
      email: "sana.p@example.com",
      phone: "+91 9123456789",
      message: "Do you have O+ stock available? My brother needs it urgently.",
      date: "2025-06-14",
      status: "read"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleMarkAsRead = (id) => {
    setMessages(messages.map(msg =>
      msg.id === id ? { ...msg, status: 'read' } : msg
    ));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      setMessages(messages.filter(msg => msg.id !== id));
    }
  };

  const filteredMessages = messages.filter(msg =>
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-messages-section container" style={{ margin: '100px' }}>
      <h2 className="section-title">User Messages</h2>

      <input
        type="text"
        placeholder="Search by name, email, or message..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => (
                <tr key={msg.id}>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.phone}</td>
                  <td>{msg.message.slice(0, 30)}...</td>
                  <td>{msg.date}</td>
                  <td>
                    <span className={`status-badge ${msg.status}`}>
                      {msg.status}
                    </span>
                  </td>
                  <td>
                    <button className="view-btn" onClick={() => setSelectedMessage(msg)}>View</button>
                    <a className="reply-btn" href={`mailto:${msg.email}`}>Reply</a>
                    <button className="delete-btn" onClick={() => handleDelete(msg.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7">No messages found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedMessage && (
        <Modal show onHide={() => setSelectedMessage(null)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Message from {selectedMessage.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Email:</strong> {selectedMessage.email}</p>
            <p><strong>Phone:</strong> {selectedMessage.phone}</p>
            <p><strong>Date:</strong> {selectedMessage.date}</p>
            <hr />
            <p>{selectedMessage.message}</p>
          </Modal.Body>
          <Modal.Footer>
            {selectedMessage.status === 'unread' && (
              <Button
                variant="success"
                onClick={() => {
                  handleMarkAsRead(selectedMessage.id);
                  setSelectedMessage(null);
                }}
              >
                Mark as Read
              </Button>
            )}
            <Button variant="secondary" onClick={() => setSelectedMessage(null)}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default MessagesAdmin;
