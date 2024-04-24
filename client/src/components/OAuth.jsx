import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch('http://localhost:5500/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('could not login with google', error);
    }
  };

  return (
    <button
      type='button'
      onClick={handleGoogleClick}
      style={{
        backgroundColor: '#d9534f', // Equivalent to bg-red-700
        color: 'white', // Equivalent to text-white
        borderRadius: '8px', // Rounded corners
        padding: '12px', // Padding for the button
        textTransform: 'uppercase', // Equivalent to uppercase
        transition: 'opacity 0.3s', // Transition for hover effect
        cursor: 'pointer', // Hand cursor on hover
        fontSize: '16px', // Font size
      }}
      onMouseOver={(e) => (e.currentTarget.style.opacity = '0.95')}
      onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
    >
      Continue with Google
    </button>
  );
}
