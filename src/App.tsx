import React from 'react';
import CharacterList from './components/CharacterList';
import { Container } from '@mui/material';

function App() {
  return (
    <Container>
      <h1>Star Wars Characters</h1>
      <CharacterList />
    </Container>
  );
}

export default App;
