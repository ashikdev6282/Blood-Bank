import React, { useContext, useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col, Card } from 'react-bootstrap';
import { BloodContext } from '../../context/BloodContext';
import { FaTint, FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './bloodstock.css'; 

ChartJS.register(ArcElement, Tooltip, Legend);

const BloodStock = () => {
  const { bloodStock, setBloodStock } = useContext(BloodContext);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({ bloodGroup: '', units: '' });

  useEffect(() => {
    AOS.init({ duration: 800 });
    if (bloodStock.length === 0) {
      setBloodStock([
        { bloodGroup: 'A+', units: 10 },
        { bloodGroup: 'O-', units: 3 },
        { bloodGroup: 'B+', units: 7 },
        { bloodGroup: 'AB-', units: 2 },
      ]);
    }
  }, [bloodStock, setBloodStock]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.bloodGroup || !form.units) return;
    if (editingIndex !== null) {
      const updated = [...bloodStock];
      updated[editingIndex] = form;
      setBloodstock(updated);
    } else {
      setBloodstock([...bloodStock, form]);
    }

    setForm({ bloodGroup: '', units: '' });
    setEditingIndex(null);
    setShowModal(false);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setForm(bloodStock[index]);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const updated = bloodStock.filter((_, i) => i !== index);
    setBloodStock(updated);
  };

  const chartData = {
    labels: bloodStock.map((item) => item.bloodGroup),
    datasets: [
      {
        label: 'Units',
        data: bloodStock.map((item) => item.units),
        backgroundColor: [
          '#dc3545', '#fd7e14', '#ffc107', '#198754', '#0d6efd', '#6f42c1', '#20c997', '#e83e8c'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="blood-stock-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Blood Stock Management</h3>
        <Button variant="danger" onClick={() => setShowModal(true)}>
          <FaPlus className="me-2" /> Add Stock
        </Button>
      </div>

      <Row>
        {bloodStock.length === 0 ? (
          <p className="text-center">No stock available.</p>
        ) : (
          bloodStock.map((stock, index) => (
            <Col md={4} sm={6} xs={12} className="mb-4" key={index}>
              <Card
                className={`stock-card shadow ${stock.units < 5 ? 'low-stock' : ''}`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <Card.Body className="text-center">
                  <FaTint size={30} color="#dc3545" className="mb-3" />
                  <h4 className="fw-bold">{stock.bloodGroup}</h4>
                  <p className="mb-2">
                    Units Available: <strong>{stock.units}</strong>
                  </p>
                  {stock.units < 5 && (
                    <span className="badge bg-danger">Low Stock!</span>
                  )}
                  <div className="d-flex justify-content-center gap-2 mt-3">
                    <Button size="sm" variant="outline-primary" onClick={() => handleEdit(index)}>
                      <FaEdit />
                    </Button>
                    <Button size="sm" variant="outline-danger" onClick={() => handleDelete(index)}>
                      <FaTrash />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Doughnut chart placed below cards */}
      <Row className="mt-5">
        <Col md={6} className="mx-auto">
          <Card className="p-3 shadow-sm" data-aos="fade-up">
            <h5 className="text-center mb-3 fw-bold">Blood Group Distribution</h5>
            <Doughnut key={JSON.stringify(chartData)} data={chartData} />
          </Card>
        </Col>
      </Row>

      {/* Add/Edit Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        dialogClassName="fade-in-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>{editingIndex !== null ? 'Edit Stock' : 'Add Blood Stock'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Blood Group</Form.Label>
              <Form.Control
                type="text"
                name="bloodGroup"
                placeholder="e.g. A+"
                value={form.bloodGroup}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Units</Form.Label>
              <Form.Control
                type="number"
                name="units"
                min={1}
                placeholder="Enter number of units"
                value={form.units}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSubmit}>
            {editingIndex !== null ? 'Update' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BloodStock;

