import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExerciseList = () => {
  const [exerciseData, setExerciseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('http://localhost:9009/api/exercise');
        setExerciseData(response.data.data);
      } catch (err) {
        setError('Failed to fetch exercises');
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Exercise Recommendations</h2>
      {loading ? (
        <p style={styles.loading}>Loading...</p>
      ) : error ? (
        <p style={styles.error}>{error}</p>
      ) : exerciseData.length === 0 ? (
        <p style={styles.noData}>No exercise data found.</p>
      ) : (
        exerciseData.map((entry, index) => (
          <div key={index} style={styles.card}>
            <h3 style={styles.bodyProblem}>{entry.bodyProblem}</h3>
            {entry.exercises.map((ex, idx) => (
              <div key={idx} style={styles.exerciseBox}>
                <h4 style={styles.exerciseName}>{ex.name}</h4>
                <p style={styles.desc}>{ex.description}</p>

                {/* GIF rendering */}
                {ex.gif && (
                  <img
                    src={ex.gif}
                    alt={ex.name}
                    style={styles.gif}
                  />
                )}

                <div style={styles.details}>
                  <span><strong>Type:</strong> {ex.type}</span>
                  <span><strong>Intensity:</strong> {ex.intensity}</span>
                  <span><strong>Duration:</strong> {ex.duration} mins</span>
                  <span><strong>Sets:</strong> {ex.sets}</span>
                  <span><strong>Reps:</strong> {ex.repetitions}</span>
                  <span><strong>Calories:</strong> {ex.caloriesBurned}</span>
                  <span><strong>Equipment:</strong> {ex.equipment || 'None'}</span>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '30px auto',
    padding: '20px',
    fontFamily: 'Segoe UI, sans-serif',
    background: '#f5f6fa'
  },
  header: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '30px',
    fontSize: '32px',
    fontWeight: '600'
  },
  card: {
    background: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    padding: '25px',
    marginBottom: '30px',
    borderLeft: '6px solid #2980b9'
  },
  bodyProblem: {
    fontSize: '24px',
    color: '#2980b9',
    marginBottom: '20px',
    fontWeight: '600'
  },
  exerciseBox: {
    background: '#f8f9fa',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px'
  },
  exerciseName: {
    fontSize: '18px',
    marginBottom: '8px',
    color: '#2c3e50'
  },
  desc: {
    fontSize: '14px',
    marginBottom: '10px',
    color: '#7f8c8d'
  },
  gif: {
    width: '100%',
    maxWidth: '300px',
    height: 'auto',
    borderRadius: '8px',
    margin: '10px 0',
    display: 'block'
  },
  details: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    fontSize: '13px',
    color: '#2d3436',
    marginTop: '5px'
  },
  loading: {
    textAlign: 'center',
    color: '#636e72',
    fontSize: '16px'
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: '16px'
  },
  noData: {
    textAlign: 'center',
    color: '#b2bec3',
    fontSize: '16px'
  }
};

export default ExerciseList;
