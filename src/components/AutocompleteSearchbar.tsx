
import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import axios from 'axios';
import { Filter } from '../interfaces/FilterInterface';

// Define your theme
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
  initialFilters: Filter[]; // New prop to pass initial filter values from parent
}

function AutocompleteSearchbar({ placeholder, onSearch, initialFilters }: Props) {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [selectedValue, setSelectedValue] = useState<Filter[]>(initialFilters);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/getFilters", { withCredentials: true });
        if (data.error) {
          console.error("Error:", data.error);
        }
        if (data.filters) {
          setFilters(data.filters);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchFilters();
  }, []);

  useEffect(() => {
    setSelectedValue(initialFilters);
  }, [initialFilters]);

  // Filter out already selected values
  const filteredOptions = filters.filter(
    (option) => !selectedValue.some((selected) => selected.title === option.title)
  );

  const groupedOptions = filteredOptions.sort((a, b) => {
    if (a.group < b.group) return -1;
    if (a.group > b.group) return 1;
    return 0;
  });

  return (
    <div className="autocompleteSearchbar">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Autocomplete
          multiple
          id="tags-outlined"
          options={groupedOptions}
          groupBy={(option) => option.group}
          getOptionLabel={(option) => `${option.group}: ${option.title}`}
          filterSelectedOptions
          value={selectedValue}
          onChange={(event, value) => {
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

