import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p ={3} pl = {5} pr = {5}>
        {/* ICONS */}
        <Box display="flex">
            <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
            ) : (
                <LightModeOutlinedIcon />
            )}
            </IconButton>
        </Box>
        <Box display="flex">
            <Typography variant="h3" fontWeight="bold" color={colors.grey[100]}>
                Neuroprior AI
            </Typography>
        </Box>
    </Box>
  );
};

export default Topbar;