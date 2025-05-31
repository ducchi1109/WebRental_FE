import Header from '@components/Header/Header';
import styles from './ProfilePage.module.css';
import Button from '@components/Button/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Popup from '@components/PopUp/PopUp';
import Loading from '@components/Loading/Loading';
import BackButton from '@components/BackButton/BackButton';
import { useHeader } from '../../Context/HeaderContext';

function ProfilePage(props: any) {
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useHeader();

  const navigate = useNavigate();

  const [inforst, setInforst] = useState({
    password: '',
    phoneNumber: '',
    fullname: login.name,
    email: login.email,
    profilePicture: '',
  });



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/users/email/' + login.email, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setInforst({
          password: data.password || '',
          phoneNumber: data.phoneNumber || '',
          fullname: data.fullName || '',
          email: data.email || '',
          profilePicture: data.profilePicture || '',
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inforst.email)) {
      const errorElement = document.getElementById('error');
      if (errorElement) {
        errorElement.innerText = 'Email không hợp lệ!';
      }
      return;
    }

    const responseUser = await fetch(`http://localhost:3000/users/email/${inforst.email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (responseUser.ok) {
      const errorElement = document.getElementById('error');
      if (errorElement) {
        errorElement.innerText = 'Email đã đăng kí!';
      }
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/users/email/' + login.email, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: inforst.password,
          phoneNumber: inforst.phoneNumber,
          fullName: inforst.fullname,
          email: inforst.email,
          profilePicture: inforst.profilePicture,
        }),
      });
      setMessage('Update information successful!');
      setShowPopup(true);
      const data = await response.json();
      console.log(data);

      // navigate('/home', { state: { isLoggin: true, google: false, user: data.fullName, email: data.email } });
    } catch (error) {
      console.error('Error:', error);
      setMessage('Update information failed!\nPlease do again.');
      setShowPopup(true);
    }
  };

  return (
    <>
      {showPopup && <Popup message={message} onClose={() => setShowPopup(false)} />}
      {loading && <Loading />}
      <Header />
      <BackButton handler={() => navigate('/home')} />
      <div className={styles.main}>
        <div className={styles.avatar}>
          <img src='/assets/images/circleUser.svg' />
        </div>
        <div className={styles.container}>
          <h3>Profile</h3>
          <div className={styles.input}>
            <input
              type='text'
              value={inforst.fullname}
              onChange={(e) => setInforst({ ...inforst, fullname: e.target.value })}
              placeholder='full name'
              name='username'
            />
            <input
              type='email'
              value={inforst.email}
              onChange={(e) => setInforst({ ...inforst, email: e.target.value })}
              placeholder='email'
              name='email'
            />
            <input
              type='password'
              value={inforst.password}
              onChange={(e) => setInforst({ ...inforst, password: e.target.value })}
              placeholder='password'
              name='password'
            />

            <input
              type='text'
              value={inforst.phoneNumber}
              onChange={(e) => setInforst({ ...inforst, phoneNumber: e.target.value })}
              placeholder='phone number'
              name='phoneNumber'
            />
          </div>
          <div className={styles.button}>
            <Button text='Update' handler={handleUpdate} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
