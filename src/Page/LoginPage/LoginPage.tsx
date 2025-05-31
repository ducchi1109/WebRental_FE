import Header from '@components/Header/Header';
import styles from './LoginPage.module.css';
import Button from '@components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Popup from '@components/PopUp/PopUp';
import { useHeader } from '../../Context/HeaderContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const {login, setLogin } = useHeader();

  const HandleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const response1 = await fetch('http://localhost:3000/users/email/' + email, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response1.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response1.json();
      setLogin({ ...login, isLoggin: true, name: data.fullName });
      // { isLoggin: true, google: false, user: data.fullName, email: data.email }

      navigate('/home');

    } catch (error) {
      console.error('Error:', error);
      setMessage('Email chưa xác thực!\nTruy cập email để xác thực tài khoản.');
      setShowPopup(true);
    }
  };

  const GoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });

        console.log(res.data);

        setLogin({isLoggin:true, name: res.data.name, count:0, email:email});

        navigate('/home');

      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    onError: () => console.log('Login failed!'),
  });

  return (
    <>
      <Header isLoggedIn={false} name='' />
      <div>
        <button className={styles.buttonBack} onClick={() => navigate('/')}>
          <img src='/assets/images/arrowleft.png' style={{ width: '10px', paddingRight: '5px' }} />
          Back
        </button>
      </div>
      <div className={styles.container}>
        <h3>Login</h3>
        <div className={styles.input}>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='username'
            name='username'
          />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
            name='password'
          />
        </div>
        <h6>Forgot password ?</h6>
        <div className={styles.button}>
          <Button text='Login' handler={HandleLogin} />
        </div>
        <h5>
          Have not got an account yet?<Link to='/signup'>Sign up now !</Link>
        </h5>
        <h5>Login with</h5>
        <div className={styles.link}>
          <button>
            <img src='../../../assets/images/facebook.png' alt='facebook' />
            Facebook
          </button>
          <button onClick={() => GoogleLogin()}>
            <img src='../../../assets/images/google.png' alt='google' />
            Google
          </button>
        </div>
      </div>
      {showPopup && <Popup message={message} onClose={() => setShowPopup(false)} />}
    </>
  );
}

export default LoginPage;
