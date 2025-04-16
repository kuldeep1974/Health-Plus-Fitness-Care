import React, { useState } from "react";

function BmiTest() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState("");

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);
      setMessage(getBmiMessage(bmiValue));
    }
  };

  const getBmiMessage = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi < 24.9) return "Normal weight";
    if (bmi >= 25 && bmi < 29.9) return "Overweight";
    return "Obese";
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #222222, #1c1c1c)",
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "#1e1e1e",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
        width: "100%",
        maxWidth: "450px",
        minHeight: "550px",
        display: "flex",
        flexDirection: "column"
      }}>
        <div style={{ marginBottom: "20px" }}>
          <button style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#fff",
            backgroundColor: "#444",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "default",
            textTransform: "uppercase"
          }}>
            BMI Test
          </button>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{
            display: "block",
            fontSize: "18px",
            color: "#fff",
            fontWeight: "500",
            marginBottom: "8px"
          }}>
            Age
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="2"
            max="120"
            style={{
              width: "100%",
              padding: "14px 18px",
              borderRadius: "12px",
              border: "1px solid #444",
              backgroundColor: "#333",
              color: "#fff",
              fontSize: "1rem",
              outline: "none"
            }}
            placeholder="Enter your age"
          />
          <span style={{
            fontSize: "12px",
            color: "#888",
            display: "block",
            marginTop: "4px"
          }}>
            ages: 2 - 120
          </span>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{
            display: "inline-block",
            marginRight: "15px",
            color: "#fff",
            fontSize: "16px"
          }}>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={() => setGender("male")}
              style={{ marginRight: "5px" }}
            />
            Male
          </label>
          <label style={{
            display: "inline-block",
            marginRight: "15px",
            color: "#fff",
            fontSize: "16px"
          }}>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={() => setGender("female")}
              style={{ marginRight: "5px" }}
            />
            Female
          </label>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{
            display: "block",
            fontSize: "18px",
            color: "#fff",
            fontWeight: "500",
            marginBottom: "8px"
          }}>
            Height
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 18px",
              borderRadius: "12px",
              border: "1px solid #444",
              backgroundColor: "#333",
              color: "#fff",
              fontSize: "1rem",
              outline: "none"
            }}
            placeholder="cm"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{
            display: "block",
            fontSize: "18px",
            color: "#fff",
            fontWeight: "500",
            marginBottom: "8px"
          }}>
            Weight
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 18px",
              borderRadius: "12px",
              border: "1px solid #444",
              backgroundColor: "#333",
              color: "#fff",
              fontSize: "1rem",
              outline: "none"
            }}
            placeholder="kg"
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={calculateBMI}
            style={{
              width: "100%",
              padding: "12px",
              background: "linear-gradient(90deg, #FF4E50 0%, #F9D423 100%)",
              color: "white",
              fontWeight: "600",
              borderRadius: "18px",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              marginBottom: "10px"
            }}
          >
            Calculate <span style={{ marginLeft: "5px" }}>▶</span>
          </button>
          <button
            onClick={() => {
              setAge("");
              setGender("male");
              setHeight("");
              setWeight("");
              setBmi(null);
              setMessage("");
            }}
            style={{
              width: "100%",
              padding: "12px",
              background: "#444",
              color: "white",
              fontWeight: "600",
              borderRadius: "18px",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem"
            }}
          >
            Clear
          </button>
        </div>

        {bmi && (
          <div style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#fff",
            fontSize: "1.2rem"
          }}>
            <p>Your BMI: <strong>{bmi}</strong></p>
            <p style={{
              fontWeight: "500",
              marginTop: "8px",
              color: message === "Underweight" ? "#FFD700" :
                    message === "Normal weight" ? "#4CAF50" :
                    message === "Overweight" ? "#FFA500" : "#FF4500"
            }}>
              {message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BmiTest;