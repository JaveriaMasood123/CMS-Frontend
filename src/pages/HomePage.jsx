// import React, { useState } from 'react';
// import * as ReactRouterDOM from 'react-router-dom';
// import { useAppContext } from '../context/AppContext';
// import MenuItemCard from '../components/MenuItemCard';
// // import { UserRole } from '../server/types';

// const HowItWorksCard = ({ number, title, description, icon }) => (
//     <div className="text-center p-6 bg-white rounded-lg shadow-md border border-gray-200">
//         <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
//             {icon}
//         </div>
//         <h3 className="text-xl font-bold mb-2"><span className="text-teal-600">{number}</span> {title}</h3>
//         <p className="text-gray-600">{description}</p>
//     </div>
// );

// const TestimonialCard = ({ quote, author, role }) => (
//     <div className="bg-white p-8 rounded-lg shadow-lg text-center">
//         <p className="text-gray-700 italic text-lg mb-4">"{quote}"</p>
//         <p className="font-bold text-teal-600">{author}</p>
//         <p className="text-sm text-gray-500">{role}</p>
//     </div>
// );

// const HomePage = () => {
//     const { menuItems, currentUser, mealPlan, generateMealPlan, clearMealPlan, isLoading, addToCart } = useAppContext();
//     const [budget, setBudget] = useState('');
//     const [planGenerated, setPlanGenerated] = useState(false);
    
//     const featuredItems = menuItems.slice(0, 4);

//     const handleGeneratePlan = (e) => {
//         e.preventDefault();
//         const budgetValue = parseFloat(budget);
//         if (!budgetValue || budgetValue <= 0) return;
//         clearMealPlan();
//         generateMealPlan(budgetValue);
//         setPlanGenerated(true);
//     };

//     const handleAddPlanToCart = () => {
//         mealPlan.forEach(item => addToCart(item));
//         alert('Meal plan added to your cart!');
//     };

//     const mealPlanTotal = mealPlan.reduce((total, item) => total + item.price, 0);

//     return (
//         <div className="space-y-16">
//             <section className="relative text-center bg-white py-20 px-4 rounded-lg shadow-lg overflow-hidden">
//                 <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/catering-event/1200/400')" }}></div>
//                 <div className="absolute inset-0 bg-black opacity-50"></div>
//                 <div className="relative z-10">
//                     <h1 className="text-5xl font-extrabold text-white mb-4">Exquisite Catering for Every Occasion</h1>
//                     <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">From corporate events to intimate gatherings, we deliver unforgettable culinary experiences.</p>
//                     <ReactRouterDOM.Link to="/menu" className="bg-teal-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-teal-700 transition-transform hover:scale-105 inline-block">
//                         View Full Menu
//                     </ReactRouterDOM.Link>
//                 </div>
//             </section>

//             <section>
//                 <h2 className="text-3xl font-bold text-center mb-2">How It Works</h2>
//                 <p className="text-center text-gray-500 mb-10">Simple steps to get your delicious meal.</p>
//                 <div className="grid md:grid-cols-3 gap-8">
//                     <HowItWorksCard
//                         number="01."
//                         title="Browse Our Menu"
//                         description="Explore our diverse range of dishes and packages for any event."
//                         icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>}
//                     />
//                     <HowItWorksCard
//                         number="02."
//                         title="Place Your Order"
//                         description="Add your favorites to the cart and securely check out in minutes."
//                         icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
//                     />
//                     <HowItWorksCard
//                         number="03."
//                         title="Enjoy Your Meal"
//                         description="We prepare and deliver your order fresh and on time. Bon appétit!"
//                         icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.085a2 2 0 00-1.736.986L7 6" /></svg>}
//                     />
//                 </div>
//             </section>
            
//             <section>
//                 <h2 className="text-3xl font-bold text-center mb-8">Featured Items</h2>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//                     {featuredItems.map(item => (
//                         <MenuItemCard key={item.id} item={item} />
//                     ))}
//                 </div>
//             </section>

