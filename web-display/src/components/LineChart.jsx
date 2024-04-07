import React, { Component } from 'react';
//import { useTheme } from "@mui/material";
import CanvasJSReact from '@canvasjs/react-charts';
import Box from "@mui/material/Box";
//import { tokens } from "../theme";
//import NavBar from "./components/navBar/NavBar";


//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LineChart extends Component {
	
	render() {
        

		const options = {
            theme: "dark2",
            //backgroundColor: "#4d4d80",
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
					{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
				</Box>
			</div>
		);
	}
}
export default LineChart;