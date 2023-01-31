import {Box, Grid} from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import * as React from "react";

function TabPanel(props) {
  const {children, value, index, ...other} = props;

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
              <Tab style={{
                backgroundColor: "rgba(42, 16, 83, 0.94)",
                color: '#ffffff',
                fontSize: "22px",
                fontWeight: "500",
                fontFamily: "'Poppins', sans-serif;",
                border: "1px solid #FFFFFF",
                borderRadius: "10px",
              }} label={tab} key={tab}/>
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
