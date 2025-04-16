import { useEffect, useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import "../Styles/Exercise.scss";
import { useNavigate } from "react-router-dom";

function Exercise() {
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate()
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login"); 
    }
  }, [navigate])

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(
          "https://exercisedb.p.rapidapi.com/exercises?limit=1000", 
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "exercisedb.p.rapidapi.com",
              "x-rapidapi-key": "a9ee8f628amsh1f4747eeb8fe164p1649b5jsn4df8bca46763",
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch exercises");
        const data = await response.json();
        setExercises(data);
        setFilteredExercises(data); // Show all initially
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  // Extract unique body part categories
  const categories = ["all", ...new Set(exercises.map((ex) => ex.bodyPart))];

  // Filter exercises based on selected category
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredExercises(exercises);
    } else {
      setFilteredExercises(exercises.filter((ex) => ex.bodyPart === selectedCategory));
    }
  }, [selectedCategory, exercises]);

  return (
    <div className="exercise-layout">
      {/* Left Sidebar with Categories */}
      <Sidebar className="exercise-sidebar">
        <h2 className="sidebar-title">Categories</h2>
        <Menu>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : (
            categories.map((category) => (
              <MenuItem
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`exercise-item ${selectedCategory === category ? "active" : ""}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </MenuItem>
            ))
          )}
        </Menu>
      </Sidebar>

      {/* Right Side: Multiple Exercises in Grid */}
      <div className="exercise-details">
        <h1 className="exercise-name">
          {selectedCategory === "all" ? "All Exercises" : `Exercises for ${selectedCategory}`}
        </h1>

        {loading ? (
          <p className="loading-text">Loading exercises...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <div className="exercise-grid">
            {filteredExercises.map((exercise) => (
              <div key={exercise.id} className="exercise-card">
                <h2 className="exercise-title">{exercise.name}</h2>
                <img src={exercise.gifUrl} alt={exercise.name} className="exercise-gif" />
                <p className="exercise-target">
                  <strong>Target:</strong> {exercise.target}
                </p>
                <p className="exercise-equipment">
                  <strong>Equipment:</strong> {exercise.equipment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Exercise;



