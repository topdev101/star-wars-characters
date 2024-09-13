// src/components/SearchAndFilter.tsx
import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box } from '@mui/material';
import axios from 'axios';

interface SearchAndFilterProps {
    setCharacters: (characters: any[]) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ setCharacters }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [gender, setGender] = useState('');
    const [homeworld, setHomeworld] = useState('');

    const handleSearch = async () => {
        const response = await axios.get(`https://swapi.dev/api/people/?search=${searchTerm}`);
        setCharacters(response.data.results);
    };

    const handleFilter = async () => {
        const response = await axios.get(`https://swapi.dev/api/people/`);
        const filtered = response.data.results.filter(
            (char: any) =>
                (gender === '' || char.gender === gender) &&
                (homeworld === '' || char.homeworld === homeworld)
        );
        setCharacters(filtered);
    };

    return (
        <Box display="flex" gap={2} marginBottom={4}>
            <TextField
                label="Search by Name"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <TextField
                label="Filter by Gender"
                variant="outlined"
                select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
            >
                <MenuItem value="">All Genders</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="n/a">N/A</MenuItem>
            </TextField>
            <TextField
                label="Filter by Homeworld"
                variant="outlined"
                value={homeworld}
                onChange={(e) => setHomeworld(e.target.value)}
            />
            <Button variant="contained" onClick={handleSearch}>
                Search
            </Button>
            <Button variant="contained" onClick={handleFilter}>
                Filter
            </Button>
        </Box>
    );
};

export default SearchAndFilter;
