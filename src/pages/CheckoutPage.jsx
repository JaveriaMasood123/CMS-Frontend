// import React, { useState, useEffect } from 'react';
// import * as ReactRouterDOM from 'react-router-dom';
// import { useAppContext } from '../context/AppContext';

// const CheckoutPage = () => {
//     const { cart, cartTotal, placeOrder, currentUser } = useAppContext();
//     const navigate = ReactRouterDOM.useNavigate();

//     const [isProcessing, setIsProcessing] = useState(false);
//     const [paymentError, setPaymentError] = useState('');
//     const [formData, setFormData] = useState({
//         name: currentUser?.name || '',
//         address: '',
//         city: '',
//         zip: '',
//         phone: '',
//         paymentMethod: 'credit-card',
//         jazzcashNumber: '',
//         jazzcashCNIC: '',
//     });
//     const [paymentDetails, setPaymentDetails] = useState({
//         cardNumber: '',
//         expiry: '',
//         cvv: '',
//     });
//     const [errors, setErrors] = useState({});

//     useEffect(() => {
//         if (cart.length === 0) {
//             navigate('/menu');
//         }
//     }, [cart, navigate]);

//     const handleFormChange = (e) => {
//         setPaymentError('');
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//         if (errors[name]) setErrors({ ...errors, [name]: '' });
//     };

//     const handlePaymentDetailsChange = (e) => {
//         setPaymentError('');
//         const { name, value } = e.target;
//         setPaymentDetails({ ...paymentDetails, [name]: value });
//         if (errors[name]) setErrors({ ...errors, [name]: '' });
//     };

//     const validate = () => {
//         const newErrors = {};
//         let isValid = true;

//         if (!formData.name) { newErrors.name = 'Full name is required'; isValid = false; }
//         if (!formData.address) { newErrors.address = 'Address is required'; isValid = false; }
//         if (!formData.city) { newErrors.city = 'City is required'; isValid = false; }
//         if (!/^\d{5,6}$/.test(formData.zip)) { newErrors.zip = 'Enter a valid ZIP code'; isValid = false; }
//         if (!/^\d{10,15}$/.test(formData.phone)) { newErrors.phone = 'Enter a valid phone number'; isValid = false; }

//         if (formData.paymentMethod === 'credit-card') {
//             if (!/^\d{16}$/.test(paymentDetails.cardNumber.replace(/\s/g, ''))) {
//                 newErrors.cardNumber = 'Card number must be 16 digits'; isValid = false;
//             }
//             if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(paymentDetails.expiry)) {
//                 newErrors.expiry = 'Expiry must be MM/YY'; isValid = false;
//             } else {
//                 const [month, year] = paymentDetails.expiry.split('/');
//                 const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1, 1);
//                 if (expiryDate <= new Date()) {
//                     newErrors.expiry = 'Card is expired'; isValid = false;
//                 }
//             }
//             if (!/^\d{3,4}$/.test(paymentDetails.cvv)) {
//                 newErrors.cvv = 'CVV must be 3 or 4 digits'; isValid = false;
//             }
//         } else if (formData.paymentMethod === 'jazzcash') {
//             if (!/^03\d{9}$/.test(formData.jazzcashNumber)) {
//                 newErrors.jazzcashNumber = 'Enter a valid 11-digit JazzCash number'; isValid = false;
//             }
//             if (!/^\d{6}$/.test(formData.jazzcashCNIC)) {
//                 newErrors.jazzcashCNIC = 'Enter last 6 digits of CNIC'; isValid = false;
//             }
//         }

//         setErrors(newErrors);
//         return isValid;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setPaymentError('');
//         if (!validate()) return;

//         setIsProcessing(true);

//         const paymentInfo = {
//             method: formData.paymentMethod,
//             cardNumber: paymentDetails.cardNumber,
//             jazzcashNumber: formData.jazzcashNumber,
//             jazzcashCNIC: formData.jazzcashCNIC,
//         };

//         // Simulate small delay for UX
//         setTimeout(async () => {
//             const result = await placeOrder(paymentInfo);
//             if (result.success && result.order) {
//                 navigate(`/order-confirmation/${result.order.id}`);
//             } else {
//                 setPaymentError(result.error || "An unknown error occurred. Please try again.");
//                 setIsProcessing(false);
//             }
//         }, 500);
//     };

