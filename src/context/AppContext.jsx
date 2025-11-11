// src/context/AppContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
// import { geminiService } from '../services/geminiService';
import { MOCK_USERS, MOCK_CATEGORIES, MOCK_MENU_ITEMS, MOCK_ORDERS } from '../constants';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingRecs, setIsFetchingRecs] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [orders, setOrders] = useState([]);
    const [cart, setCart] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [mealPlan, setMealPlan] = useState([]);

    // Load data from localStorage
    useEffect(() => {
        setIsLoading(true);
        try {
            const db = localStorage.getItem('gourmetgo_db');
            let data;
            if (db) {
                data = JSON.parse(db);
            } else {
                data = {
                    users: MOCK_USERS,
                    menuItems: MOCK_MENU_ITEMS,
                    categories: MOCK_CATEGORIES,
                    orders: MOCK_ORDERS,
                };
            }
            setUsers(data.users || []);
            setMenuItems(data.menuItems || []);
            setCategories(data.categories || []);
            setOrders(data.orders || []);

            const userId = sessionStorage.getItem('userId');
            if (userId) {
                const user = data.users.find(u => u.id === userId);
                if (user) {
                    setCurrentUser(user);
                    setCart(user.cart || []);
                    setFavorites(user.favorites || []);
                } else {
                    sessionStorage.removeItem('userId');
                }
            }
        } catch (err) {
            console.error('Failed to load data from localStorage', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Save data to localStorage
    useEffect(() => {
        if (!isLoading) {
            const updatedUsers = currentUser
                ? users.map(u => u.id === currentUser.id ? { ...u, cart, favorites } : u)
                : users;
            localStorage.setItem('gourmetgo_db', JSON.stringify({
                users: updatedUsers,
                menuItems,
                categories,
                orders,
            }));
        }
    }, [users, menuItems, categories, orders, cart, favorites, currentUser, isLoading]);

    // Meal Plan
    const clearMealPlan = () => setMealPlan([]);

    const generateMealPlan = async (budget) => {
        if (!currentUser || currentUser.role !== 'CUSTOMER' || menuItems.length === 0) return;
        setIsFetchingRecs(true);
        try {
            const userOrders = orders.filter(o => o.userId === currentUser.id);
            const favoriteItems = menuItems.filter(item => favorites.includes(item.id));
            const orderedItems = userOrders.flatMap(o => o.items.map(ci => ci.item));
            const preferredItems = [...favoriteItems, ...orderedItems];
            const uniqueNames = [...new Set(preferredItems.map(i => i.name))];
            const potentialMenu = menuItems.filter(i => !uniqueNames.includes(i.name));
            const menuToUse = potentialMenu.length > 0 ? potentialMenu : menuItems;

            const recommendedNames = await geminiService.getMealPlan(uniqueNames, menuToUse, budget);
            const recommendedItems = menuItems
                .filter(i => recommendedNames.includes(i.name))
                .sort((a, b) => recommendedNames.indexOf(a.name) - recommendedNames.indexOf(b.name));
            setMealPlan(recommendedItems);
        } catch (err) {
            console.error('Failed to generate meal plan', err);
            setMealPlan([]);
        } finally {
            setIsFetchingRecs(false);
        }
    };

    // Auth
    const login = async (email, password) => {
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
        if (user) {
            setCurrentUser(user);
            setCart(user.cart || []);
            setFavorites(user.favorites || []);
            sessionStorage.setItem('userId', user.id);
            return { success: true, user, message: 'Login successful.' };
        }
        return { success: false, user: null, message: 'Invalid email or password.' };
    };

    const logout = () => {
        setCurrentUser(null);
        setCart([]);
        setFavorites([]);
        setMealPlan([]);
        sessionStorage.removeItem('userId');
    };

    const register = async (userData) => {
        const exists = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
        if (exists) return { success: false, message: 'Email already exists.' };

        const newUser = { ...userData, id: `user-${Date.now()}` };
        setUsers(prev => [...prev, newUser]);
        await login(newUser.email, newUser.password);
        return { success: true, message: 'Registration successful.' };
    };

    const resetPassword = async (email, newPassword) => {
        let found = false;
        setUsers(prev => prev.map(u => {
            if (u.email.toLowerCase() === email.toLowerCase()) {
                found = true;
                return { ...u, password: newPassword };
            }
            return u;
        }));
        return found ? { success: true, message: 'Password reset successful.' } : { success: false, message: 'User not found.' };
    };

    // Users
    const addUser = async (userData) => {
        const exists = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
        if (exists) return { success: false, message: 'Email already exists.' };
        const newUser = { ...userData, id: `user-${Date.now()}` };
        setUsers(prev => [...prev, newUser]);
        return { success: true, message: 'User added successfully.' };
    };

    const updateUser = async (updatedUser) => {
        setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
        if (currentUser?.id === updatedUser.id) setCurrentUser(updatedUser);
        return { success: true, message: 'User updated successfully.' };
    };

    const deleteUser = async (userId) => {
        const u = users.find(u => u.id === userId);
        if (!u) return { success: false, message: 'User not found.' };
        if (u.role === 'CUSTOMER' && orders.some(o => o.userId === userId)) {
            return { success: false, message: `Cannot delete customer "${u.name}" with orders.` };
        }
        setUsers(prev => prev.filter(u => u.id !== userId));
        return { success: true, message: 'User deleted successfully.' };
    };

    // Menu
    const addMenuItem = async (itemData) => {
        const newItem = { ...itemData, id: `item-${Date.now()}` };
        setMenuItems(prev => [...prev, newItem]);
        return { success: true, message: 'Item added successfully.' };
    };
    const updateMenuItem = async (updatedItem) => {
        setMenuItems(prev => prev.map(i => i.id === updatedItem.id ? updatedItem : i));
        setCart(prev => prev.map(ci => ci.item.id === updatedItem.id ? { ...ci, item: updatedItem } : ci));
        return { success: true, message: 'Item updated successfully.' };
    };
    const deleteMenuItem = async (itemId) => {
        setMenuItems(prev => prev.filter(i => i.id !== itemId));
        setCart(prev => prev.filter(ci => ci.item.id !== itemId));
        setFavorites(prev => prev.filter(id => id !== itemId));
        return { success: true, message: 'Item deleted successfully.' };
    };

    // Categories
    const addCategory = async (name) => {
        if (categories.some(c => c.name.toLowerCase() === name.toLowerCase())) {
            return { success: false, message: 'Category exists.' };
        }
        const newCategory = { name, id: `cat-${Date.now()}` };
        setCategories(prev => [...prev, newCategory]);
        return { success: true, message: 'Category added.' };
    };
    const updateCategory = async (updatedCategory) => {
        if (categories.some(c => c.name.toLowerCase() === updatedCategory.name.toLowerCase() && c.id !== updatedCategory.id)) {
            return { success: false, message: 'Category name exists.' };
        }
        setCategories(prev => prev.map(c => c.id === updatedCategory.id ? updatedCategory : c));
        return { success: true, message: 'Category updated.' };
    };
    const deleteCategory = async (categoryId) => {
        if (categories.length <= 1) return { success: false, message: 'Cannot delete last category.' };
        const defaultCat = categories.find(c => c.id !== categoryId);
        setMenuItems(prev => prev.map(item => item.categoryId === categoryId ? { ...item, categoryId: defaultCat.id } : item));
        setCategories(prev => prev.filter(c => c.id !== categoryId));
        return { success: true, message: 'Category deleted.' };
    };

    // Cart
    const addToCart = (item) => addToCartWithQuantity(item, 1);
    const addToCartWithQuantity = (item, quantity) => {
        setCart(prev => {
            const existing = prev.find(ci => ci.item.id === item.id);
            if (existing) return prev.map(ci => ci.item.id === item.id ? { ...ci, quantity: ci.quantity + quantity } : ci);
            return [...prev, { item, quantity }];
        });
    };
    const removeFromCart = (itemId) => setCart(prev => prev.filter(ci => ci.item.id !== itemId));
    const updateCartQuantity = (itemId, quantity) => {
        if (quantity <= 0) removeFromCart(itemId);
        else setCart(prev => prev.map(ci => ci.item.id === itemId ? { ...ci, quantity } : ci));
    };
    const clearCart = () => setCart([]);
    const cartTotal = cart.reduce((sum, { item, quantity }) => sum + item.price * quantity, 0);

    // Orders
    const placeOrder = async (paymentDetails) => {
        if (!currentUser) return { success: false, error: 'User not logged in' };
        if (cart.length === 0) return { success: false, error: 'Cart is empty' };

        const newOrder = {
            id: `order-${Date.now()}`,
            userId: currentUser.id,
            items: cart,
            total: cartTotal,
            status: 'Pending',
            orderDate: new Date().toISOString(),
            customerName: currentUser.name,
        };
        setOrders(prev => [...prev, newOrder]);
        clearCart();
        return { success: true, order: newOrder };
    };
    const updateOrderStatus = async (orderId, status) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
        return { success: true, message: 'Order status updated' };
    };
    const deleteOrder = async (orderId) => {
        setOrders(prev => prev.filter(o => o.id !== orderId));
        return { success: true, message: 'Order deleted' };
    };

    // Favorites
    const toggleFavorite = (itemId) => {
        setFavorites(prev => prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]);
    };
    const isFavorite = (itemId) => favorites.includes(itemId);

    return (
        <AppContext.Provider value={{
            currentUser, users, menuItems, categories, orders, cart, favorites, mealPlan,
            isLoading: isLoading || isFetchingRecs,
            cartTotal,
            login, logout, register, resetPassword,
            addUser, updateUser, deleteUser,
            addMenuItem, updateMenuItem, deleteMenuItem,
            addCategory, updateCategory, deleteCategory,
            addToCart, addToCartWithQuantity, removeFromCart, updateCartQuantity, clearCart,
            placeOrder, updateOrderStatus, deleteOrder,
            toggleFavorite, isFavorite,
            generateMealPlan, clearMealPlan,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useAppContext must be used within AppProvider');
    return context;
};





