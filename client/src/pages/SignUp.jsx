import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const [passwordError, setPasswordError] = useState(false); // State variable to track password error
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to validate the password
  const validatePassword = (password) => {
    const lengthValid = password.length >= 8 && password.length <= 15;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return lengthValid && hasUpperCase && hasDigit && hasSpecialCharacter;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the password
    const passwordValid = validatePassword(formData.password);
    if (!passwordValid) {
      setPasswordError(true);
      return;
    }

    try {
      dispatch(signInStart());
      const res = await fetch('http://localhost:5500/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/sign-in');
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif", backgroundColor: "#fafafa", margin: 0, padding: 0 }}>
      <div style={{ backgroundColor: "#fafafa", maxWidth: "450px", margin: "50px auto", padding: "30px", borderRadius: "8px", boxShadow: "0 0 12px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "15px", fontSize: "24px", color: "#333" }}>Sign Up</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type='text'
            placeholder='Username'
            id='username'
            style={{ width: "calc(100% - 20px)", padding: "12px", margin: "10px 0 20px", border: "2px solid #ccc", borderRadius: "6px", boxSizing: "border-box", fontSize: "16px" }}
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='First Name'
            id='First Name'
            style={{ width: "calc(100% - 20px)", padding: "12px", margin: "10px 0 20px", border: "2px solid #ccc", borderRadius: "6px", boxSizing: "border-box", fontSize: "16px" }}
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='Last Name'
            id='Last Name'
            style={{ width: "calc(100% - 20px)", padding: "12px", margin: "10px 0 20px", border: "2px solid #ccc", borderRadius: "6px", boxSizing: "border-box", fontSize: "16px" }}
            onChange={handleChange}
          />
          <input
            type='email'
            placeholder='Email'
            id='email'
            style={{ width: "calc(100% - 20px)", padding: "12px", margin: "10px 0 20px", border: "2px solid #ccc", borderRadius: "6px", boxSizing: "border-box", fontSize: "16px" }}
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Password'
            id='password'
            style={{ width: "calc(100% - 20px)", padding: "12px", margin: "10px 0 20px", border: "2px solid #ccc", borderRadius: "6px", boxSizing: "border-box", fontSize: "16px" }}
            onChange={handleChange}
          />
          {/* Display password error message if password is invalid */}
          {passwordError && <p style={{ color: "#d9534f", marginTop: "10px", textAlign: "center" }}>Password must be between 8 and 15 characters and include at least one uppercase letter, one digit, and one special character.</p>}

          <button
            disabled={loading}
            style={{ backgroundColor: "#4caf50", color: "white", cursor: "pointer", transition: "background-color 0.3s", width: "100%", padding: "12px", border: "none", borderRadius: "6px", fontSize: "16px" }}
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
          <OAuth />
        </form>
        <p style={{ color: "#d9534f", marginTop: "20px", textAlign: "center" }}>{error && 'Something went wrong!'}</p>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <span style={{ backgroundColor: "#337ab7", border: "2px solid #2e6da4", borderRadius: "5px", padding: "10px 20px", display: "inline-block", color: "white", textAlign: "center", fontSize: "16px", width: "200px", transition: "background-color 0.3s" }}>
            <Link to='/sign-in' style={{ textDecoration: "none", color: "white" }}>Already Signed in?</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
