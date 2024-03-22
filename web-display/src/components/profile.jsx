import { Typography, Box, IconButton } from "@mui/material";

import { Card, CardContent, Grid } from "@mui/material";

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import propic from "../img/profile_pic.jpg"

const Profile = ({ name, web1, web2 }) => {

  return (
    <Box>
        <Card sx={{ pt:2, m: 3, borderRadius:'5%' }}>
            <CardContent>
                <Grid
                    container
                    direction="column"
                    justifyContent="space-around"
                    alignItems="center" 
                >

                    <img  src={propic} height="100"/>
                    
                   
                    <Typography variant="h3" sx={{ mt: 2, mb: 1 }}>
                        {name}
                    </Typography>
                    
                    <Typography variant="h5" sx={{ mt: 3, mb: 3 }} color="text.secondary">
                        Bachelor of Applied Science
                        <br />
                        UBC Electrical Engineering
                    </Typography>
                    <Box>
                        <IconButton onClick={() => window.open(web1)}> 
                            <LinkedInIcon sx={{ fontSize: 40, mr: 3}}/>
                        </IconButton>
                        <IconButton onClick={() => window.open(web2)}>
                            <GitHubIcon sx={{fontSize: 40}}/> 
                        </IconButton>  
                    </Box>
                    
                </Grid>
                
            </CardContent>
            
        </Card>
    </Box>
  );
};

export default Profile;