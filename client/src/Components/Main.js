import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaUserAlt } from 'react-icons/fa';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:9009/api/user/', formData, { withCredentials: true });
      const token = res.data.success.token;
      localStorage.setItem('authToken', token);
      setMessage('Signup successful! Token saved.');
      window.location.href = "/";
      setFormData({ firstName: '', lastName: '', userName: '', email: '', password: '' });
    } catch (err) {
      setMessage('Signup failed. Please try again.');
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #2b2b2b, #1c1c1c)',
      padding: '0 16px',
    },
    formContainer: {
      backgroundColor: '#2c2c2c',
      padding: '40px',
      borderRadius: '15px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '500px',
    },
    heading: {
      fontSize: '2.25rem',
      fontWeight: '800',
      textAlign: 'center',
      marginBottom: '30px',
      color: '#fff',
    },
    inputWrapper: {
      position: 'relative',
    },
    input: {
      width: '100%',
      padding: '15px 20px',
      paddingLeft: '40px',
      marginBottom: '15px',
      borderRadius: '15px',
      border: '1px solid #444',
      fontSize: '1rem',
      outline: 'none',
      color: '#fff',
      backgroundColor: '#444',
      transition: 'all 0.3s ease',
    },
    inputFocus: {
      borderColor: '#4e7ed9',
      boxShadow: '0 0 5px rgba(76, 110, 245, 0.5)',
    },
    icon: {
      position: 'absolute',
      left: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#888',
    },
    button: {
      width: '100%',
      padding: '12px',
      background: 'linear-gradient(90deg, #4e7ed9 0%, #ff61a6 100%)',
      color: 'white',
      fontWeight: '600',
      borderRadius: '15px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
    },
    buttonHover: {
      background: 'linear-gradient(90deg, #ff61a6 0%, #4e7ed9 100%)',
    },
    message: {
      marginTop: '20px',
      fontSize: '0.875rem',
      textAlign: 'center',
      color: '#ff5733',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Create Account</h2>
        <form onSubmit={handleSubmit}>
          {[
            { name: 'firstName', placeholder: 'First Name', icon: <FaUser /> },
            { name: 'lastName', placeholder: 'Last Name', icon: <FaUser /> },
            { name: 'userName', placeholder: 'Username', icon: <FaUserAlt /> },
            { name: 'email', placeholder: 'Email', icon: <FaEnvelope />, type: 'email' },
            { name: 'password', placeholder: 'Password', icon: <FaLock />, type: 'password' },
          ].map((field, index) => (
            <div style={styles.inputWrapper} key={index}>
              <span style={styles.icon}>{field.icon}</span>
              <input
                type={field.type || 'text'}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                style={{ ...styles.input }}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.input)}
                required
              />
            </div>
          ))}

          <button
            type="submit"
            style={{ ...styles.button }}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, styles.button)}
          >
            Sign Up
          </button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}
