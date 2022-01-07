import Header from './components/Header';
import ProductDetail from './components/ProductDetail';
import ProductListing from './components/ProductListing'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductListing />}/>
        <Route path="/product/:id" element={<ProductDetail />}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
