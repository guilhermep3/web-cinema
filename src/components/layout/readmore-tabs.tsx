import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { MovieType } from '@/types/MovieType';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type props = {
  movie: MovieType;
}
export default function ReadMoreTabs({ movie }: props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className='mx-auto w-full max-w-3xl px-3 md:px-4'>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor='inherit'
            TabIndicatorProps={{ style: { color: '#ff0000', backgroundColor: '#ff0000' } }}
          >
            <Tab label="Descrição" {...a11yProps(0)} sx={{ color: value === 0 ? '#ff0000' : '#f0f0f0' }} />
            <Tab label="Elenco" {...a11yProps(1)} sx={{ color: value === 1 ? '#ff0000' : '#f0f0f0' }} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <p className='text-sm md:text-base'>{movie.overview}</p>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <p className="text-zinc-600">Em breve...</p>
        </CustomTabPanel>
      </Box>
    </div>
  );
}
