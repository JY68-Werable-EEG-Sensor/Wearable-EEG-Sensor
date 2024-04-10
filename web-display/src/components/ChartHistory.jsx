
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import eegData from "../data/output_data.json";

const ChartHistory = ({ loadData, onLoadingComplete }) => {
	const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isLoading, setIsLoading] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
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

    useEffect(() => {
        console.log(`Effect running: loadData=${loadData}, dataLoaded=${dataLoaded}`);
        if (loadData && !dataLoaded) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setDataLoaded(true);
                if (onLoadingComplete) {
                    onLoadingComplete(); 
                }
            }, 2000); 
        }
    }, [loadData, dataLoaded, onLoadingComplete]);

    const chartData = dataLoaded ? {
        labels: eegData.map((_, index) => index + 1),  
        datasets: [{
            label: 'EEG Data',
            data: eegData,
            borderColor: colors.greenAccent[400],
            borderWidth: 2,
            fill: false,
            pointRadius: 0,
            tension: 0.4,
        },], 
    } : {
        labels: [],  
        datasets: [{
            label: 'EEG Data',
            data: [],
        },], 
    };

	return (
        isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px' }}>
                <p>Loading...</p>
            </div>
        ) : (
            <div style={{ width: '100%', overflowX: 'scroll', height: '500px' }}>
                <div style={{ width: '5000px' }}>
                    <Line data={chartData} options={options} height={400} />
                </div>
            </div>
        ) 
	);
};

export default ChartHistory;

