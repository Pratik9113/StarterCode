import React, { useEffect, useState } from "react";

const Navbar = () => {
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

    const handleOpenPopup = () => {
        setPopup(true)
    }
    
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

                <button className="navigate-btn">
                    AssignedTodo
                </button>

                <button>Logout</button>
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