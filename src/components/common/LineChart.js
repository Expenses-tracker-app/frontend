import React from 'react';
import { Grid, styled } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Wrapper = styled(Grid)(({ theme }) => ({
  color: theme.palette.primary.main,
  padding: '15px',
  width: '480px',
  height: 'auto',
  borderRadius: '30px',
  backgroundColor: theme.palette.grey[600]
}));

export const options = {
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

const expenses = [550, 370, 550, 120, 350, 330, 770, 880, 360, 287, 440, 950];
const incomes = [1500, 1500, 1500, 1500, 1500, 1800, 1800, 1800, 1800, 2200, 2200, 2200];

const labels = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

export const data = {
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
};

export function LineChart() {
  return (
    <Wrapper>
      <Line options={options} data={data} />
    </Wrapper>
  );
}
