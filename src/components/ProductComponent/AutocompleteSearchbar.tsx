import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import axios from 'axios';
import { Filter } from '../../interfaces/FilterInterface';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#d4cfcf',
      paper: '#1d1d1d',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
  },
  typography: {
    body1: {
      fontSize: '1rem',
      color: '#ffffff',
    },
  },
});

interface Props {
  placeholder: string;
  onSearch: (filters: Filter[]) => void;
  initialFilters: Filter[];
}

function AutocompleteSearchbar({ placeholder, onSearch, initialFilters }: Props) {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [selectedValue, setSelectedValue] = useState<Filter[]>(initialFilters);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/getFilters", { withCredentials: true });
        if (data.filters) {
          // Sort filters by group and title to ensure unique headers
          const sortedFilters = data.filters.sort((a:Filter, b:Filter) => {
            if (a.group < b.group) return -1;
            if (a.group > b.group) return 1;
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
          });
          setFilters(sortedFilters);
        }
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };
    fetchFilters();
  }, []);

  useEffect(() => {
    setSelectedValue(initialFilters);
  }, [initialFilters]);

  const handleOptionEquality = (option: Filter, value: Filter) => {
    return option.title === value.title && option.group === value.group;
  };

  return (
    <div className="autocompleteSearchbar">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Autocomplete
          multiple
          id="tags-outlined"
          options={filters}
          groupBy={(option) => option.group}
          getOptionLabel={(option) => `${option.group}: ${option.title}`}
          filterSelectedOptions
          value={selectedValue}
          isOptionEqualToValue={handleOptionEquality}
          onChange={(event, value) => {
            console.log("Selected value:", value); // Log selected values for debugging
            setSelectedValue(value);
            onSearch(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              placeholder={placeholder}
              variant="outlined"
            />
          )}
        />
      </ThemeProvider>
    </div>
  );
}

export default AutocompleteSearchbar;
