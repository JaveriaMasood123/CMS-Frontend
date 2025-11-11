// import React from 'react';
// import * as ReactRouterDOM from 'react-router-dom';

// const OrderTrackingPage = () => {
//     return (
//         <div className="text-center bg-white p-12 rounded-lg shadow-lg">
//             <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Tracking</h1>
//             <p className="text-gray-600 mb-8">This feature is coming soon!</p>
//             <ReactRouterDOM.Link to="/" className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700">
//                 Go to Homepage
//             </ReactRouterDOM.Link>
//         </div>
//     );
// };

// export default OrderTrackingPage;




import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

const OrderTrackingPage = () => {
    return (
        <div className="text-center p-12 rounded-lg shadow-lg border" style={{ backgroundColor: '#FFFFFF', borderColor: '#123458' }}>
            <h1 className="text-3xl font-bold mb-4" style={{ color: '#030303' }}>Order Tracking</h1>
            <p className="mb-8" style={{ color: '#666666' }}>This feature is coming soon!</p>
            <ReactRouterDOM.Link 
                to="/" 
                className="px-6 py-2 rounded-md hover:opacity-90 transition-opacity font-semibold"
                style={{ backgroundColor: '#123458', color: 'white' }}
            >
                Go to Homepage
            </ReactRouterDOM.Link>
        </div>
    );
};

export default OrderTrackingPage;