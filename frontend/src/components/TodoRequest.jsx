import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TodoRequest = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchVerifyTodoForNgo = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}/todo/get-all-todo`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data) {
        console.log("Request", response.data.ngo);
        setRequests(response.data.ngo.todoRequests);
      } else {
        setError("Failed to fetch the request");
      }
    };

    fetchVerifyTodoForNgo();
  }, []);

  const handleApprove = async (request) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND}/todo/update-todo-currency`,
        {
          completed: true,
        },
        {
          withCredentials: true,
          params: {
            todoId: request._id,
            studentId: request.studentId._id,
          },
        }
      );
      if (response.data.sucess) {
        setRequests((prevRequest) =>
          prevRequest.filter((todo) => todo._id !== request._id)
        );
        alert("Todo verified successfully")
      }
    } catch (error) {
      console.log("Some error occured", error);
    }
  };

  const handleReject = (index) => {
    const updatedRequests = [...requests];
    updatedRequests.splice(index, 1);
    setRequests(updatedRequests);
  };

  return (
    <>
      <div className="request-container">
        <h2 className="request-title">Pending Requests</h2> <hr /> <br />
        {requests.length === 0 ? (
          <p className="no-requests">
            No requests available <br /> <br />{" "}
            <button onClick={() => navigate("/ngo-dashboard")}>Go Back</button>
          </p>
        ) : (
          <table className="request-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Title</th>
                <th>Description</th>
                <th>Points</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={index}>
                  <td>{request.studentId.name}</td>
                  <td>{request.studentId.email}</td>
                  <td>{request.title}</td>
                  <td>{request.description}</td>
                  <td>{request.points}</td>
                  <td>
                    <button
                      className="approve-btn"
                      onClick={() => handleApprove(request)}
                    >
                      Verify
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleReject(index)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default TodoRequest;