//             {currentUser && currentUser.role === UserRole.CUSTOMER && (
//                 <section className="relative bg-gradient-to-br from-teal-50 to-cyan-100 p-8 md:p-12 rounded-2xl shadow-xl overflow-hidden">
//                     <div className="absolute -top-10 -right-10 w-48 h-48 bg-teal-200/50 rounded-full blur-2xl"></div>
//                     <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cyan-200/50 rounded-full blur-2xl"></div>
//                     <div className="relative z-10">
//                         {/* Meal Planner Form */}
//                         <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-3">AI Meal Planner 🤖</h2>
//                         <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">Tell us your budget, and our smart assistant will curate a personalized meal plan based on your unique tastes.</p>
//                         <div className="max-w-xl mx-auto bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/50">
//                             <form onSubmit={handleGeneratePlan} className="flex flex-col sm:flex-row items-center gap-4">
//                                 <div className="relative flex-grow w-full">
//                                     <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 text-lg">PKR</span>
//                                     <input
//                                         type="number"
//                                         value={budget}
//                                         onChange={(e) => { setBudget(e.target.value); setPlanGenerated(false); }}
//                                         placeholder="Enter your budget (e.g., 5000)"
//                                         min="10"
//                                         step="1"
//                                         required
//                                         className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
//                                         aria-label="Budget for meal plan"
//                                     />
//                                 </div>
//                                 <button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-teal-700 disabled:bg-teal-400 disabled:cursor-wait transition-transform hover:scale-105 flex items-center justify-center gap-2">
//                                     {isLoading ? <>Generating...</> : <>Generate Plan</>}
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 </section>
//             )}

//         </div>
//     );
// };

// export default HomePage;





// import React, { useState } from 'react';
// import * as ReactRouterDOM from 'react-router-dom';
// import { useAppContext } from '../context/AppContext';
// import MenuItemCard from '../components/MenuItemCard';

// // Frontend JS ke liye manually define UserRole
// const UserRole = {
//     ADMIN: 'ADMIN',
//     CATERER: 'CATERER',
//     CUSTOMER: 'CUSTOMER'
// };

// const HowItWorksCard = ({ number, title, description, icon }) => (
//     <div className="text-center p-6 rounded-lg shadow-md border" style={{ backgroundColor: '#FFFFFF', borderColor: '#123458' }}>
//         <div className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(18, 52, 88, 0.1)', color: '#123458' }}>
//             {icon}
//         </div>
//         <h3 className="text-xl font-bold mb-2">
//             <span style={{ color: '#123458' }}>{number}</span> 
//             <span style={{ color: '#030303' }}> {title}</span>
//         </h3>
//         <p style={{ color: '#666666' }}>{description}</p>
//     </div>
// );

// const TestimonialCard = ({ quote, author, role }) => (
//     <div className="p-8 rounded-lg shadow-lg text-center border" style={{ backgroundColor: '#FFFFFF', borderColor: '#123458' }}>
//         <p className="italic text-lg mb-4" style={{ color: '#666666' }}>"{quote}"</p>
//         <p className="font-bold" style={{ color: '#123458' }}>{author}</p>
//         <p className="text-sm" style={{ color: '#999999' }}>{role}</p>
//     </div>
// );

// const HomePage = () => {
//     const { menuItems, currentUser, mealPlan, generateMealPlan, clearMealPlan, isLoading, addToCart } = useAppContext();
//     const [budget, setBudget] = useState('');
//     const [planGenerated, setPlanGenerated] = useState(false);
    
//     const featuredItems = menuItems.slice(0, 4);

//     const handleGeneratePlan = (e) => {
//         e.preventDefault();
//         const budgetValue = parseFloat(budget);
//         if (!budgetValue || budgetValue <= 0) return;
//         clearMealPlan();
//         generateMealPlan(budgetValue);
//         setPlanGenerated(true);
//     };

//     const handleAddPlanToCart = () => {
//         mealPlan.forEach(item => addToCart(item));
//         alert('Meal plan added to your cart!');
//     };

//     const mealPlanTotal = mealPlan.reduce((total, item) => total + item.price, 0);

//     return (
//         <div className="space-y-16">
//             <section className="relative text-center py-20 px-4 rounded-lg shadow-lg overflow-hidden border" style={{ backgroundColor: '#FFFFFF', borderColor: '#123458' }}>
//                 <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/catering-event/1200/400')" }}></div>
//                 <div className="absolute inset-0" style={{ backgroundColor: 'rgba(3, 3, 3, 0.5)' }}></div>
//                 <div className="relative z-10">
//                     <h1 className="text-5xl font-extrabold text-white mb-4">Exquisite Catering for Every Occasion</h1>
//                     <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">From corporate events to intimate gatherings, we deliver unforgettable culinary experiences.</p>
//                     <ReactRouterDOM.Link 
//                         to="/menu" 
//                         className="px-8 py-3 rounded-full font-semibold text-lg hover:opacity-90 transition-transform hover:scale-105 inline-block"
//                         style={{ backgroundColor: '#123458', color: 'white' }}
//                     >
//                         View Full Menu
//                     </ReactRouterDOM.Link>
//                 </div>
//             </section>

