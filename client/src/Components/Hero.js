import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Hero.css";

function Hero() {
  const navigate = useNavigate();
  const [goUp, setGoUp] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookAppointmentClick = () => {
    navigate("/appointment");
  };

  useEffect(() => {
    const onPageScroll = () => {
      if (window.scrollY > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  return (
    <div className="section-container">
      <div className="hero-section">
        <div className="text-section">
          <p className="text-headline">❤️ Health comes first</p>
          <h2 className="text-title">
          Your Ultimate Fitness & Wellness Hub
          </h2>
          <p className="text-descritpion">
          Achieve your health goals with expert guidance! From personalized workout plans to nutrition advice, we bring fitness and healthcare together. Track progress, stay motivated, and transform your lifestyle—anytime, anywhere.
          </p>
          {/* <button
            className="text-appointment-btn"
            type="button"
            onClick={handleBookAppointmentClick}
          >
            <FontAwesomeIcon icon={faCalendarCheck} /> Book Appointment
          </button> */}
          <div className="text-stats">
            <div className="text-stats-container">
              <p> 1500+</p>
              <p>✅ Active Members </p>
            </div>

            <div className="text-stats-container">
              <p>50+</p>
              <p>💪 Personal Trainers</p>
            </div>

            <div className="text-stats-container">
              <p>12+</p>
              <p>🕒 Years of Expertise</p>
            </div>
          </div>
        </div>

        <div className="hero-image-section">
          {/* <img className="hero-image1" src={gymImage} alt="Doctor" /> */}
        </div>
      </div>

      <div
        onClick={scrollToTop}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </div>
  );
}

export default Hero;
