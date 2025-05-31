import { useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { useHeader } from '../../Context/HeaderContext';

function Header(prop: any) {
  const navigate = useNavigate();

  const { login, setLogin } = useHeader();

  const logout = () => {
    // if (user.google) {
    //   googleLogout();
    // }
    setLogin({ ...login, isLoggin: false, name: 'User'});
    navigate('/');
  };

  const [count, setCount] = useState(0);

  

  useEffect(()=>{
    const updateCount = () => {
      let c = 0;
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.startsWith("cartItem_")) {
          c++;
        }
      }
      setCount(c);
    };

    updateCount();
  },[login.count]);

  return (
    <header className={styles.header}>
      <div>
        <img className={styles.logo} src='/assets/images/logo.png' alt='Header' />
        {/* {prop.isLoggedIn && <h3 className={styles.name}>Xin chào, {prop.user}</h3>} */}
        {login.isLoggin && <h3 className={styles.name}>Xin chào, {login.name}</h3>}
      </div>
      <h1 className={styles.title}>Wheelie</h1>
      {!login.isLoggin ? (
        <span className={styles.login}>
          <div className={styles.iconItem} onClick={() => navigate('/checkout')}>
            <div id='quantity' className={styles.count}>
              {login.count ? login.count : 0}
            </div>
            <img
              src='/assets/images/shopping-cart.png'
            />
          </div>
          <Link className={styles.link} to='/signup'>
            Sign up
          </Link>
          <Link className={styles.link} to='/login'>
            Login
          </Link>
        </span>
      ) : (
        <span className={styles.login}>
          <div id='quantity' className={styles.count}>
            {count}
          </div>
          <div className={styles.iconItem} onClick={() => navigate('/checkout')}>
            <img
              src='/assets/images/shopping-cart.png'
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className={styles.iconItem} onClick={() => navigate('/profile')}>
            <img
              src='/assets/images/user.png'
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className={styles.iconItem} onClick={logout}>
            <img src='/assets/images/logout.png' style={{ cursor: 'pointer' }} />
          </div>
        </span>
      )}
    </header>
  );
}

export default Header;
