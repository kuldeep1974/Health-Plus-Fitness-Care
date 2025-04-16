import React from "react";

function InformationCard(props) {
  return (
    <div className="info-cards">
      {/* <span className="info-card-icon">
        <FontAwesomeIcon className="info-fa-icon" icon={props.icon}  />
      </span> */}
      <img 
  style={{ height: '100%', width: '100%', transition: "transform 0.3s ease-in-out" }} 
  className="image-hover-what-we-do" 
  src={props.imgName} 
  onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
  onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
  alt="description"
/>

    </div>
  );
}

export default InformationCard;