//             <section>
//                 <h2 className="text-3xl font-bold text-center mb-2" style={{ color: '#030303' }}>How It Works</h2>
//                 <p className="text-center mb-10" style={{ color: '#666666' }}>Simple steps to get your delicious meal.</p>
//                 <div className="grid md:grid-cols-3 gap-8">
//                     <HowItWorksCard
//                         number="01."
//                         title="Browse Our Menu"
//                         description="Explore our diverse range of dishes and packages for any event."
//                         icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>}
//                     />
//                     <HowItWorksCard
//                         number="02."
//                         title="Place Your Order"
//                         description="Add your favorites to the cart and securely check out in minutes."
//                         icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
//                     />
//                     <HowItWorksCard
//                         number="03."
//                         title="Enjoy Your Meal"
//                         description="We prepare and deliver your order fresh and on time. Bon appétit!"
//                         icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.085a2 2 0 00-1.736.986L7 6" /></svg>}
//                     />
//                 </div>
//             </section>
            
//             <section>
//                 <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#030303' }}>Featured Items</h2>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//                     {featuredItems.map(item => (
//                         <MenuItemCard key={item.id} item={item} />
//                     ))}
//                 </div>
//             </section>

//             {currentUser && currentUser.role === UserRole.CUSTOMER && (
//                 <section className="relative p-8 md:p-12 rounded-2xl shadow-xl overflow-hidden border" style={{ backgroundColor: '#FFFFFF', borderColor: '#123458' }}>
//                     <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-2xl" style={{ backgroundColor: 'rgba(18, 52, 88, 0.1)' }}></div>
//                     <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full blur-2xl" style={{ backgroundColor: 'rgba(18, 52, 88, 0.1)' }}></div>
//                     <div className="relative z-10">
//                         {/* Meal Planner Form */}
//                         <h2 className="text-4xl font-extrabold text-center mb-3" style={{ color: '#030303' }}>AI Meal Planner 🤖</h2>
//                         <p className="text-center mb-10 max-w-2xl mx-auto" style={{ color: '#666666' }}>Tell us your budget, and our smart assistant will curate a personalized meal plan based on your unique tastes.</p>
//                         <div className="max-w-xl mx-auto p-6 rounded-xl shadow-lg border" style={{ backgroundColor: '#F8FAFC', borderColor: '#123458' }}>
//                             <form onSubmit={handleGeneratePlan} className="flex flex-col sm:flex-row items-center gap-4">
//                                 <div className="relative flex-grow w-full">
//                                     <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-lg" style={{ color: '#666666' }}>PKR</span>
//                                     <input
//                                         type="number"
//                                         value={budget}
//                                         onChange={(e) => { setBudget(e.target.value); setPlanGenerated(false); }}
//                                         placeholder="Enter your budget (e.g., 5000)"
//                                         min="10"
//                                         step="1"
//                                         required
//                                         className="w-full pl-12 pr-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 text-lg"
//                                         style={{ borderColor: '#123458', color: '#030303', backgroundColor: '#FFFFFF' }}
//                                         aria-label="Budget for meal plan"
//                                     />
//                                 </div>
//                                 <button 
//                                     type="submit" 
//                                     disabled={isLoading} 
//                                     className="w-full sm:w-auto px-8 py-3 rounded-lg font-semibold text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-wait transition-transform hover:scale-105 flex items-center justify-center gap-2"
//                                     style={{ backgroundColor: '#123458', color: 'white' }}
//                                 >
//                                     {isLoading ? <>Generating...</> : <>Generate Plan</>}
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 </section>
//             )}

//         </div>
//     );
// };

// export default HomePage;












import React, { useState } from "react";
import * as ReactRouterDOM from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import MenuItemCard from "../components/MenuItemCard";

// Frontend JS ke liye manually define UserRole
const UserRole = {
  ADMIN: "ADMIN",
  CATERER: "CATERER",
  CUSTOMER: "CUSTOMER",
};

