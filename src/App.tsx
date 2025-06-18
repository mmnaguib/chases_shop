import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Products from "./pages/Products/Products";
import Purchases from "./pages/Invoices/Purchases/Purchases";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="purchases" element={<Purchases />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
