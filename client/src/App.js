import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Exercise from "./Pages/Exercise";
import Home from "./Pages/Home";
import Legal from "./Pages/Legal";
import NotFound from "./Pages/NotFound";
import NutritionCard from "./Pages/NutritionCard";
import Main from "./Components/Main";
import LoginForm from "./Components/Login";


function App() {

  return (
    <div className="App">
      <Router >
       <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/exercise" element={<Exercise />} />
          <Route path="/nutrition" element={<NutritionCard />} />
          <Route path="/signup" element={<Main/>} />
          <Route path="/login" element={<LoginForm/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