const HowItWorksCard = ({ number, title, description, icon }) => (
  <div className="text-center p-8 rounded-2xl shadow-xl border-2 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl bg-white/80 backdrop-blur-sm border-[#123458]">
    <div className="mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform bg-[#123458]/10 text-[#123458]">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4 text-[#123458]">
      {number} <span className="text-black">{title}</span>
    </h3>
    <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const HomePage = () => {
  const {
    menuItems,
    currentUser,
    mealPlan,
    generateMealPlan,
    clearMealPlan,
    isLoading,
    addToCart,
  } = useAppContext();
  const [budget, setBudget] = useState("");
  const [planGenerated, setPlanGenerated] = useState(false);

  // ✅ HD food images (guaranteed to load)
  const foodImages = [
    "https://images.unsplash.com/photo-1761545832779-bc0b4290fc5e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA4fHxzcGFnaGV0dGklMjBjYXJib25hcmF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",

    "https://plus.unsplash.com/premium_photo-1668095398227-c943ddb69d89?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fEJydXNjaGV0dGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",

    "https://images.unsplash.com/photo-1595587870672-c79b47875c6a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2FwcmVzZSUyMFNhbGFkfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",

    "https://plus.unsplash.com/premium_photo-1695028378225-97fbe39df62a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VGlyYW1pc3V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",

    "https://plus.unsplash.com/premium_photo-1713551474564-c3916a5eb3bf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UGFubmElMjBDb3R0YXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",

    "https://images.unsplash.com/photo-1577308873518-7fd772788ec6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEZhbWlseSUyMEZlYXN0JTIwUGFja2FnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",

    "https://plus.unsplash.com/premium_photo-1670426500867-519c487c744d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQ1fHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600",
  ];

  const featuredItems = menuItems.slice(0, 8).map((item, index) => ({
    ...item,
    premiumImage: `${foodImages[index]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
  }));

  const handleGeneratePlan = (e) => {
    e.preventDefault();
    const budgetValue = parseFloat(budget);
    if (!budgetValue || budgetValue <= 0) return;
    clearMealPlan();
    generateMealPlan(budgetValue);
    setPlanGenerated(true);
  };

  return (
    <div className="space-y-20">
      {/* 🌟 Hero Section */}
      <section className="relative text-center py-40 px-6 rounded-3xl shadow-2xl overflow-hidden border-4 border-[#123458]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1543353071-087092ec393a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-white">
          <h1 className="text-6xl font-black mb-6 leading-tight">
            Exquisite Catering for{" "}
            <span className="text-[#facc15]">Every Occasion</span>
          </h1>
          <p className="text-2xl text-gray-200 mb-10 leading-relaxed">
            From corporate events to intimate gatherings, enjoy unforgettable
            culinary experiences crafted with passion.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <ReactRouterDOM.Link
              to="/menu"
              className="px-10 py-4 rounded-full font-bold text-xl bg-[#123458] text-white hover:bg-[#0e2741] shadow-lg transform hover:scale-110 transition"
            >
              View Full Menu
            </ReactRouterDOM.Link>
            <ReactRouterDOM.Link
              to="/about"
              className="px-10 py-4 rounded-full font-bold text-xl border-2 border-white text-white hover:bg-white hover:text-[#123458] transition"
            >
              Learn More
            </ReactRouterDOM.Link>
          </div>
        </div>
      </section>

      {/* ⚙️ How It Works */}
      <section className="py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-4 text-[#030303]">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The simplest way to get premium catering — only three delicious
            steps away.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <HowItWorksCard
            number="01."
            title="Browse & Select"
            description="Explore a wide menu of gourmet dishes from top caterers. Filter by cuisine or event type."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            }
          />
          <HowItWorksCard
            number="02."
            title="Customize & Order"
            description="Add your favorites, adjust portions, and checkout securely with instant confirmation."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M17 17a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
            }
          />
          <HowItWorksCard
            number="03."
            title="Enjoy & Celebrate"
            description="We prepare with fresh ingredients and deliver on time. Sit back and savor the moment!"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017L7 20"
                />
              </svg>
            }
          />
        </div>
      </section>

      {/* 🍽️ Featured Delicacies */}
      <section className="py-16 bg-gradient-to-b from-white to-[#f8fafc]">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-4 text-[#030303]">
            Featured Delicacies
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked favorites from our premium menu — crafted to perfection.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {featuredItems.map((item) => (
            <div
              key={item.id}
              className="transform hover:scale-105 transition-all duration-300"
            >
              <MenuItemCard item={{ ...item, imageUrl: item.premiumImage }} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <ReactRouterDOM.Link
            to="/menu"
            className="px-12 py-4 rounded-full font-bold text-lg border-2 border-[#123458] text-[#123458] hover:bg-[#123458] hover:text-white transition"
          >
            View All Menu Items →
          </ReactRouterDOM.Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
