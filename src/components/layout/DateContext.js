import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <DateContext.Provider
      value={{ selectedDate, setSelectedDate, selectedCategory, setSelectedCategory }}>
      {children}
    </DateContext.Provider>
  );
};

DateProvider.propTypes = {
  children: PropTypes.node
};

export default DateContext;
