import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBarComponent from '../partials/NavBarComponent';
import { getStudents, createStudent, updateStudent, deleteStudent } from "../src/api";

const StudentsComponent = () => {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact_number: '',
        address: ''
    });
    const [editingStudent, setEditingStudent] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await getStudents();
                if (Array.isArray(response.data)) {
                    setStudents(response.data);
                } else {
                    console.error('Expected array but got:', response.data);
                    setStudents([]);
                }
            } catch (error) {
                console.error('Failed to fetch students:', error);
            }
        };
        fetchStudents();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingStudent) {
                await updateStudent(editingStudent.id, formData);
                setStudents(students.map(student =>
                    student.id === editingStudent.id ? { ...student, ...formData } : student
                ));
                setEditingStudent(null);
            } else {
                const response = await createStudent(formData);
                setStudents([...students, response.data]);
            }

            setFormData({ name: '', email: '', contact_number: '', address: '' });
        } catch (error) {
            console.error('Failed to submit student:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteStudent(id);
            setStudents(students.filter(student => student.id !== id));
        } catch (error) {
            console.error('Failed to delete student:', error);
        }
    };

    const handleEdit = (student) => {
        setEditingStudent(student);
        setFormData({
            name: student.name,
            email: student.email,
            contact_number: student.contact_number,
            address: student.address
        });
    };

    return (
        <>
            <NavBarComponent/>
            <div className="container mt-4">
                <h2>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>

                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter full name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contact Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            placeholder="Enter contact number"
                            name="contact_number"
                            value={formData.contact_number}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-2">
                        {editingStudent ? 'Update Student' : 'Add Student'}
                    </button>
                </form>

                <h3 className="mt-5">Students List</h3>

                <table className="table table-striped mt-3">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map(student => (
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.contact_number}</td>
                                    <td>{student.address}</td>
                                    <td>
                                        <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(student)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(student.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No students available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default StudentsComponent;
