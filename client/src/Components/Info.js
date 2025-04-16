import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Info.css";
function Info() {
  const navigate = useNavigate();
  return (
    <div className="info-section" id="services">
      <div className="info-title-content">
        <h1 className="info-title">
          <span>What We Do</span>
        </h1>
        <p className="info-description">
          We bring health and fitness to your fingertips, offering a comprehensive range of on-demand wellness services tailored to your needs.
          Our platform connects you with expert trainer and nutrition specialists who provide personalized health guidance, customized fitness plans, and expert medical advice.
        </p>
      </div>

      <div className="info-cards-content">
       <div className="div-outer-most gap-new" onClick={() => navigate("/exercise")}>  
        <div className="text-img">Exercises</div>
        <div className="div-upper-img1 "></div>
       </div>
       <div className="div-outer-most gap-new" onClick={() => navigate("/nutrition")}>  
       <div className="text-img">Food & Protein</div>
        <div className="div-upper-img2 "></div>
       </div>
       <div className="div-outer-most gap-new">  
       <div className="text-img">Disease</div>
        <div className="div-upper-img3 "></div>
       </div>
      </div>
    </div>
  );
}

export default Info;







