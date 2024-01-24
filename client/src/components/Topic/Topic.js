import React from 'react';
import { Link } from 'react-router-dom';

const Topic = ({ topics }) => {
  return (
    <div>
      {topics.map((topic) => 
        <div key={topic.id}>
          <Link to={`/topics/${topic.id}`}>
            <h1>{topic.title}</h1>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Topic;
