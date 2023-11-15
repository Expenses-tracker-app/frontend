//This is an example for the api calls we won't need it later on

import React, { useState, useEffect } from 'react';
import { getAllTag } from '../../services/apiService'; 

export const TagsPage = () => {
  const [tags, setTags] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllTag();
        setTags(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Tags</h2>
      <ul>
        {tags.map(tag => (
          <li key={tag.tag_id}>tag_id: {tag.tag_id} - tag_name: {tag.tag_name}</li>
        ))}
      </ul>
    </div>
  );
};