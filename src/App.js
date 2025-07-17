import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import PYQs from './pages/PYQs';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PYQs" element={<PYQs/>}/>

      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
