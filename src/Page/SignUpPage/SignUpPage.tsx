import Header from '@components/Header/Header';
import styles from './SignUpPage.module.css';
import Button from '@components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Popup from '@components/PopUp/PopUp';
import Loading from '@components/Loading/Loading';

function SignUpPage() {
  const [inforst, setInforst] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    // phoneNumber: '',
  });

  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!inforst.fullName || !inforst.password || !inforst.email || !inforst.confirmPassword) {
      const errorElement = document.getElementById('error');
      if (errorElement) {
        errorElement.innerText = 'Vui lòng điền đầy đủ thông tin!';
      }
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inforst.email)) {
      const errorElement = document.getElementById('error');
      if (errorElement) {
        errorElement.innerText = 'Email không hợp lệ!';
      }
      return;
    }

    if (inforst.password !== inforst.confirmPassword) {
      const errorElement = document.getElementById('error');
      if (errorElement) {
        errorElement.innerText = 'Mật khẩu không khớp!';
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

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: inforst.email,
          password: inforst.password,
          confirmPassword: inforst.confirmPassword,
          fullName: inforst.fullName,
        }),
      });

      if (response.ok) {
        setMessage('Đăng ký thành công!\nKiểm tra email của bạn để xác thực tài khoản');
        setShowPopup(true);
        setTimeout(() => {
          navigate('/login');
        }, 5000);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Đăng ký thất bại!');
      setShowPopup(true);
    } finally {
      setLoading(false); // Tắt loading khi xong
    }
  };

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
        <h3>Sign Up</h3>
        <div id='error' style={{ color: 'red', fontSize: '1em', marginBottom: '5px' }}></div>
        <div className={styles.input}>
          <input
            type='text'
            value={inforst.fullName}
            onChange={(e) => setInforst({ ...inforst, fullName: e.target.value })}
            placeholder='full name'
            name='username'
            required
          />
          <input
            type='email'
            value={inforst.email}
            onChange={(e) => setInforst({ ...inforst, email: e.target.value })}
            placeholder='email'
            name='email'
            required
          />
          <input
            type='password'
            value={inforst.password}
            onChange={(e) => setInforst({ ...inforst, password: e.target.value })}
            placeholder='password'
            name='password'
            required
          />
          <input
            type='password'
            value={inforst.confirmPassword}
            onChange={(e) => setInforst({ ...inforst, confirmPassword: e.target.value })}
            placeholder='confirm password'
            name='confirmPassword'
            required
          />
          {/* <input
            type='text'
            value={inforst.phoneNumber}
            onChange={(e) => setInforst({ ...inforst, phoneNumber: e.target.value })}
            placeholder='phone number'
            name='phoneNumber'
            required
          /> */}
        </div>
        <div className={styles.button}>
          <Button text='Sign up' handler={handleSignup} />
        </div>
        <h5>
          Have not got an account yet?<Link to='/login'>Login now !</Link>
        </h5>
        <h5>Sign up with</h5>
        <div className={styles.link}>
          <button>
            <img src='../../../assets/images/facebook.png' alt='facebook' />
            Facebook
          </button>
          <button>
            <img src='../../../assets/images/google.png' alt='google' />
            Google
          </button>
        </div>
      </div>
      {showPopup && <Popup message={message} onClose={() => setShowPopup(false)} />}
      {loading && <Loading />}
    </>
  );
}

export default SignUpPage;
