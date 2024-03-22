import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import 'chart.js/auto'; // This imports the necessary chart types and defaults into Chart.js

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
	};

	const [data, setData] = useState({
		labels: [], // We'll be adding labels dynamically
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
			// Function to simulate adding a new data point
			addDataPoint();
		}, 100); // Update data every 0.01 second

		return () => clearInterval(interval); // Cleanup interval on component unmount
	}, []); // Empty dependency array means this effect runs once on mount

	const addDataPoint = () => {
		const newTime = new Date().toLocaleTimeString();
		const newValue = Math.floor(Math.random() * (0-110+1)+100);

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


{/*}
import React, { Component } from 'react';
import Box from "@mui/material/Box";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import { Line } from 'react-chartjs-2';


class LineChart extends Component {
	
	render() {
        const options = {
			scales: {
			  xAxes: [
				{
				  type: "realtime",
				  realtime: {
					onRefresh: function() {
					  data.datasets[0].data.push({
						x: Math.random() * 100,
						y: Math.random() * 100
					  });
					},
					delay: 500
				  }
				}
			  ]
			}
		};
		const data = {
			datasets: [
			  {
				label: "Dataset 1",
				borderColor: "rgb(255, 99, 132)",
				backgroundColor: "rgba(255, 99, 132, 0.0)",
				lineTension: 0,
				borderDash: [8, 4],
				data: []
			  }
			]
		};

		return (
			<div>
				<Box sx={{ flexGrow: 1 }}> 
					<Line
                        options = {options}
						data= {data} 
					/>
				</Box>
			</div>
		);
	}
}
export default LineChart;
*/}


{/*}
import React, { Component } from 'react';
//import { useTheme } from "@mui/material";
import CanvasJSReact from '@canvasjs/react-charts';
import Box from "@mui/material/Box";
//import { useTheme } from "@mui/material";

//import { tokens } from "../theme";
//import NavBar from "./components/navBar/NavBar";



//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LineChart extends Component {
	
	render() {
        

		const options = {
            theme: "dark2",
            //backgroundColor: "#292929",
            backgroundColor: "#131516",
			animationEnabled: true,
            
			//title:{ text: "EEG Data"},
			axisX: {
				title: "time (s)",
                
			},
			axisY: {
				title: "Voltage",
                gridThickness: "0",
                lineThickness: "1",
				suffix: "V"
			},
			data: [{
				yValueFormatString: "#,###",
				xValueFormatString: "#,###",
				type: "spline",
                color: "#49a08c",
				dataPoints: [
					{ x: 0, y: 25060 },
					{ x: 1, y: 27980 },
					{ x: 2, y: 42800 },
					{ x: 3, y: 32400 },
					{ x: 4, y: 35260 },
					{ x: 5, y: 33900 },
					{ x: 6, y: 40000 },
					{ x: 7, y: 52500 },
					{ x: 8, y: 32300 },
					{ x: 9, y: 42000 },
					{ x: 10, y: 37160 },
					{ x: 11, y: 38400 }
				]
			}]
		}

		return (
			<div>
				<Box sx={{ flexGrow: 1 }}> 
					<CanvasJSChart 
                        options = {options}
						onRef={ref => this.chart = ref} 
					/>
				</Box>
			</div>
		);
	}
}
export default LineChart;
*/}

{/*}
//import React from "react";
import { Line } from "react-chartjs-2";


const LineChart = () => {

	return {
		<Line
			datasetIdKey='id'
			data={{
			labels: ['Jun', 'Jul', 'Aug'],
			datasets: [
				{
				id: 1,
				label: '',
				data: [5, 6, 7],
				},
				{
				id: 2,
				label: '',
				data: [3, 2, 1],
				},
			],
			}}
		/>; 
	}
};

export default LineChart;
*/}