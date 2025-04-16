import React from "react";
import brock from '../Assets/motivator-1.jpg';
import gold from '../Assets/Motivator-2.jpg';
import jhon from "../Assets/motivator-3.jpg";
import "../Styles/Doctors.css";
import DoctorCard from "./DoctorCard";

function Doctors() {
  return (
    <div className="doctor-section" id="motivators">
      <div className="dt-title-content">
        <h3 className="dt-title">
          <span>Meet Our Motivators</span>
        </h3>

        <p className="dt-description">
          Welcome to Health Plus Fitness Care Solutions! Our team of expert fitness professionals is here to help you achieve your best self. With their skills and experience, you can trust them to guide you toward a healthier, stronger, and happier life. Whether you need medical advice, personalized fitness plans, or wellness tips, we’ve got you covered.
        </p>
      </div>

      <div className="dt-cards-content">
        <DoctorCard
          img={brock}
          name="Brock-Lesner"
          title="WWE-Champion"
          stars="4.9"
        />
        <DoctorCard
          img={jhon}
          name="John-China"
          title="WWE-Champion"
          stars="4.8"
        />
        <DoctorCard
          img={gold}
          name="Gold-Berg"
          title="WWE-Champion"
          stars="4.7"
        />
      </div>
    </div>
  );
}

export default Doctors;
