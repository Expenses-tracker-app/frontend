import React, { useContext } from 'react';
import { styled } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DateContext from '../layout/DateContext';

// Styles
const CustomCalendar = styled(Calendar)(({ theme }) => ({
  width: '300px',
  height: '240px',
  backgroundColor: theme.palette.grey[600],
  borderRadius: '30px',
  border: 'none',
  margin: '5px',
  padding: '20px',
  fontSize: '14px',
  [theme.breakpoints.down('md')]: {
    width: '230px',
    height: '240px'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '15px',
    fontSize: '12px',
    width: '90%',
    maxWidth: '235px',
    height: '200px',
    marginRight: '2.5px'
  },
  '& .react-calendar__navigation__arrow': {
    display: 'none'
  },
  '& .react-calendar__navigation__prev-button': {
    display: 'none'
  },
  '& .react-calendar__navigation__label': {
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: '18px',
    fontWeight: '500',
    textAlign: 'left',
    background: 'none !important'
  },
  '& .react-calendar__navigation__label:hover, & .react-calendar__navigation__label:active': {
    background: 'none'
  },
  '& .react-calendar__navigation': {
    height: 'fit-content'
  },
  '& .react-calendar__tile': {
    color: 'white',
    height: 'fit-content',
    padding: '5px',
    '&:enabled:hover, &:enabled:focus': {
      background: theme.palette.grey[400],
      borderRadius: '5px'
    }
  },
  '& .react-calendar__tile--now': {
    background: theme.palette.primary.blue,
    borderRadius: '5px',
    fontWeight: '700'
  },
  '& abbr[title]': {
    textDecoration: 'none'
  },
  '& .react-calendar__tile--hasActive, & .react-calendar__tile--active': {
    background: theme.palette.grey[400],
    borderRadius: '5px'
  }
}));

export const MCalendar = () => {
  const { selectedDate, setSelectedDate } = useContext(DateContext);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="app">
      <div className="calendar-container">
        <CustomCalendar
          onChange={handleDateChange}
          value={selectedDate}
          locale="en"
          startDate={new Date(2021, 1, 1)}
          defaultView="month"
          minDetail="year"
          formatShortWeekday={(locale, date) =>
            date.toLocaleDateString(locale, { weekday: 'narrow' })
          }
          formatMonth={(locale, date) => date.toLocaleDateString(locale, { month: 'long' })}
          formatMonthYear={(locale, date) => date.toLocaleDateString(locale, { month: 'long' })}
          showNeighboringMonth={false}
        />
      </div>
    </div>
  );
};
