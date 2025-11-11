// import React from 'react';

// const Spinner = () => (
//     <div className="flex justify-center items-center p-4">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
//     </div>
// );

// export default Spinner;



import React from 'react';

const Spinner = () => (
    <div className="flex justify-center items-center p-4">
        <div 
            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
            style={{ borderColor: '#123458' }}
        ></div>
    </div>
);

export default Spinner;