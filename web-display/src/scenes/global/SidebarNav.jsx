import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from 'react-router-dom';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";

import { tokens } from "../../theme";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import HistoryIcon from '@mui/icons-material/History';
import DehazeIcon from '@mui/icons-material/Dehaze';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography variant="h5" >{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};

const SidebarNav = () => {
    const theme = useTheme();
    const location = useLocation(); 
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(() => {
        const isCollapsedStored = localStorage.getItem('sidebarIsCollapsed');
        return isCollapsedStored ? JSON.parse(isCollapsedStored) : false;
    });    
    const [selected, setSelected] = useState("Graph");

    useEffect(() => {
        if(location.pathname === '/connect') {
            setSelected('Graph');
        } else if(location.pathname === '/history') {
            setSelected('History');
        }
    }, [location]);

    useEffect(() => {
        localStorage.setItem('sidebarIsCollapsed', JSON.stringify(isCollapsed));
    }, [isCollapsed]);

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.grey[900]} !important`,
                    //background: "#1D2123",
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 20px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: `${colors.greenAccent[300]} !important`,
                },
                "& .pro-menu-item.active": {
                    backgroundColor: `${colors.greenAccent[600]} !important`,
                },
            }}

        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                {/* TITLE AND MENU ICON */}
                <MenuItem
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    icon={isCollapsed ? <DehazeIcon /> : undefined}
                    style={{
                    margin: "10px 0 30px 0",
                    color: colors.grey[100],
                    }}
                >
                    {!isCollapsed && (
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        ml="10px"
                    >
                        <Typography variant="h4" color={colors.grey[100]}>
                            Dashboard
                        </Typography>
                        <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                            <DehazeIcon />
                        </IconButton>
                    </Box>
                    )}
                </MenuItem>

                <Box paddingLeft={isCollapsed ? undefined : 0} >
                    <Item
                        title="Graph"
                        to="/connect"
                        icon={<ShowChartIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="History"
                        to="/history"
                        icon={<HistoryIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default SidebarNav;