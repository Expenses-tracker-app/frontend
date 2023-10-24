import React, { useState } from 'react';
import { styled } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Styles
const CustomCalendar = styled(Calendar)(({ theme }) => ({
  width: '300px',
  backgroundColor: theme.palette.grey[600],
  borderRadius: '30px',
  border: 'none',
  margin: 'auto',
  padding: '20px',
  fontSize: '14px',
  '& .react-calendar__navigation__arrow': {
    display: 'none'
  },
  '& .react-calendar__navigation__prev-button': {
    display: 'none'
  },
  '& .react-calendar__navigation__label': {
    color: 'white',
    fontFamily: 'Montserrat',
    pointerEvents: 'none',
    fontSize: '18px',
    fontWeight: '500',
    textAlign: 'left'
  },
  '& .react-calendar__navigation': {
    height: 'fit-content'
  },
  '& .react-calendar__tile': {
    color: 'white',
    height: 'fit-content',
    padding: '5px',
    '&:enabled:hover': {
      background: 'none',
      pointerEvents: 'none'
    },
    '&:enabled:focus': {
      background: 'none',
      pointerEvents: 'none'
    }
  },
  '& .react-calendar__month-view__days__day--neighboringMonth': {
    color: theme.palette.grey[600],
    pointerEvents: 'none'
  },
  '& .react-calendar__tile--now': {
    background: theme.palette.grey[500],
    borderRadius: '50%',
    fontWeight: '700'
  },
  '& abbr[title]': {
    textDecoration: 'none'
  }
}));

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
