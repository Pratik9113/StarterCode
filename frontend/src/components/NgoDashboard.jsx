import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Todo from "./Todo";
const NgoDashboard = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const handleLogout = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/user/logout`,{
            withCredentials:true
        })
        if(response.status==200){
            alert(response.data.msg)
            navigate("/");
        }
        else{
            alert(response.data.msg)
        }
    };


    useEffect(() => {
        const getStudentforNgo = async () => {
            const url = `${import.meta.env.VITE_BACKEND}/student/get-student-for-ngo`;
            try {
                const response = await axios.get(url,
                    {
                        withCredentials: true
                    }
                )
                if (response.data.success) {
                    setData(response.data.data.student)
                }
            } catch (error) {
                alert(error);
            }
        }
        getStudentforNgo();
    }, [])

    const [selectedRow, setSelectedRow] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleRowClick = (userData) => {
        setSelectedRow(userData);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleTodoRequest = () => {
        navigate('/ngo-todo-request')
    }

    return (
        <>
            <div className="dashboard-container">
                <h2 className="dashboard-title">NGO - Dashboard</h2>
                <button onClick={handleTodoRequest}>Todo - Request</button>
                <center>
                    <p>(Click the User to Assign Task)</p>
                </center>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item._id}>
                                <td onClick={() => handleRowClick(item)}>{item.name}</td>
                                <td onClick={() => handleRowClick(item)}>{item.email}</td>
                                <td>{item.address}</td>
                                <td>{item.age}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {selectedRow && modalOpen &&
                    <Todo user={selectedRow} handleCloseModal={handleCloseModal} />
                }

                <br /> <br />
                <button onClick={handleLogout}>Logout</button>
            </div>
        </>
    );
};

export default NgoDashboard;