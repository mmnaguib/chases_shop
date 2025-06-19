import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Purchases from "./pages/Invoices/Purchases/Purchases";
import Sales from "./pages/Invoices/Sales/Sales";
import Categoies from "./pages/Categories";
import Items from "./pages/Items/Items";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="items" element={<Items />} />
            <Route path="categories" element={<Categoies />} />
            <Route path="purchases" element={<Purchases />} />
            <Route path="sales" element={<Sales />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
