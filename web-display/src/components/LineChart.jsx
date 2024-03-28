
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import 'chart.js/auto'; 


//npm install chart.js react-chartjs-2 

const LineChart = () => {
	const theme = useTheme();
    const colors = tokens(theme.palette.mode);
	
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
		},
		animation: {
			duration: 0,
		},
		
	};

	
	const [data, setData] = useState({
		labels: [], 
		datasets: [{
				borderColor: colors.greenAccent[400],
				borderWidth: 2,
				fill: false,
				pointRadius: 0,
				data: [], 
				tension: 0.4,
			},
		],
		});

	useEffect(() => {
		const interval = setInterval(() => {
			addDataPoint();
		}, 1); // Update data every 0.1 second = 1000 data per second

		return () => clearInterval(interval);
	}, []); 

	const addDataPoint = () => {
		const newTime = new Date().toLocaleTimeString();
		const newValue = Math.floor(Math.random() * (0-100+1)+100);

		setData((prevData) => {
			const newLabels = prevData.labels.concat(newTime);
			const newData = prevData.datasets[0].data.concat(newValue);

			// Limit the number of data points to prevent data overflow
			if (newLabels.length > 100) {
				newLabels.shift();
				newData.shift();
			}
		
			
			return {
				...prevData,
				labels: newLabels,
				datasets: [{ ...prevData.datasets[0], data: newData }],
			};
		});
  	};


	return (
			<Line 
				data={data} 
				options={options}
			/>
	);
};

export default LineChart;

