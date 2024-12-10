import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBarComponent from '../partials/NavBarComponent';
import { getTrainingSchedules, createTrainingSchedule, updateTrainingSchedule, deleteTrainingSchedule } from "../src/api";

const TrainingScheduleComponent = () => {
    const [trainingSchedules, setTrainingSchedules] = useState([]);
    const [formData, setFormData] = useState({
        course_id: '',
        trainer_name: '',
        start_date: '',
        end_date: '',
        time_slot: ''
    });
    const [editingSchedule, setEditingSchedule] = useState(null);

    // Fetch training schedules on component mount
    useEffect(() => {
        const fetchTrainingSchedules = async () => {
            try {
                const response = await getTrainingSchedules();
                if (Array.isArray(response.data)) {
                    setTrainingSchedules(response.data);
                } else {
                    console.error('Expected an array but got:', response.data);
                    setTrainingSchedules([]);
                }
            } catch (error) {
                console.error('Failed to fetch training schedules:', error);
            }
        };
        fetchTrainingSchedules();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingSchedule) {
                await updateTrainingSchedule(editingSchedule.id, formData);
                setTrainingSchedules(trainingSchedules.map(schedule =>
                    schedule.id === editingSchedule.id ? { ...schedule, ...formData } : schedule
                ));
                setEditingSchedule(null);
            } else {
                const response = await createTrainingSchedule(formData);
                setTrainingSchedules([...trainingSchedules, response.data]);
            }

            setFormData({ course_id: '', trainer_name: '', start_date: '', end_date: '', time_slot: '' });
        } catch (error) {
            console.error('Failed to submit training schedule:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTrainingSchedule(id);
            setTrainingSchedules(trainingSchedules.filter(schedule => schedule.id !== id));
        } catch (error) {
            console.error('Failed to delete training schedule:', error);
        }
    };

    const handleEdit = (schedule) => {
        setEditingSchedule(schedule);
        setFormData({
            course_id: schedule.course_id,
            trainer_name: schedule.trainer_name,
            start_date: schedule.start_date,
            end_date: schedule.end_date,
            time_slot: schedule.time_slot
        });
    };

    return (
        <>
            <NavBarComponent />
            <div className="container mt-4">
                <h2>{editingSchedule ? 'Edit Training Schedule' : 'Add New Training Schedule'}</h2>

                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-3">
                        <label className="form-label">Course ID</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter course ID"
                            name="course_id"
                            value={formData.course_id}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Trainer Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter trainer's name"
                            name="trainer_name"
                            value={formData.trainer_name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Start Date</label>
                        <input
                            type="date"
                            className="form-control"
                            name="start_date"
                            value={formData.start_date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">End Date</label>
                        <input
                            type="date"
                            className="form-control"
                            name="end_date"
                            value={formData.end_date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Time Slot</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter time slot"
                            name="time_slot"
                            value={formData.time_slot}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary mt-2">
                        {editingSchedule ? 'Update Schedule' : 'Add Schedule'}
                    </button>
                </form>

                <h3 className="mt-5">Training Schedules</h3>

                <table className="table table-striped mt-3">
                    <thead className="table-dark">
                        <tr>
                            <th>Course ID</th>
                            <th>Trainer Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Time Slot</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainingSchedules.length > 0 ? (
                            trainingSchedules.map(schedule => (
                                <tr key={schedule.id}>
                                    <td>{schedule.course_id}</td>
                                    <td>{schedule.trainer_name}</td>
                                    <td>{schedule.start_date}</td>
                                    <td>{schedule.end_date}</td>
                                    <td>{schedule.time_slot}</td>
                                    <td>
                                        <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(schedule)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(schedule.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No training schedules available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TrainingScheduleComponent;
