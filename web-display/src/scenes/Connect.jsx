import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../theme";
import DownloadIcon from '@mui/icons-material/Download';
import Header from "../components/header";
import LineChart from "../components/LineChart";
import Topbar from "./global/Topbar";
import SidebarNav from "./global/SidebarNav";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden'}}>
            <SidebarNav />
            <div style={{flex: '1', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                <Topbar/>
                <Box  m="20px" sx={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                    <Box 
                        backgroundColor={colors.grey[900]} 
                        display="flex" 
                        justifyContent="space-between" 
                        alignItems="center" 
                        p={3}
                    >
                        <Header title="EEG DATA" subtitle="View your EEG signal below" />
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
                    <Box 
                        backgroundColor={colors.grey[900]} 
                        p={3} 
                        mt="20px"
                        sx={{
                            flexGrow: 1,
                            height: '420px',
                            overflow: 'hidden', // Prevent overflow outside this container
                        }}
                    >
                        <LineChart />
                    </Box>
                    <Box 
                        backgroundColor={colors.grey[900]} 
                        pl={3} 
                        pb={3}

                    >

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
            </div>
        </div>
    );
};
export default Dashboard;