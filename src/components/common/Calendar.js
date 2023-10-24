import React, { useState } from 'react';
import { styled } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import '../../styles/calendarStyles.css';

// Styles

const CustomCalendar = styled(Calendar)({
  width: '300px',
  backgroundColor: '#222222',
  color: 'white',
  borderRadius: '30px',
  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
  border: 'none',
  margin: 'auto',
  padding: '20px',
  fontFamily: 'Montserrat',
  fontSize: '14px'
});

export const MCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="app">
      <div className="calendar-container">
        <CustomCalendar
          onChange={setDate}
          value={date}
          locale="en"
          formatShortWeekday={(locale, date) =>
            date.toLocaleDateString(locale, { weekday: 'narrow' })
          }
          formatMonth={(locale, date) => date.toLocaleDateString(locale, { month: 'long' })} // Display only the month name in the navigation label
          formatMonthYear={(locale, date) => date.toLocaleDateString(locale, { month: 'long' })} // Display only the month name
        />
      </div>
    </div>
  );
};
