import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col, Card } from "react-bootstrap";
import { BloodContext } from "../../context/BloodContext";
import { FaTint, FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import AOS from "aos";
import "aos/dist/aos.css";
import "./bloodstock.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const BloodStock = () => {
  const { bloodStock, loadingStock, addStock, updateStock, deleteStock } =
    useContext(BloodContext);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ bloodGroup: "", units: "" });

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({ bloodGroup: "", units: "" });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!form.bloodGroup || !form.units) return;

    const payload = {
      bloodGroup: form.bloodGroup.trim(),
      units: Number(form.units),
    };

    try {
      if (editingId) {
        // Update existing stock
        await updateStock(editingId, payload);
      } else {
        // Add new stock
        await addStock(payload);
      }

      setForm({ bloodGroup: "", units: "" });
      setEditingId(null);
      setShowModal(false);
    } catch (err) {
      console.error("Error saving stock:", err);
      // You can add a toast or alert here if you want
    }
  };

  const handleEdit = (stock) => {
    setEditingId(stock.id);
    setForm({
      bloodGroup: stock.bloodGroup,
      units: stock.units,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    try {
      await deleteStock(id);
    } catch (err) {
      console.error("Error deleting stock:", err);
    }
  };

  const chartData = {
    labels: bloodStock.map((item) => item.bloodGroup),
    datasets: [
      {
        label: "Units",
        data: bloodStock.map((item) => Number(item.units) || 0),
        backgroundColor: [
          "#dc3545",
          "#fd7e14",
          "#ffc107",
          "#198754",
          "#0d6efd",
          "#6f42c1",
          "#20c997",
          "#e83e8c",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="blood-stock-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Blood Stock Management</h3>
        <Button variant="danger" onClick={handleOpenAdd}>
          <FaPlus className="me-2" /> Add Stock
        </Button>
      </div>

      {loadingStock ? (
        <p className="text-center">Loading stock...</p>
      ) : (
        <>
          <Row>
            {bloodStock.length === 0 ? (
              <p className="text-center">No stock available.</p>
            ) : (
              bloodStock.map((stock, index) => (
                <Col
                  md={4}
                  sm={6}
                  xs={12}
                  className="mb-4"
                  key={stock.id || index}
                >
                  <Card
                    className={`stock-card shadow ${
                      Number(stock.units) < 5 ? "low-stock" : ""
                    }`}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <Card.Body className="text-center">
                      <FaTint size={30} color="#dc3545" className="mb-3" />
                      <h4 className="fw-bold">{stock.bloodGroup}</h4>
                      <p className="mb-2">
                        Units Available:{" "}
                        <strong>{Number(stock.units) || 0}</strong>
                      </p>
                      {Number(stock.units) < 5 && (
                        <span className="badge bg-danger">Low Stock!</span>
                      )}
                      <div className="d-flex justify-content-center gap-2 mt-3">
                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() => handleEdit(stock)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleDelete(stock.id)}
                        >
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
          {bloodStock.length > 0 && (
            <Row className="mt-5">
              <Col md={6} className="mx-auto">
                <Card className="p-3 shadow-sm" data-aos="fade-up">
                  <h5 className="text-center mb-3 fw-bold">
                    Blood Group Distribution
                  </h5>
                  <Doughnut key={JSON.stringify(chartData)} data={chartData} />
                </Card>
              </Col>
            </Row>
          )}
        </>
      )}

      {/* Add/Edit Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        dialogClassName="fade-in-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editingId ? "Edit Stock" : "Add Blood Stock"}
          </Modal.Title>
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
            {editingId ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BloodStock;
