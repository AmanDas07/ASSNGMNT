import { Routes, Route } from 'react-router-dom';
import Register from '../src/pages/Register.js';
import Login from './pages/login.js';
import { ContextProvider } from './context/authContext';
import CreateProduct from './pages/cretaeProduct.js';
import HomePage from './pages/HomePage.js';

function App() {
  return (
    <ContextProvider>
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/createproduct' element={<CreateProduct />} />
        <Route path="/" elemen={<HomePage />} />
      </Routes>
    </ ContextProvider>
  );
}
//  background: url("https://doc-08-2c-docs.googleusercontent.com/docs/securesc/68c90smiglihng9534mvqmq1946dmis5/fo0picsp1nhiucmc0l25s29respgpr4j/1631524275000/03522360960922298374/03522360960922298374/1Sx0jhdpEpnNIydS4rnN4kHSJtU1EyWka?e=view&authuser=0&nonce=gcrocepgbb17m&user=03522360960922298374&hash=tfhgbs86ka6divo3llbvp93mg4csvb38") no-repeat center/cover;
export default App;
