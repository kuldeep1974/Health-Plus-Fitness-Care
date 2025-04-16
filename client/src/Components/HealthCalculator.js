import React, { useState } from "react";

function HealthCalculator() {
  // BMI States
  const [bmiAge, setBmiAge] = useState("");
  const [bmiGender, setBmiGender] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiMessage, setBmiMessage] = useState("");

  // Body Fat States
  const [bfAge, setBfAge] = useState("");
  const [bfGender, setBfGender] = useState("male");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [bodyFat, setBodyFat] = useState(null);

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);
      setBmiMessage(getBmiMessage(bmiValue));
    }
  };

  const getBmiMessage = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi < 24.9) return "Normal weight";
    if (bmi >= 25 && bmi < 29.9) return "Overweight";
    return "Obese";
  };

  const calculateBodyFat = () => {
    if (!bfAge || !weight || !height || !neck || !waist) return;
    let bodyFatPercentage;
    if (bfGender === "male") {
      bodyFatPercentage = (
        495 /
          (1.0324 -
            0.19077 * Math.log10(waist - neck) +
            0.15456 * Math.log10(height)) -
        450
      ).toFixed(2);
    } else {
      bodyFatPercentage = (
        495 /
          (1.29579 -
            0.35004 * Math.log10(waist + neck) +
            0.221 * Math.log10(height)) -
        450
      ).toFixed(2);
    }
    setBodyFat(bodyFatPercentage);
  };

  const containerStyle = {
    minHeight: "100vh",
    // background: "linear-gradient(135deg, #1e1e1e, #111)",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "30px",
    padding: "40px"
  };

  const cardStyle = {
    backgroundColor: "#1e1e1e",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
    width: "100%",
    maxWidth: "450px",
    color: "#fff",
    fontFamily: "Arial, sans-serif"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #444",
    backgroundColor: "#2a2a2a",
    color: "#fff",
    fontSize: "1rem"
  };

  const labelStyle = {
    display: "block",
    fontWeight: "600",
    marginBottom: "6px",
    color: "#ccc"
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    border: "none",
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "1rem",
    cursor: "pointer"
  };

  return (
    <div style={{marginTop:"220px"}}>
    <div style={{display:"flex",flexDirection:"column"}}>
    <div style={{display:"flex",justifyContent:"center",fontSize:"65px",fontWeight:"500",color:"orange"}}>Calculators</div>
    <div style={containerStyle}>
    
      <div style={cardStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>BMI Calculator</h2>
        <label style={labelStyle}>Age</label>
        <input type="number" value={bmiAge} onChange={(e) => setBmiAge(e.target.value)} placeholder="Age" style={inputStyle} />

        <label style={labelStyle}>Gender</label>
        <div style={{ marginBottom: "12px" }}>
          <label><input type="radio" name="bmi-gender" value="male" checked={bmiGender === "male"} onChange={() => setBmiGender("male")} /> Male</label>
          <label style={{ marginLeft: "20px" }}><input type="radio" name="bmi-gender" value="female" checked={bmiGender === "female"} onChange={() => setBmiGender("female")} /> Female</label>
        </div>

        <label style={labelStyle}>Height (cm)</label>
        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Height in cm" style={inputStyle} />

        <label style={labelStyle}>Weight (kg)</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight in kg" style={inputStyle} />

        <button onClick={calculateBMI} style={{ ...buttonStyle, background: "#F9D423" }}>Calculate BMI</button>
        <button onClick={() => { setBmiAge(""); setBmiGender("male"); setHeight(""); setWeight(""); setBmi(null); setBmiMessage(""); }} style={{ ...buttonStyle, background: "#444" }}>Clear</button>

        {bmi && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <p>Your BMI: <strong>{bmi}</strong></p>
            <p style={{ color: bmiMessage === "Underweight" ? "#FFD700" : bmiMessage === "Normal weight" ? "#4CAF50" : bmiMessage === "Overweight" ? "#FFA500" : "#FF4500" }}>{bmiMessage}</p>
          </div>
        )}
      </div>

      {/* Body Fat Calculator */}
      <div style={cardStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Body Fat Calculator</h2>
        <label style={labelStyle}>Age</label>
        <input type="number" value={bfAge} onChange={(e) => setBfAge(e.target.value)} placeholder="Age" style={inputStyle} />

        <label style={labelStyle}>Gender</label>
        <div style={{ marginBottom: "12px" }}>
          <label><input type="radio" name="bf-gender" value="male" checked={bfGender === "male"} onChange={() => setBfGender("male")} /> Male</label>
          <label style={{ marginLeft: "20px" }}><input type="radio" name="bf-gender" value="female" checked={bfGender === "female"} onChange={() => setBfGender("female")} /> Female</label>
        </div>

        <label style={labelStyle}>Neck (cm)</label>
        <input type="number" value={neck} onChange={(e) => setNeck(e.target.value)} placeholder="Neck circumference" style={inputStyle} />

        <label style={labelStyle}>Waist (cm)</label>
        <input type="number" value={waist} onChange={(e) => setWaist(e.target.value)} placeholder="Waist circumference" style={inputStyle} />

        <button onClick={calculateBodyFat} style={{ ...buttonStyle, background: "#F9D423" }}>Calculate Body Fat</button>
        <button onClick={() => { setBfAge(""); setBfGender("male"); setHeight(""); setWeight(""); setNeck(""); setWaist(""); setBodyFat(null); }} style={{ ...buttonStyle, background: "#444" }}>Clear</button>

        {bodyFat && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <p>Your Body Fat: <strong>{bodyFat}%</strong></p>
          </div>
        )}
      </div>
    </div>
    </div>
    </div>
  );
}

export default HealthCalculator;
