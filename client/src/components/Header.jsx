import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  
  // Custom styles
  const headerStyle = {
    backgroundColor: '#ADD8E6', // Light blue background
    color: '#008000', // Green font color
    padding: '0.5rem 0', // Reduced padding
    borderBottom: '2px solid #87CEEB', // Slightly darker border
    fontFamily: 'Cursive, sans-serif', // Custom cursive font
  };

  const containerStyle = {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#008000', // Green font color
    fontSize: '1.2rem',
    fontWeight: 'bold',
    fontFamily: 'Cursive, sans-serif', // Custom cursive font
  };

  const listItemStyle = {
    display: 'inline-block',
    marginLeft: '20px',
    verticalAlign: 'middle', // Aligning all list items vertically
  };

  const profileImageStyle = {
    height: '2rem',
    width: '2rem',
    borderRadius: '50%',
    objectFit: 'cover',
  };

  return (
    <div style={headerStyle}>
      <div style={containerStyle}>
        <Link to='/' style={linkStyle}>
          Auth App
        </Link>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'right' }}>
          <li style={listItemStyle}>
            <Link to='/' style={linkStyle}>Home</Link>
          </li>
          <li style={listItemStyle}>
            <Link to='/Note' style={linkStyle}>Notes</Link>
          </li>
          <li style={listItemStyle}>
            <Link to='/sign-up' style={linkStyle}>Sign Up</Link>
          </li>
          {currentUser && (
            <li style={listItemStyle}>
              <Link to='/profile' style={linkStyle}>
                <img src={currentUser.profilePicture} alt='profile' style={profileImageStyle} />
              </Link>
            </li>

          )}
        </ul>
      </div>
    </div>
  );
}
