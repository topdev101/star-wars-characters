// src/components/CharacterList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterCard from './CharacterCard';
import CharacterModal from './CharacterModal';
import SearchAndFilter from './SearchAndFilter';
import { Pagination, Box, CircularProgress } from '@mui/material';

const CharacterList: React.FC = () => {
    const [characters, setCharacters] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCharacter, setSelectedCharacter] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCharacters(currentPage);
    }, [currentPage]);

    const fetchCharacters = async (page: number) => {
        setLoading(true);
        const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
        setCharacters(response.data.results);
        setLoading(false);
    };

    const handleCharacterClick = (character: any) => {
        setSelectedCharacter(character);
        setShowModal(true);
    };

    return (
        <Box>
            <SearchAndFilter setCharacters={setCharacters} />
            <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    characters.map((character, index) => (
                        <CharacterCard key={index} character={character} onClick={() => handleCharacterClick(character)} />
                    ))
                )}
            </Box>
            <Pagination
                count={9} // SWAPI has 9 pages of characters
                page={currentPage}
                onChange={(e, page) => setCurrentPage(page)}
                color="primary"
                sx={{ marginTop: 4, justifyContent: 'center', display: 'flex' }}
            />
            {selectedCharacter && (
                <CharacterModal character={selectedCharacter} show={showModal} onHide={() => setShowModal(false)} />
            )}
        </Box>
    );
};

export default CharacterList;