//     return (
//         <div className="bg-white p-8 rounded-lg shadow-lg max-w-6xl mx-auto">
//             <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
//             <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
//                 {/* Left: Form */}
//                 <form onSubmit={handleSubmit} className="space-y-8">
//                     <div className="space-y-4">
//                         <h2 className="text-xl font-semibold border-b pb-2">Delivery Address</h2>
//                         <div>
//                             <label>Name</label>
//                             <input type="text" name="name" value={formData.name} onChange={handleFormChange} className="mt-1 block w-full border p-2 rounded-md" />
//                             {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
//                         </div>
//                         <div>
//                             <label>Address</label>
//                             <input type="text" name="address" value={formData.address} onChange={handleFormChange} className="mt-1 block w-full border p-2 rounded-md" />
//                             {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
//                         </div>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                             <div>
//                                 <label>City</label>
//                                 <input type="text" name="city" value={formData.city} onChange={handleFormChange} className="mt-1 block w-full border p-2 rounded-md" />
//                                 {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
//                             </div>
//                             <div>
//                                 <label>ZIP</label>
//                                 <input type="text" name="zip" value={formData.zip} onChange={handleFormChange} className="mt-1 block w-full border p-2 rounded-md" />
//                                 {errors.zip && <p className="text-red-500 text-xs">{errors.zip}</p>}
//                             </div>
//                         </div>
//                         <div>
//                             <label>Phone</label>
//                             <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} className="mt-1 block w-full border p-2 rounded-md" />
//                             {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
//                         </div>
//                     </div>

//                     {/* Payment */}
//                     <div className="space-y-4">
//                         <h2 className="text-xl font-semibold border-b pb-2">Payment Method</h2>
//                         <label className="flex items-center p-3 border rounded-md cursor-pointer">
//                             <input type="radio" name="paymentMethod" value="credit-card" checked={formData.paymentMethod === 'credit-card'} onChange={handleFormChange} />
//                             <span className="ml-2">Credit Card</span>
//                         </label>
//                         {formData.paymentMethod === 'credit-card' && (
//                             <div className="p-4 border rounded-md bg-gray-50 space-y-2">
//                                 <input type="text" name="cardNumber" placeholder="Card Number" value={paymentDetails.cardNumber} onChange={handlePaymentDetailsChange} className="w-full border p-2 rounded-md" />
//                                 {errors.cardNumber && <p className="text-red-500 text-xs">{errors.cardNumber}</p>}
//                                 <div className="flex gap-2">
//                                     <input type="text" name="expiry" placeholder="MM/YY" value={paymentDetails.expiry} onChange={handlePaymentDetailsChange} className="flex-1 border p-2 rounded-md" />
//                                     <input type="text" name="cvv" placeholder="CVV" value={paymentDetails.cvv} onChange={handlePaymentDetailsChange} className="flex-1 border p-2 rounded-md" />
//                                 </div>
//                                 {(errors.expiry || errors.cvv) && (
//                                     <p className="text-red-500 text-xs">{errors.expiry || errors.cvv}</p>
//                                 )}
//                             </div>
//                         )}
//                         <label className="flex items-center p-3 border rounded-md cursor-pointer">
//                             <input type="radio" name="paymentMethod" value="jazzcash" checked={formData.paymentMethod === 'jazzcash'} onChange={handleFormChange} />
//                             <span className="ml-2">JazzCash</span>
//                         </label>
//                         {formData.paymentMethod === 'jazzcash' && (
//                             <div className="p-4 border rounded-md bg-gray-50 space-y-2">
//                                 <input type="tel" name="jazzcashNumber" placeholder="JazzCash Number" value={formData.jazzcashNumber} onChange={handleFormChange} className="w-full border p-2 rounded-md" />
//                                 {errors.jazzcashNumber && <p className="text-red-500 text-xs">{errors.jazzcashNumber}</p>}
//                                 <input type="text" name="jazzcashCNIC" placeholder="Last 6 digits of CNIC" value={formData.jazzcashCNIC} onChange={handleFormChange} maxLength={6} className="w-full border p-2 rounded-md" />
//                                 {errors.jazzcashCNIC && <p className="text-red-500 text-xs">{errors.jazzcashCNIC}</p>}
//                             </div>
//                         )}
//                     </div>

//                     {paymentError && <p className="text-red-500 text-center">{paymentError}</p>}

//                     <button type="submit" disabled={isProcessing} className="w-full bg-green-500 text-white p-3 rounded-md">
//                         {isProcessing ? 'Processing...' : `Place Order - PKR ${(cartTotal + 250).toFixed(2)}`}
//                     </button>

