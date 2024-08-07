import './App.css';
import Signup from './components/signup/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signin from './components/signin/Signin';
import Welcome from './components/welcome/Welcome';
import Cart from './components/cart/Cart';
import Prod from './components/singleProd/Prod';
import UserHistory from './pages/UserHistory';
import Sucess from './components/welcome/Sucess';
import Cancel from './components/welcome/Cancel';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Signup />} exact />
      <Route path='/main' element={<Welcome />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/prod/:id' element={<Prod />} />
      <Route path='/history' element={<UserHistory />} />
      <Route path='/api/prod/success' element={<Sucess />} />
      <Route path='/api/prod/cancel' element={<Cancel />} />

     </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
