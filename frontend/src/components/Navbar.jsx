import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const [popup, setPopup] = useState(false);
    const [user, setUser] = useState({
        name: "pratik",
        email: "",
        age: 0,
        income: 0,
        virtualCurrency: 0,
        ngoName: "Helping Hands",
        profilePicture:
            "https://bolt-gcdn.sc-cdn.net/3/L1yaXqhMQGN8QPgxFYr8y?bo=EhgaABoAMgF9OgEEQgYI-vDorAZIAlASYAE%3D&uc=18", // Placeholder for profile picture
        _id: "",
    });

    useEffect(() => {
        const getStudentProfile = async () => {
            const url = `${import.meta.env.VITE_BACKEND}/student/profile`;
            try {
                const response = await axios.get(url, {
                    withCredentials: true
                })
                if (response.data.success) {
                    
                    setUser(response.data.data);
                }
            } catch (error) {
                alert(error);
            }
        }
        getStudentProfile();
    }, []);

    const handleOpenPopup = () => {
        setPopup(true)
    }
    const navigateToTodo =()=>{
        navigate(`/assigned-todo/${user._id}`)
    }
    const logout = async()=>{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/user/logout`,{
            withCredentials:true
        })
        const data = response.data;
        if(response.status==200){
            alert(data.msg)
            navigate('/')
        }
        else{
            alert(data.msg)
        }
    }
    // console.log(user._id)

    return (
        <div className="navbar">
            <div className="navbar-left">
                <span className="user-name" onClick={handleOpenPopup}>{user.name}</span>
            </div>

            <div className="navbar-right">
                <span className="currency-count">
                    VC: {user.virtualCurrency}
                </span>
                <button className="navigate-btn">
                    Go to Videos
                </button>

                <button className="navigate-btn" onClick={navigateToTodo}>
                    AssignedTodo
                </button>

                <button onClick={logout}>Logout</button>
            </div>


            {popup && <div className="popup-overlay">
                <div className="popup-container">
                    <button className="cancel-btn">
                        X
                    </button>
                    <div className="popup-content">
                        <h3>User Details</h3> <hr /> <br />
                        <p>
                            <strong>Name:</strong> {user.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {user.email}
                        </p>
                        <p>
                            <strong>Age:</strong> {user.age}
                        </p>
                        <p>
                            <strong>Income:</strong> ${user.income}
                        </p>
                        <p>
                            <strong>Virtual Currency:</strong> {user.virtualCurrency}
                        </p>
                        <br /> <hr /> <br />
                        <button>Logout</button>
                    </div>
                </div>
            </div>
            }
        </div>
    );
};

export default Navbar;