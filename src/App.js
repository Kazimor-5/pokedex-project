// ! COMPONENTS
import PokemonList from './components/PokemonList';
import Details from './components/Details';
import Error from './components/Error';
// ! FILES
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PokemonList />} />
        <Route path='/pokemon/:id' element={<Details />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