//                     <ReactRouterDOM.Link to="/cart" className="block text-teal-600 text-center mt-2">&larr; Back to Cart</ReactRouterDOM.Link>
//                 </form>

//                 {/* Right: Summary */}
//                 <div className="lg:sticky lg:top-24 mt-8 lg:mt-0">
//                     <div className="p-6 bg-gray-50 rounded-lg border">
//                         <h3 className="text-xl font-semibold mb-4 border-b pb-2">Order Summary</h3>
//                         <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
//                             {cart.map(({ item, quantity }) => (
//                                 <div key={item.id} className="flex justify-between items-center">
//                                     <div className="flex gap-3 items-center">
//                                         <img src={item.imageUrl} alt={item.name} className="w-14 h-14 rounded-md object-cover" />
//                                         <div>
//                                             <p className="font-semibold text-sm">{item.name}</p>
//                                             <p className="text-xs text-gray-500">Qty: {quantity}</p>
//                                         </div>
//                                     </div>
//                                     <p className="font-medium text-sm">PKR {(item.price * quantity).toFixed(2)}</p>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="mt-4 border-t pt-4 space-y-2">
//                             <div className="flex justify-between text-gray-600">
//                                 <span>Subtotal</span>
//                                 <span>PKR {cartTotal.toFixed(2)}</span>
//                             </div>
//                             <div className="flex justify-between text-gray-600">
//                                 <span>Shipping</span>
//                                 <span>PKR 250.00</span>
//                             </div>
//                             <div className="flex justify-between font-bold text-xl border-t pt-2">
//                                 <span>Total</span>
//                                 <span>PKR {(cartTotal + 250).toFixed(2)}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CheckoutPage;





