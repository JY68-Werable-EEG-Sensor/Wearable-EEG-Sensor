import React, { useState } from 'react';
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/header";
import Topbar from "./global/Topbar";
import SidebarNav from "./global/SidebarNav";
import ChartHistory from "../components/ChartHistory"

import DownloadIcon from '@mui/icons-material/Download';


const History = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [loadData, setLoadData] = useState(false);

    const handleLoadData = () => {
        setLoadData(true);
    };

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
                        <Header title="HISTORY" subtitle="View your EEG signal below" />
                        <Button
                            onClick={handleLoadData}
                            sx={{
                                backgroundColor: colors.greenAccent[600],
                                color: colors.grey[100],
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                            }}
                        >
                            <DownloadIcon sx={{ mr: "10px" }} />
                            Load Data
                        </Button>
                    </Box>
                    <Box 
                        backgroundColor={colors.grey[900]} 
                        p={3} 
                        mt="20px"
                        sx={{
                            flexGrow: 1,
                            width: '100%',
                            height: '420px',
                            overflow: 'hidden', 
                        }}
                    >
                        <ChartHistory loadData={loadData} onLoadingComplete={() => setLoadData(false)} />
                    </Box>
                </Box>
            </div>
        </div>
    );
};
export default History;