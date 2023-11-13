import React, { useContext, useState, useEffect } from 'react';
import { Grid, styled } from '@mui/material';
import { Line } from 'react-chartjs-2';
import DateProvider from '../layout/DataContext';

const Wrapper = styled(Grid)(({ theme }) => ({
  color: theme.palette.primary.main,
  padding: '15px',
  width: '480px',
  height: '240px',
  borderRadius: '30px',
  margin: '5px',
  backgroundColor: theme.palette.grey[600],
  [theme.breakpoints.down('md')]: {
    margin: '5px auto 5px auto'
  }
}));

export const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: 'white',
        usePointStyle: true,
        pointStyle: 'circle',
        font: {
          size: 10,
          family: 'Montserrat'
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        color: 'transparent'
      },
      ticks: {
        color: 'white',
        font: {
          size: 9,
          family: 'Montserrat'
        }
      }
    },
    y: {
      grid: {
        color: 'transparent'
      },
      beginAtZero: true,
      ticks: {
        color: 'white',
        font: {
          size: 9,
          family: 'Montserrat'
        }
      }
    }
  }
};

const generateRandomData = (numDays) => {
  return Array.from({ length: numDays }, () => Math.floor(Math.random() * 2400));
};

export function LineChart() {
  const { selectedDate } = useContext(DateProvider);

  const [lineData, setLineData] = useState({ labels: [], datasets: [] });
  const [length, setLength] = useState(12);
  const [labels, setLabels] = useState([
    'J',
    'F',
    'M',
    'A',
    'M',
    'J',
    'J',
    'A',
    'S',
    'O',
    'N',
    'D'
  ]);

  useEffect(() => {
    const expenses = generateRandomData(length);
    const incomes = generateRandomData(length);

    setLineData({
      labels,
      datasets: [
        {
          label: 'Incomes',
          data: incomes,
          borderColor: '#39d49b',
          backgroundColor: '#39d49b'
        },
        {
          label: 'Expenses',
          data: expenses,
          borderColor: '#f00a0a',
          backgroundColor: '#f00a0a'
        }
      ]
    });
  }, [length, labels]);

  useEffect(() => {
    if (selectedDate.toDateString() !== new Date().toDateString()) {
      setLength(7);
      setLabels(['M', 'T', 'W', 'T', 'F', 'S', 'S']);
      console.log(selectedDate);
    }
  }, [selectedDate]);

  return (
    <Wrapper>
      <Line options={lineOptions} data={lineData} unique={true} />
    </Wrapper>
  );
}
