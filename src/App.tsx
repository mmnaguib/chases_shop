import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Purchases from "./pages/Invoices/Purchases/Purchases";
import Sales from "./pages/Invoices/Sales/Sales";
import Categoies from "./pages/Categories";
import Items from "./pages/Items/Items";
import { ToastContainer } from "react-toastify";
import InvoicesTable from "./pages/Invoices/InvoicesTable";
import UserInvoices from "./pages/Invoices/UserInvoices";
import GetUsers from "./pages/ClientsAndVendors/GetAllUsers";
import { NotFoundPage } from "./pages/NotFoundPage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { GuestRoute, ProtectedRoute } from "./components/ProtectedRoutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="login"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />
            <Route
              path="items"
              element={
                <ProtectedRoute>
                  <Items />
                </ProtectedRoute>
              }
            />
            <Route
              path="categories"
              element={
                <ProtectedRoute>
                  <Categoies />
                </ProtectedRoute>
              }
            />
            <Route
              path="purchases"
              element={
                <ProtectedRoute>
                  <Purchases />
                </ProtectedRoute>
              }
            />
            <Route
              path="sales"
              element={
                <ProtectedRoute>
                  <Sales />
                </ProtectedRoute>
              }
            />
            <Route
              path="invoices"
              element={
                <ProtectedRoute>
                  <InvoicesTable />
                </ProtectedRoute>
              }
            />
            <Route
              path="user/:id"
              element={
                <ProtectedRoute>
                  <UserInvoices />
                </ProtectedRoute>
              }
            />
            <Route
              path="users"
              element={
                <ProtectedRoute>
                  <GetUsers />
                </ProtectedRoute>
              }
            />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