import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const CheckoutPage = () => {
    const { cart, cartTotal, placeOrder, currentUser } = useAppContext();
    const navigate = ReactRouterDOM.useNavigate();

    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState('');
    const [formData, setFormData] = useState({
        name: currentUser?.name || '',
        address: '',
        city: '',
        zip: '',
        phone: '',
        paymentMethod: 'credit-card',
        jazzcashNumber: '',
        jazzcashCNIC: '',
    });
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiry: '',
        cvv: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (cart.length === 0) {
            navigate('/menu');
        }
    }, [cart, navigate]);

    const handleFormChange = (e) => {
        setPaymentError('');
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
    };

    const handlePaymentDetailsChange = (e) => {
        setPaymentError('');
        const { name, value } = e.target;
        setPaymentDetails({ ...paymentDetails, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
    };

    const validate = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.name) { newErrors.name = 'Full name is required'; isValid = false; }
        if (!formData.address) { newErrors.address = 'Address is required'; isValid = false; }
        if (!formData.city) { newErrors.city = 'City is required'; isValid = false; }
        if (!/^\d{5,6}$/.test(formData.zip)) { newErrors.zip = 'Enter a valid ZIP code'; isValid = false; }
        if (!/^\d{10,15}$/.test(formData.phone)) { newErrors.phone = 'Enter a valid phone number'; isValid = false; }

        if (formData.paymentMethod === 'credit-card') {
            if (!/^\d{16}$/.test(paymentDetails.cardNumber.replace(/\s/g, ''))) {
                newErrors.cardNumber = 'Card number must be 16 digits'; isValid = false;
            }
            if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(paymentDetails.expiry)) {
                newErrors.expiry = 'Expiry must be MM/YY'; isValid = false;
            } else {
                const [month, year] = paymentDetails.expiry.split('/');
                const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1, 1);
                if (expiryDate <= new Date()) {
                    newErrors.expiry = 'Card is expired'; isValid = false;
                }
            }
            if (!/^\d{3,4}$/.test(paymentDetails.cvv)) {
                newErrors.cvv = 'CVV must be 3 or 4 digits'; isValid = false;
            }
        } else if (formData.paymentMethod === 'jazzcash') {
            if (!/^03\d{9}$/.test(formData.jazzcashNumber)) {
                newErrors.jazzcashNumber = 'Enter a valid 11-digit JazzCash number'; isValid = false;
            }
            if (!/^\d{6}$/.test(formData.jazzcashCNIC)) {
                newErrors.jazzcashCNIC = 'Enter last 6 digits of CNIC'; isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPaymentError('');
        if (!validate()) return;

        setIsProcessing(true);

        const paymentInfo = {
            method: formData.paymentMethod,
            cardNumber: paymentDetails.cardNumber,
            jazzcashNumber: formData.jazzcashNumber,
            jazzcashCNIC: formData.jazzcashCNIC,
        };

        // Simulate small delay for UX
        setTimeout(async () => {
            const result = await placeOrder(paymentInfo);
            if (result.success && result.order) {
                navigate(`/order-confirmation/${result.order.id}`);
            } else {
                setPaymentError(result.error || "An unknown error occurred. Please try again.");
                setIsProcessing(false);
            }
        }, 500);
    };

    return (
        <div className="p-8 rounded-lg shadow-lg max-w-6xl mx-auto border" style={{ backgroundColor: '#FFFFFF', borderColor: '#123458' }}>
            <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: '#030303' }}>Checkout</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
                {/* Left: Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold border-b pb-2" style={{ color: '#030303', borderColor: '#123458' }}>Delivery Address</h2>
                        <div>
                            <label style={{ color: '#030303' }}>Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleFormChange} 
                                className="mt-1 block w-full p-2 rounded-md" 
                                style={{ borderColor: '#123458', color: '#030303', backgroundColor: '#FFFFFF' }}
                            />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                        </div>
                        <div>
                            <label style={{ color: '#030303' }}>Address</label>
                            <input 
                                type="text" 
                                name="address" 
                                value={formData.address} 
                                onChange={handleFormChange} 
                                className="mt-1 block w-full p-2 rounded-md" 
                                style={{ borderColor: '#123458', color: '#030303', backgroundColor: '#FFFFFF' }}
                            />
                            {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label style={{ color: '#030303' }}>City</label>
                                <input 
                                    type="text" 
                                    name="city" 
                                    value={formData.city} 
                                    onChange={handleFormChange} 
                                    className="mt-1 block w-full p-2 rounded-md" 
                                    style={{ borderColor: '#123458', color: '#030303', backgroundColor: '#FFFFFF' }}
                                />
                                {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
                            </div>
                            <div>
                                <label style={{ color: '#030303' }}>ZIP</label>
                                <input 
                                    type="text" 
                                    name="zip" 
                                    value={formData.zip} 
                                    onChange={handleFormChange} 
                                    className="mt-1 block w-full p-2 rounded-md" 
                                    style={{ borderColor: '#123458', color: '#030303', backgroundColor: '#FFFFFF' }}
                                />
                                {errors.zip && <p className="text-red-500 text-xs">{errors.zip}</p>}
                            </div>
                        </div>
                        <div>
                            <label style={{ color: '#030303' }}>Phone</label>
                            <input 
                                type="tel" 
                                name="phone" 
                                value={formData.phone} 
                                onChange={handleFormChange} 
                                className="mt-1 block w-full p-2 rounded-md" 
                                style={{ borderColor: '#123458', color: '#030303', backgroundColor: '#FFFFFF' }}
                            />
                            {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                        </div>
                    </div>

                    {/* Payment */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold border-b pb-2" style={{ color: '#030303', borderColor: '#123458' }}>Payment Method</h2>
                        <label className="flex items-center p-3 border rounded-md cursor-pointer" style={{ borderColor: '#123458' }}>
                            <input type="radio" name="paymentMethod" value="credit-card" checked={formData.paymentMethod === 'credit-card'} onChange={handleFormChange} />
                            <span className="ml-2" style={{ color: '#030303' }}>Credit Card</span>
                        </label>
                        {formData.paymentMethod === 'credit-card' && (
                            <div className="p-4 border rounded-md space-y-2" style={{ borderColor: '#123458', backgroundColor: '#F8FAFC' }}>
                                <input 
                                    type="text" 
                                    name="cardNumber" 
                                    placeholder="Card Number" 
                                    value={paymentDetails.cardNumber} 
                                    onChange={handlePaymentDetailsChange} 
                                    className="w-full p-2 rounded-md" 
                                    style={{ borderColor: '#123458', color: '#030303', backgroundColor: '#FFFFFF' }}
                                />
                                {errors.cardNumber && <p className="text-red-500 text-xs">{errors.cardNumber}</p>}
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        name="expiry" 
                                        placeholder="MM/YY" 
                                        value={paymentDetails.expiry} 
                                        onChange={handlePaymentDetailsChange} 
                                        className="flex-1 p-2 rounded-md" 
                                        style={{ borderColor: '#123458', color: '#030303', backgroundColor: '#FFFFFF' }}
                                    />
                                    <input 
                                        type="text" 
                                        name="cvv" 
                                        placeholder="CVV" 
                                        value={paymentDetails.cvv} 
                                        onChange={handlePaymentDetailsChange} 
                                        className="flex-1 p-2 rounded-md" 
                                        style={{ borderColor: '#123458', color: '#030303', backgroundColor: '#FFFFFF' }}
                                    />
                                </div>
                                {(errors.expiry || errors.cvv) && (
                                    <p className="text-red-500 text-xs">{errors.expiry || errors.cvv}</p>
                                )}
                            </div>
                        )}
                        <label className="flex items-center p-3 border rounded-md cursor-pointer" style={{ borderColor: '#123458' }}>
                            <input type="radio" name="paymentMethod" value="jazzcash" checked={formData.paymentMethod === 'jazzcash'} onChange={handleFormChange} />
                            <span className="ml-2" style={{ color: '#030303' }}>JazzCash</span>
                        </label>
                        {formData.paymentMethod === 'jazzcash' && (
                            <div className="p-4 border rounded-md space-y-2" style={{ borderColor: '#123458', backgroundColor: '#F8FAFC' }}>
                                <input 
                                    type="tel" 
                                    name="jazzcashNumber" 
                                    placeholder="JazzCash Number" 
                                    value={formData.jazzcashNumber} 
                                    onChange={handleFormChange} 
                                    className="w-full p-2 rounded-md" 
                                    style={{ borderColor: '#123458', color: '#030303', backgroundColor: '#FFFFFF' }}
                                />
                                {errors.jazzcashNumber && <p className="text-red-500 text-xs">{errors.jazzcashNumber}</p>}
                                <input 
                                    type="text" 
                                    name="jazzcashCNIC" 
                                    placeholder="Last 6 digits of CNIC" 
                                    value={formData.jazzcashCNIC} 
                                    onChange={handleFormChange} 
                                    maxLength={6} 
                                    className="w-full p-2 rounded-md" 
                                    style={{ borderColor: '#123458', color: '#030303', backgroundColor: '#FFFFFF' }}
                                />
                                {errors.jazzcashCNIC && <p className="text-red-500 text-xs">{errors.jazzcashCNIC}</p>}
                            </div>
                        )}
                    </div>

                    {paymentError && <p className="text-red-500 text-center">{paymentError}</p>}

                    <button 
                        type="submit" 
                        disabled={isProcessing} 
                        className="w-full p-3 rounded-md hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: '#123458', color: 'white' }}
                    >
                        {isProcessing ? 'Processing...' : `Place Order - PKR ${(cartTotal + 250).toFixed(2)}`}
                    </button>

                    <ReactRouterDOM.Link 
                        to="/cart" 
                        className="block text-center mt-2 hover:underline font-semibold"
                        style={{ color: '#123458' }}
                    >
                        &larr; Back to Cart
                    </ReactRouterDOM.Link>
                </form>

                {/* Right: Summary */}
                <div className="lg:sticky lg:top-24 mt-8 lg:mt-0">
                    <div className="p-6 rounded-lg border" style={{ backgroundColor: '#F8FAFC', borderColor: '#123458' }}>
                        <h3 className="text-xl font-semibold mb-4 border-b pb-2" style={{ color: '#030303', borderColor: '#123458' }}>Order Summary</h3>
                        <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                            {cart.map(({ item, quantity }) => (
                                <div key={item.id} className="flex justify-between items-center">
                                    <div className="flex gap-3 items-center">
                                        <img src={item.imageUrl} alt={item.name} className="w-14 h-14 rounded-md object-cover" />
                                        <div>
                                            <p className="font-semibold text-sm" style={{ color: '#030303' }}>{item.name}</p>
                                            <p className="text-xs" style={{ color: '#666666' }}>Qty: {quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-medium text-sm" style={{ color: '#030303' }}>PKR {(item.price * quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 border-t pt-4 space-y-2" style={{ borderColor: '#E5E7EB' }}>
                            <div className="flex justify-between" style={{ color: '#666666' }}>
                                <span>Subtotal</span>
                                <span>PKR {cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between" style={{ color: '#666666' }}>
                                <span>Shipping</span>
                                <span>PKR 250.00</span>
                            </div>
                            <div className="flex justify-between font-bold text-xl border-t pt-2" style={{ color: '#030303', borderColor: '#E5E7EB' }}>
                                <span>Total</span>
                                <span>PKR {(cartTotal + 250).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;