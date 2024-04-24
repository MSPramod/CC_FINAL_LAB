import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto', backgroundColor: '#fafafa', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>Profile</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <input
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt='profile'
          style={{ height: '6rem', width: '6rem', borderRadius: '50%', cursor: 'pointer', objectFit: 'cover', marginTop: '1rem' }}
          onClick={() => fileRef.current.click()}
        />
        <p style={{ fontSize: '0.875rem', textAlign: 'center' }}>
          {imageError ? (
            <span style={{ color: '#d9534f' }}>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span style={{ color: '#6c757d' }}>{`Uploading: ${imagePercent}%`}</span>
          ) : imagePercent === 100 ? (
            <span style={{ color: '#28a745' }}>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type='text'
          id='username'
          placeholder='Username'
          style={{ backgroundColor: '#f8f9fa', borderRadius: '0.5rem', padding: '1rem', fontSize: '1rem' }}
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type='email'
          id='email'
          placeholder='Email'
          style={{ backgroundColor: '#f8f9fa', borderRadius: '0.5rem', padding: '1rem', fontSize: '1rem' }}
          onChange={handleChange}
        />
        <button
          disabled={loading}
          style={{ backgroundColor: '#6c757d', color: '#fff', padding: '1rem', borderRadius: '0.5rem', textTransform: 'uppercase', cursor: 'pointer', fontSize: '1rem', transition: 'opacity 0.3s' }}
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
        <OAuth />
      </form>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <span onClick={handleDeleteAccount} style={{ color: '#dc3545', cursor: 'pointer' }}>
          Delete Account
        </span>
        <span onClick={handleSignOut} style={{ color: '#dc3545', cursor: 'pointer' }}>
          Sign out
        </span>
      </div>
      <p style={{ color: '#dc3545', marginTop: '1rem' }}>
        {error && 'Something went wrong!'}
      </p>
      <p style={{ color: '#28a745', marginTop: '1rem' }}>
        {updateSuccess && 'User is updated successfully!'}
      </p>
    </div>
  );
}
