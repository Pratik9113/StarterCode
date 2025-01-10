import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
const NgoSignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

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
            const url = 'http://localhost:5000/user/ngo-login';
            const response = await axios.post(url, formData, {
                withCredentials: true
            })
            if (response.data.success) {
                // setSuccess(response.data.message);
                // setError("");

                // navigation for routing
                alert("Successfully Login")
                navigate("/ngo-dashboard")
            }
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div className="signin-container">
            <h2>NGO Sign In</h2> <hr /> <br />
            {/* {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>} */}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    required
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

export default NgoSignIn;