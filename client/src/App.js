import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Auth from './components/Auth/Auth';
import './App.css';
import Home from './pages/Home/Home';
import TopicPage from './pages/TopicPage/TopicPage';

function App() {
  const [topics, setTopics] = useState([]);
  const [authToken, setAuthToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await fetch('http://localhost:8000/questions', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const json = await response.json();
      setTopics(json);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, [authToken]);

  const handleAuth = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              authToken ? (
                !isLoading ? (
                  <Home topics={topics} />
                ) : (
                  <div>Loading...</div>
                )
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
          <Route
            path="/topics/:id"
            element={
              authToken ? (
                !isLoading ? (
                  <TopicPage topics={topics} />
                ) : (
                  <div>Loading...</div>
                )
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
          <Route path="/auth" element={<Auth handleAuth={handleAuth} />} />
        </Routes>
        {authToken && <button onClick={handleLogout}>Log out</button>}
      </BrowserRouter>
    </div>
  );
}

export default App;
