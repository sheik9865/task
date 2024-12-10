import React, { useState, useEffect } from 'react';
import NavBarComponent from '../partials/NavBarComponent';
import { getCourses, createCourse, updateCourse, deleteCourse } from "../src/api";

const CoursesComponent = () => {
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({ name: '', description: '', duration: '', fee: '' });
    const [editingCourse, setEditingCourse] = useState(null); 

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await getCourses();
                if (Array.isArray(response.data)) {
                    setCourses(response.data);
                } else {
                    console.error('Expected array but got:', response.data);
                    setCourses([]);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
    
        fetchCourses();
    }, []);
    
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCourse) {
                await updateCourse(editingCourse.id, formData);
                setCourses(courses.map(course =>
                    course.id === editingCourse.id ? { ...course, ...formData } : course
                ));
                setEditingCourse(null); 
            } else {
                const response = await createCourse(formData);
                setCourses([...courses, response.data]);
            }
            setFormData({ name: '', description: '', duration: '', fee: '' }); 
        } catch (error) {
            console.error('Error submitting course:', error);
        }
    };

    const handleDeleteCourse = async (id) => {
        try {
            await deleteCourse(id);
            setCourses(courses.filter(course => course.id !== id));
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    const handleEditCourse = (course) => {
        setEditingCourse(course);
        setFormData({ name: course.name, description: course.description, duration: course.duration, fee: course.fee });
    };

    return (
        <>
            <NavBarComponent />
            <div className="container mt-4">
                <h2>{editingCourse ? 'Edit Course' : 'Add New Course'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            className="form-control"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration</label>
                        <input
                            type="text"
                            name="duration"
                            className="form-control"
                            value={formData.duration}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Fee</label>
                        <input
                            type="number"
                            name="fee"
                            className="form-control"
                            value={formData.fee}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-2">
                        {editingCourse ? 'Update Course' : 'Add Course'}
                    </button>
                </form>
                <hr />
                <h2>Courses</h2>
                <table className="table table-bordered mt-4">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Fee</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(courses && courses.length > 0) ? (
                            courses.map((course) => (
                                <tr key={course.id}>
                                    <td>{course.name}</td>
                                    <td>{course.description}</td>
                                    <td>{course.duration}</td>
                                    <td>{course.fee}</td>
                                    <td>
                                        <button className="btn btn-sm btn-warning" onClick={() => handleEditCourse(course)}>Edit</button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteCourse(course.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center' }}>No courses available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CoursesComponent;
