import React, { useState } from "react";

function BodyFat() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [bodyFat, setBodyFat] = useState(null);

  const calculateBodyFat = () => {
    if (!age || !weight || !height || !neck || !waist) return;

    let bodyFatPercentage;
    if (gender === "male") {
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
            0.22100 * Math.log10(height)) -
        450
      ).toFixed(2);
    }

    setBodyFat(bodyFatPercentage);
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
            Body Fat Calculator
          </button>
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
              backgroundColor: "##333",
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
            Neck
          </label>
          <input
            type="number"
            value={neck}
            onChange={(e) => setNeck(e.target.value)}
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
            Waist
          </label>
          <input
            type="number"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
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

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={calculateBodyFat}
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
            Calculate
          </button>
          <button
            onClick={() => {
              setAge("");
              setGender("male");
              setHeight("");
              setWeight("");
              setNeck("");
              setWaist("");
              setBodyFat(null);
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

        {bodyFat && (
          <div style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#fff",
            fontSize: "1.2rem"
          }}>
            <p>Your Body Fat: <strong>{bodyFat}%</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BodyFat;