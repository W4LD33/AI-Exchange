import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Topic from '../../components/Topic/Topic';
import jwt_decode from 'jwt-decode';
import './home.css';

const Home = ({ topics, setTopics }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const topicsPerPage = 10;
  const indexOfLastTopic = currentPage * topicsPerPage;
  const indexOfFirstTopic = indexOfLastTopic - topicsPerPage;
  const currentTopics = topics.slice(indexOfFirstTopic, indexOfLastTopic);
  const navigate = useNavigate();

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  // State variables to hold the new topic data
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicBody, setNewTopicBody] = useState('');

  const handleNewTopicTitleChange = (event) => {
    setNewTopicTitle(event.target.value);
  }

  const handleNewTopicBodyChange = (event) => {
    setNewTopicBody(event.target.value);
  }

  const handleNewTopicSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
  
      const response = await fetch('http://localhost:8000/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newTopicTitle,
          body: newTopicBody,
          user_id: userId
        }),
      });
      const data = await response.json();
      console.log(data)
      if (data.success) {
        // Update the topics state with the new topic
        setTopics([...topics, data.topic]);
        // Redirect the user to the newly created topic
        navigate(`/topics/${data.topic.id}`);
      } else {
        console.log(data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(topics.length / topicsPerPage); i++) {
    pageNumbers.push(i);
  }
  
  return (
    <div className="topic-page-container">
      <form onSubmit={handleNewTopicSubmit}>
        <label htmlFor="new-topic-title">Title</label>
        <input id="new-topic-title" type="text" value={newTopicTitle} onChange={handleNewTopicTitleChange} required />
        <label htmlFor="new-topic-body">Body</label>
        <textarea id="new-topic-body" value={newTopicBody} onChange={handleNewTopicBodyChange} required />
        <button type="submit">Create New Topic</button>
      </form>
      <Topic topics={currentTopics} />
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number}>
            <button onClick={() => handlePageClick(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
