import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('http://localhost:5500/auth/signin', {
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
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif", backgroundColor: "#fafafa", margin: 0, padding: 0 }}>
      <div style={{ backgroundColor: "#fafafa", maxWidth: "450px", margin: "50px auto", padding: "30px", borderRadius: "8px", boxShadow: "0 0 12px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "15px", fontSize: "24px", color: "#333" }}>Sign In</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
          <button
            disabled={loading}
            style={{ backgroundColor: "#4caf50", color: "white", cursor: "pointer", transition: "background-color 0.3s", width: "100%", padding: "12px", border: "none", borderRadius: "6px", fontSize: "16px" }}
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>
          <OAuth />
        </form>
        <p style={{ color: "#d9534f", marginTop: "20px", textAlign: "center" }}>{error && 'Something went wrong!'}</p>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <span style={{ backgroundColor: "#337ab7", border: "2px solid #2e6da4", borderRadius: "5px", padding: "10px 20px", display: "inline-block", color: "white", textAlign: "center", fontSize: "16px", width: "200px", transition: "background-color 0.3s" }}>
            <Link to='/sign-up' style={{ textDecoration: "none", color: "white" }}>No Account Yet?</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
