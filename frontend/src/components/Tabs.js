import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, Typography, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

function TabPanel(props) {
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
        <Box  width="100%">
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function BasicTabs({ tabName, tabsContent }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={2} style={{width:'100%'}}>
      <Grid item lg={2}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          orientation="vertical"
          indicatorColor="secondary"
        >
          {tabName?.map((tab) => (
            <Tab label={tab} key={tab} />
          ))}
        </Tabs>
      </Grid>
      <Grid item lg={10}>
        {tabsContent?.map((content, key) => (
          <TabPanel value={value} index={key}>
            {content}
          </TabPanel>
        ))}
      </Grid>
    </Grid>
  );
}
