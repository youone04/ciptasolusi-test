
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { message } from 'antd';

// Register the necessary components with Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const apiUrl = import.meta.env.VITE_API_URL;

const TopIdFilmsChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetchTopIdFilms();
  }, []);

  const fetchTopIdFilms = async () => {
    try {
      const response = await fetch(`${apiUrl}/topIdFilms`);
      const data = await response.json();
      const labels =   Object.keys(data).length !== 0 && data?.map(item => item.namaFilm);
      const counts =   Object.keys(data).length !== 0 && data?.map(item => item.count);
      const backgroundColors = counts.map(() => getRandomColor());
      const borderColors = backgroundColors.map(color => color);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Top 5 Films',
            data: counts,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1
          }
        ]
      });
    } catch (error) {
        message.error("gagal mengambil data");
    }
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div>
      <h2>Top 5 Films</h2>
      {
        Object.keys(chartData).length !== 0 &&  <Bar data={chartData} />
      }
     
    </div>
  );
};

export default TopIdFilmsChart;
