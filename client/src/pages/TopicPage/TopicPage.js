import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import './topicpage.css'

const TopicPage = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [topic, setTopic] = useState('');
  const [users, setUsers] = useState([]);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/question_comments/question/${id}`);
        const data = await response.json();
        setComments(data);

        const userIds = data.map(comment => comment.user_id);
        const usersResponse = await fetch(`http://localhost:8000/users?ids=${userIds.join()}`);
        const usersData = await usersResponse.json();
        setUsers(usersData);

        const comments = await fetch(`http://localhost:8000/questions/${id}`);
        const commentsData = await comments.json();
        setTopic(commentsData);

        const likesResponse = await fetch(`http://localhost:8000/question_likes/question/${id}`);
        const likesData = await likesResponse.json();
        setLikes(likesData.length);
    
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const decodedToken = jwt_decode(token);
      const response = await fetch(`http://localhost:8000/question/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: decodedToken.userId,
          liked: true,
        }),
      });
      const data = await response.json();
      if (data.success) {
        const likesResponse = await fetch(`http://localhost:8000/question_likes/question/${id}`);
        const likesData = await likesResponse.json();
        setLikes(likesData.length); // recalculate the likes and update the state variable
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleDislike = async () => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwt_decode(token);
      const response = await fetch(`http://localhost:8000/question/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: decodedToken.userId,
          liked: false,
        }),
      });
      const data = await response.json();
      if (data.success) {
        const likesResponse = await fetch(`http://localhost:8000/question_likes/question/${id}`);
        const likesData = await likesResponse.json();
        setLikes(likesData.length); // recalculate the likes and update the state variable
      }
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className="topic-page-container">
      <h1 className="topic-page-title">{topic.title}</h1>
      <h2>Topic by: {users.find(user => user.id === topic.user_id)?.name}</h2>
      <h3 className="topic-page-body">{topic.body}</h3>
      <div className="like-dislike-container">
        <button onClick={handleLike}>Like</button>
        <span>{likes}</span>
        <button onClick={handleDislike}>Dislike</button>
      </div>
      <h1 className="topic-page-comments-title">Topic Comments</h1>
      {comments.length > 0 ?
        comments.map((comment) =>
          <div key={comment.id} className="comment-container topic-page-comment">
            <h2 className="topic-page-comment-username">Username: {users.find(user => user.id === comment.user_id)?.name}</h2>
            <p className="topic-page-comment-text">{comment.comment}</p>
          </div>
        ) : 
        <p>No comments found</p>
      }
    </div>
);
}

export default TopicPage;