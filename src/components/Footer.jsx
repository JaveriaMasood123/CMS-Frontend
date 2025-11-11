// import React from 'react';
// import { Link } from 'react-router-dom';

// const Footer = () => {
//     return (
//         <footer className="bg-gray-800 text-white mt-auto print:hidden">
//             <div className="container mx-auto py-8 px-4">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
//                     <div>
//                         <h3 className="text-lg font-semibold mb-4">GourmetGo</h3>
//                         <p className="text-gray-400">Exquisite catering for every occasion.</p>
//                     </div>
//                     <div>
//                         <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//                         <ul className="space-y-2">
//                             <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
//                             <li><Link to="/menu" className="text-gray-400 hover:text-white">Menu</Link></li>
//                             <li><Link to="/orders" className="text-gray-400 hover:text-white">My Orders</Link></li>
//                         </ul>
//                     </div>
//                      <div>
//                         <h3 className="text-lg font-semibold mb-4">For Partners</h3>
//                         <ul className="space-y-2">
//                             <li><Link to="/caterer/register" className="text-gray-400 hover:text-white">Become a Partner</Link></li>
//                             <li><Link to="/admin/login" className="text-gray-400 hover:text-white">Admin Portal</Link></li>
//                         </ul>
//                     </div>
//                 </div>
//                 <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-500">
//                     <p>&copy; {new Date().getFullYear()} GourmetGo Catering. All Rights Reserved.</p>
//                 </div>
//             </div>
//         </footer>
//     );
// };

// export default Footer;





import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer 
            className="mt-auto print:hidden"
            style={{ backgroundColor: '#030303', borderTop: '4px solid #123458' }}
        >
            <div className="container mx-auto py-12 px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 
                            className="text-2xl font-bold"
                            style={{ color: '#123458' }}
                        >
                            GourmetGo
                        </h3>
                        <p style={{ color: '#E0E0E0' }} className="leading-relaxed">
                            Exquisite catering for every occasion. Premium experiences in every bite.
                        </p>
                        <div className="flex justify-center md:justify-start space-x-3">
                            <div 
                                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:opacity-90"
                                style={{ backgroundColor: '#123458' }}
                            >
                                <span className="text-white font-bold text-sm">★</span>
                            </div>
                            <div 
                                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:opacity-90"
                                style={{ backgroundColor: '#123458' }}
                            >
                                <span className="text-white font-bold text-sm">✓</span>
                            </div>
                            <div 
                                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:opacity-90"
                                style={{ backgroundColor: '#123458' }}
                            >
                                <span className="text-white font-bold text-sm">♕</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 
                            className="text-xl font-semibold mb-6 pb-2 inline-block"
                            style={{ color: '#123458', borderBottom: '2px solid #123458' }}
                        >
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link 
                                    to="/" 
                                    className="transition-all duration-300 hover:translate-x-2 hover:font-medium block"
                                    style={{ color: '#B0B0B0' }}
                                    onMouseOver={(e) => e.target.style.color = '#123458'}
                                    onMouseOut={(e) => e.target.style.color = '#B0B0B0'}
                                >
                                    🏠 Home
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/menu" 
                                    className="transition-all duration-300 hover:translate-x-2 hover:font-medium block"
                                    style={{ color: '#B0B0B0' }}
                                    onMouseOver={(e) => e.target.style.color = '#123458'}
                                    onMouseOut={(e) => e.target.style.color = '#B0B0B0'}
                                >
                                    📋 Menu
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/orders" 
                                    className="transition-all duration-300 hover:translate-x-2 hover:font-medium block"
                                    style={{ color: '#B0B0B0' }}
                                    onMouseOver={(e) => e.target.style.color = '#123458'}
                                    onMouseOut={(e) => e.target.style.color = '#B0B0B0'}
                                >
                                    📦 My Orders
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* For Partners */}
                    <div>
                        <h3 
                            className="text-xl font-semibold mb-6 pb-2 inline-block"
                            style={{ color: '#123458', borderBottom: '2px solid #123458' }}
                        >
                            For Partners
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link 
                                    to="/caterer/register" 
                                    className="transition-all duration-300 hover:translate-x-2 hover:font-medium block"
                                    style={{ color: '#B0B0B0' }}
                                    onMouseOver={(e) => e.target.style.color = '#123458'}
                                    onMouseOut={(e) => e.target.style.color = '#B0B0B0'}
                                >
                                    🤝 Become a Partner
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/admin/login" 
                                    className="transition-all duration-300 hover:translate-x-2 hover:font-medium block"
                                    style={{ color: '#B0B0B0' }}
                                    onMouseOver={(e) => e.target.style.color = '#123458'}
                                    onMouseOut={(e) => e.target.style.color = '#B0B0B0'}
                                >
                                    ⚙️ Admin Portal
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div 
                    className="mt-12 pt-8 text-center"
                    style={{ borderTop: '1px solid #1A1A1A' }}
                >
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p style={{ color: '#666666' }} className="text-sm">
                            &copy; {new Date().getFullYear()} GourmetGo Catering. All Rights Reserved.
                        </p>
                        <div className="flex space-x-6 text-sm">
                            <span style={{ color: '#123458' }} className="font-semibold">Premium Catering</span>
                            <span style={{ color: '#333333' }}>|</span>
                            <span style={{ color: '#123458' }} className="font-semibold">Luxury Experience</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;