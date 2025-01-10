import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";
const StudentSignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://localhost:5000/user/student-login';
            const response = await axios.post(url, formData, {
                withCredentials: true,
            });
            if (response.data.success) {
                setSuccess(response.data.message);
                setError("");
                localStorage.setItem('loginUser', JSON.stringify(response.data.student))
                toast.success("Successfully Login")
                navigate("/student-profile")
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
            toast.error("Failed to Login")
            setSuccess("");
        }
    };

    return (
        <div className="signin-container">
            <h2>Student Sign In</h2>  <hr /> <br />
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    required
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default StudentSignIn;
