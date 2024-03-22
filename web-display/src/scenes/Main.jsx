import { Box, Button, useTheme, Typography } from "@mui/material";
import { tokens } from "../theme";
import { Link } from 'react-router-dom';
import Profile from "../components/profile"
import head from "../img/head.svg"
import product from "../img/product.png"
import ParticlesComponent from "../components/particles"

const Main = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" sx={{ height: "100vh"}}>
                <ParticlesComponent id="particles" />
                <Box pl={10} pt={10}>
                    <Typography 
                        variant="h1" 
                        fontWeight="bold"
                        color={colors.grey[100]}
                        pb={3}
                    >
                        EEG SENSOR
                    </Typography>

                    <Typography 
                        variant="h2"
                        color={colors.greenAccent[400]}
                        pb={10}
                    >
                        Pocket-Sized At-Home Neurocare: Simplify Your Health Diagnostics
                    </Typography>
                    <Link to={"/connect"}>
                        <Button
                            sx={{
                                backgroundColor: colors.greenAccent[600],
                                color: colors.grey[100],
                                fontSize: "20px",
                                fontWeight: "bold",
                                padding: "15px 25px",
                            }}
                        >
                            CONNECT
                        </Button>
                    </Link>
                    
                </Box>
                <Box display= "flex" pt={30} pr={10} pb={0}>
                    <img src={head}/>
                </Box>
            </Box>

            <Box display="flex" justifyContent="space-between" sx={{backgroundColor: "white"}}>
                <Box pl={10} pt={10}>
                    <Typography 
                        variant="h1" 
                        fontWeight="bold"
                        color={colors.grey[900]}
                        pb={3}
                    >
                        OUR PRODUCT
                    </Typography>

                    <Typography 
                        variant="h2"
                        color={colors.greenAccent[500]}
                        fontWeight="bold"
                        pb={2}
                    >
                        Product Specification
                    </Typography>

                    <Typography 
                        variant="h3"
                        color={colors.greenAccent[600]}
                    >
                        Size : 2cm x 2cm
                        <br />
                    </Typography>
                </Box>
                <Box pr={10} pt={5} pb={5}>
                    <img src={product} height="700"/>
                </Box>

                
            </Box>

            
           
            <Box display="flex" justifyContent="space-between" sx={{ backgroundColor: colors.primary[500], }}>
                <Box p={10} width="100vw">
                    <Typography 
                        variant="h1" 
                        fontWeight="bold"
                        color={colors.grey[100]}
                        pb={3}
                    >
                        OUR TEAM
                    </Typography>

                    <Box display="flex" justifyContent="center">
                        <Profile 
                            name="Christopher Wang"
                            web1='https://linkedin.com'
                            web2='https://github.com'
                        />
                        <Profile 
                            name="Albert Yu"
                            web1='https://linkedin.com'
                            web2='https://github.com'
                        />
                        <Profile 
                            name="Connor Seto"
                            web1='https://linkedin.com'
                            web2='https://github.com'
                        />
                    </Box>
                    <Box  display="flex" justifyContent="center">
                        <Profile 
                            name="Taher Kathawala"
                            web1='https://linkedin.com'
                            web2='https://github.com'
                        />
                        <Profile 
                            name="Jiraphas Supamitmongkol" 
                            web1='https://linkedin.com/in/peak-supamitmongkol' 
                            web2='https://github.com/Peakachu11'
                        />
                    </Box>
                    
                </Box>
                


            </Box>
        </Box>

    );
};
export default Main;