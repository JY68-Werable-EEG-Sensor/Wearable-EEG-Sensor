import * as React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
//import Avatar from "@mui/material/Avatar";

import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
//import ListSubheader from "@mui/material/ListSubheader";

//import Badge from "@mui/material/Badge";
import FolderIcon from "@mui/icons-material/Folder";
import SettingsIcon from "@mui/icons-material/Settings";
import StarIcon from "@mui/icons-material/Star";
//import NotificationsIcon from "@mui/icons-material/Notifications";
//import { IconButton } from "@mui/material";

const drawerWidth = 230;
//const sideNavList = ["EEG Data", "History", "Placeholder", "Placeholder"];

function NavBar() {
  const drawer = (
    <div>
      <Toolbar />
      <Box sx={{ height: "40px" }} />
      <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                  <StarIcon sx={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText primary="EEG Data" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FolderIcon sx={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText primary="History" />
            </ListItemButton>
          </ListItem>
      </List>


      {/*
      <List>
        {sideNavList.map((text, index) => (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? (
                  <StarIcon sx={{ color: "black" }} />
                ) : index === 1 ? (
                  <FolderIcon sx={{ color: "black" }} />
                ) : (
                <SettingsIcon sx={{ color: "black" }} />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      */}
      
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        position="fixed"
        elevation={0}
        sx={{
          borderBottom: 1,
          borderColor: "grey.500",
          backgroundColor: "#FFFFFF",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Typography
            variant="h4"
            component="div"
            sx={{
              color: "black",
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            Neuroprior AI
          </Typography>
          <Box sx={{ m: "auto", disaplay: { xs: "none", md: "flex" } }}>
            <Typography variant="h6" sx={{ color: "black" }}>
              Capstone JY68
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default NavBar;
