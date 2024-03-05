import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../theme";
import DownloadIcon from '@mui/icons-material/Download';
import Header from "../components/header";
import LineChart from "../components/LineChart";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box 
                backgroundColor={colors.grey[900]} 
                //backgroundColor="#131516"
                display="flex" 
                justifyContent="space-between" 
                alignItems="center" 
                p={3}
            >
                <Header title="EEG DATA" subtitle="View your EEG signal below" />
                <Box>
                    <Button
                        sx={{
                        backgroundColor: colors.greenAccent[600],
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                        }}
                    >
                        <DownloadIcon sx={{ mr: "10px" }} />
                        Download
                    </Button>
                </Box>
            </Box>
            <Box 
                backgroundColor={colors.grey[900]} 
                //backgroundColor="#131516"
                p={3} 
                m="20px 0 0 0"
            >
                    <LineChart isDashboard={true} />
                    <Button
                        sx={{
                        backgroundColor: colors.greenAccent[600],
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 30px",
                        margin: "20px 30px 0 0",
                        }}
                    >
                        Start
                    </Button>
                    <Button
                        sx={{
                        backgroundColor: colors.greenAccent[600],
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 30px",
                        margin: "20px 30px 0 0",
                        }}
                    >
                        Stop
                    </Button>
            </Box>
        </Box>

    );
};
export default Dashboard;