// DoughnutChart.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Grid, styled } from '@mui/material';
import { ArcElement } from 'chart.js';
import { Chart as ChartJS } from 'chart.js';
ChartJS.register(ArcElement);

const Wrapper = styled(Grid)(({ theme }) => ({
  color: theme.palette.primary.main,
  padding: '5px 25px 25px 25px',
  width: '300px',
  height: '260px',
  borderRadius: '30px',
  backgroundColor: theme.palette.grey[600]
}));

const doughnutData = {
  labels: ['Incomes', 'Expenses'],
  datasets: [
    {
      data: [750, 250],
      backgroundColor: ['#39d49b', '#f00a0a'],
      borderColor: ['#39d49b', '#f00a0a']
    }
  ]
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  plugins: {
    legend: {
      position: 'top',
      align: 'start',
      labels: {
        color: 'white',
        usePointStyle: true,
        pointStyle: 'circle',
        font: {
          size: 10,
          family: 'Montserrat'
        },
        padding: 20
      }
    }
  },
  scale: 70
};

export const DoughnutChart = () => {
  return (
    <Wrapper>
      <Doughnut data={doughnutData} options={doughnutOptions} unique={true} />
    </Wrapper>
  );
};
