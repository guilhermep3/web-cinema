import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { MovieType } from '@/types/MovieType';
import { CastType } from '@/types/castType';

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
  cast: CastType[];
}
export default function ReadMoreTabs({ movie, cast }: props) {
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
          <p className='text-sm md:text-base'>
            {movie.overview && movie.overview.length > 10 ? movie.overview : 'Não há descrição para este filme.'}
          </p>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
            {cast.map((i) => (
              <div className='flex justify-center items-center flex-col gap-1'>
                <img src={`https://image.tmdb.org/t/p/w200${i.profile_path}`} alt={i.name}
                  className='w-36 sm:w-40 h-48 sm:h-52 object-cover bg-zinc-800'
                />
                <p key={i.id}>{i.name}</p>
              </div>
            ))}
          </div>
        </CustomTabPanel>
      </Box>
    </div>
  );
}
