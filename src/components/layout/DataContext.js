import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </DateContext.Provider>
  );
};

DateProvider.propTypes = {
  children: PropTypes.node
};

export default DateContext;
