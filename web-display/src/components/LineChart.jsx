
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

import io from 'socket.io-client'
import 'chart.js/auto'; 

//npm install chart.js react-chartjs-2 

const SOCKET_SERVER_URL = 'http://localhost:4000';
const socket = io(SOCKET_SERVER_URL);

socket.on('connect', () => {
    console.log('Connected to WebSocket server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
});


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
		scales: {
			y: {
				min: 0,
				max: 5000,
				ticks: {
					stepSize: 1000
				}
			}
		}
		
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
		
		const socket = io(SOCKET_SERVER_URL)

		socket.on('eegData', (incomingData) => {
			addDataPoint(incomingData);
		});

		return () => {
			socket.disconnect();
		};
		
		/*
		const interval = setInterval(() => {
			addDataPoint();
		}, 1); // Update data every 0.001 second = 1000 data per second

		return () => clearInterval(interval);
		*/
	}, []); 

	const addDataPoint = (incomingData) => {
		const newTime = new Date().toLocaleTimeString();
		//const newValue = Math.floor(Math.random() * (0-100+1)+100);
		const newValue = incomingData.value;

		setData((prevData) => {
			const newLabels = prevData.labels.concat(newTime);
			const newData = prevData.datasets[0].data.concat(newValue);

			if (newLabels.length > 500) {
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

