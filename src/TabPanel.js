import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import data from './data.json';
import CenteredGrid from './CenteredGrid'
import AgeSelection from './AgeSelection'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function TabPanel(props) {
  console.log(props);
  const { children, value, index, ...other } = props;
 
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
 const submissions=props.submissions;
  const checked1=props.checked1;
  const checked2=props.checked2;
  const checked3=props.checked3;
  const [value, setValue] = React.useState(0);

 

   const handleChange = (event, newValue) => {
    setValue(newValue);
  };



 // const submissions = data;




  return (
    <div className={classes.root}>
     
      <AppBar position="static">

        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Rabindra Sangeet" {...a11yProps(0)} />
          <Tab label="Rabindra Nritya" {...a11yProps(1)} />
          <Tab label="Recitation" {...a11yProps(2)} />
           <Tab label="Painting" {...a11yProps(3)} />
           <Tab label="Contributions (Not for Competition)" {...a11yProps(4)} />
          
        </Tabs>    
  
      </AppBar>
      <TabPanel value={value} index={0}>
        <CenteredGrid submissions={submissions} checked1={checked1} checked2={checked2} checked3={checked3} filter="Rabindra Sangeet" />
      </TabPanel>
      <TabPanel   value={value} index={1}>
          <CenteredGrid submissions={submissions}  checked1={checked1} checked2={checked2} checked3={checked3} filter="Rabindra Nritya" />
      </TabPanel>
      <TabPanel    value={value} index={2}>
          <CenteredGrid submissions={submissions}  checked1={checked1} checked2={checked2} checked3={checked3} filter="Recitation"/>
      </TabPanel>
       <TabPanel    value={value} index={3}>
          <CenteredGrid submissions={submissions}  checked1={checked1} checked2={checked2} checked3={checked3} filter="Painting"/>
      </TabPanel>
    </div>
  );
}
