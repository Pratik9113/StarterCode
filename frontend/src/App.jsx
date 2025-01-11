import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Options from "./components/Options";
import NgoSignIn from "./components/NgoSignIn";
import NgoSignUp from "./components/NgoSignUp";
import StudentSignIn from "./components/StudentSignIn";
import StudentSignUp from "./components/StudentSignUp";
import StudentProfile from "./components/StudentProfile";
import NgoDashboard from "./components/NgoDashboard";
import AssignedTodo from "./components/AssignedTodo";
import TodoRequest from "./components/TodoRequest";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Options />}></Route>
          <Route path='/ngo-signin' element={<NgoSignIn />}></Route>
          <Route path='/ngo-signup' element={<NgoSignUp />}></Route>
          <Route path='/student-signin' element={<StudentSignIn />}></Route>
          <Route path='/student-signup' element={<StudentSignUp />}></Route>
          <Route path='/student-profile' element={<StudentProfile />}></Route>
          <Route path='/ngo-dashboard' element={<NgoDashboard />}></Route>
          <Route path="/assigned-todo/:_id" element={<AssignedTodo/>} />
          <Route path="/ngo-todo-request" element={<TodoRequest/>}/>
        </Routes>
      </Router>
    </>
  )
};

export default App;
