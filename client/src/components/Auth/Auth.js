import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import './auth.css';

const Auth = ({ handleAuth }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['email', 'authToken']);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (cookies.authToken) {
        navigate('/', { replace: true });
      }
    }, [cookies.authToken, navigate]);
  
    const viewLogin = (status) => {
      setError('');
      setIsLogin(status);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!isLogin && password !== confirmPassword) {
        setError("Passwords don't match");
        return;
      }
  
      const endpoint = isLogin ? '/authentication/login' : '/authentication/signup';
      const body = JSON.stringify({ email, password });
  
      try {
        const response = await fetch(`http://localhost:8000${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setCookie('email', email);
          setCookie('authToken', data.token);
          handleAuth(data.token); // Call handleAuth to set the authToken state in the parent component
          navigate('/', { replace: true }); // Redirect to home page and replace current URL in history
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error(error);
        setError('An error occurred');
      }
    };
  
    const handleLogout = () => {
      removeCookie('email');
      removeCookie('authToken');
    };
  
    return (
      <div className="auth-container">
        <div className="auth-container-box">
          <div className="auth-options">
            {cookies.email && <button onClick={handleLogout}>Logout</button>}
            {!cookies.email && (
              <>
                <button onClick={() => viewLogin(false)}>Sign-up</button>
                <button onClick={() => viewLogin(true)}>Login</button>
              </>
            )}
          </div>
          {!cookies.authToken && (
            <form onSubmit={handleSubmit}>
              <h2>{isLogin ? 'Please log in' : 'Please sign up'}</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={cookies.email}
              />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={cookies.email}
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={cookies.email}
              />
            )}
            {!cookies.email && <input type="submit" className="create-button" />}
            {error && <p>{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
