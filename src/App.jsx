import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import MenuItemDetailPage from './pages/MenuItemDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrdersPage from './pages/OrdersPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FavoritesPage from './pages/FavoritesPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminRegisterPage from './pages/admin/AdminRegisterPage';
import CatererRegisterPage from './pages/CatererRegisterPage';
import CatererDashboard from './pages/CatererDashboard';
import ProfilePage from './pages/ProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminForgotPasswordPage from './pages/admin/AdminForgotPasswordPage';
import CatererLoginPage from './pages/caterer/CatererLoginPage';
import CatererForgotPasswordPage from './pages/caterer/CatererForgotPasswordPage';

const AppContent = () => {
    const location = useLocation();
    const isAuthPage = [
        '/login', '/register', '/admin/login', '/admin/register', '/caterer/register', 
        '/forgot-password', '/admin/forgot-password', '/caterer/login', '/caterer/forgot-password'
    ].includes(location.pathname);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
            {!isAuthPage && <Header />}
            <main key={location.pathname} className={isAuthPage ? "flex-grow" : "flex-grow container mx-auto px-4 py-8 page-enter-active"}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/menu/:itemId" element={<MenuItemDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/admin/login" element={<AdminLoginPage />} />
                    <Route path="/admin/register" element={<AdminRegisterPage />} />
                    <Route path="/admin/forgot-password" element={<AdminForgotPasswordPage />} />
                    <Route path="/admin/*" element={<AdminDashboard />} />
                    <Route path="/caterer/register" element={<CatererRegisterPage />} />
                    <Route path="/caterer/login" element={<CatererLoginPage />} />
                    <Route path="/caterer/forgot-password" element={<CatererForgotPasswordPage />} />
                    <Route path="/caterer/*" element={<CatererDashboard />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
            {!isAuthPage && <Footer />}
        </div>
    );
}

const App = () => {
    return (
        <AppProvider>
            <HashRouter>
                <AppContent />
            </HashRouter>
        </AppProvider>
    );
};

export default App;
