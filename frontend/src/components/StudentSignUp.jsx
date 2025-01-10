import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'


const StudentSignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        email: "",
        password: "",
        age: "",
        income: "",
        ngo: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [ngo, setNgo] = useState([])

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
            console.log("Form data", formData)
            const url = `${import.meta.env.VITE_BACKEND}/user/student-signup`;
            const response = await axios.post(url, formData, {
                withCredentials: true,
                params: {
                    ngoId: formData.ngo
                }
            });
            if (response.data.success) {
                setSuccess(response.data.message);
                setError("");
                localStorage.setItem('loginUser', JSON.stringify(response.data.student))
                toast.success("Successfully SignUp")
                navigate("/student-profile");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
            toast.error("Something went wrong");
            setSuccess("");
        }
    };

    useEffect(() => {
        const fetchNgo = async () => {
            try {
                const ngoResponse = await axios.get(
                    `${import.meta.env.VITE_BACKEND}/ngo/all`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );
                console.log("Fetched Ngos are ", ngoResponse.data);
                setNgo(ngoResponse.data.ngo)  // Appending new value to a new array.
                toast.success("Ngo Fetched successfully");
            } catch (error) {
                console.log("Failed to fetch Ngos", error)
            }
        };
        fetchNgo();
    }, []);
    // console.log(ngo)
    return (
        <div className="signup-container">
            <h2>Student Sign Up</h2> <hr /> <br />
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    required
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    required
                    value={formData.age}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="income"
                    required
                    placeholder="Income"
                    value={formData.income}
                    onChange={handleChange}
                />
                <select name="ngo" id="ngo" onChange={handleChange}>
                    {ngo.map((ngo, index) => (
                        <option key={index} value={`${ngo._id}`}>{ngo.name}</option>
                    ))}
                </select>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default StudentSignUp;
