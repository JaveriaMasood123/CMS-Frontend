export const MOCK_USERS = [
    { id: 'user-1', name: 'Admin User', email: 'admin@test.com', role: 'ADMIN', password: 'password', businessName: 'GourmetGo Central Kitchen' },
    { id: 'user-2', name: 'Customer User', email: 'customer@test.com', role: 'CUSTOMER', password: 'password' },
    { id: 'user-3', name: "Luigi's Pasta", email: 'caterer@test.com', role: 'CATERER', password: 'password', businessName: "Luigi's Pasta House", businessDescription: 'Authentic Italian catering.', phone: '123-456-7890' },
];

export const MOCK_CATEGORIES = [
    { id: 'cat-1', name: 'Main Menu' },
    { id: 'cat-2', name: 'Unit' },
    { id: 'cat-3', name: 'Package' },
    { id: 'cat-4', name: 'Beverages' },
];

export const MOCK_MENU_ITEMS = [

    {
  id: 'item-3',
  name: 'Classic Creamy Spaghetti',
  description: 'Classic Italian pasta with eggs, parmesan cheese, pancetta, and freshly cracked black pepper.',
  ingredients: ['Pasta', 'Eggs', 'Parmesan Cheese', 'Pancetta', 'Black Pepper'],
  price: 450,               // price per serving
  servings: 1,              // number of persons this portion serves
  imageUrl: 'https://images.unsplash.com/photo-1761545832779-bc0b4290fc5e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA4fHxzcGFnaGV0dGklMjBjYXJib25hcmF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
  categoryId: 'cat-1',
  catererId: 'user-1'
},


{
  id: 'item-4',
  name: 'Italian Cheese Pizza',
  description: 'Classic pizza with San Marzano tomatoes, mozzarella cheese, fresh basil, salt, and extra-virgin olive oil.',
  price: 850,
  servings: 2, // added
  ingredients: ['San Marzano tomatoes', 'Mozzarella cheese', 'Fresh basil', 'Salt', 'Extra-virgin olive oil'], // added
  imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
  categoryId: 'cat-1',
  catererId: 'user-1'
},
    
   {
  id: 'item-1',
  name: 'Tomato Garlic Bread',
  description: 'Grilled bread topped with tomatoes, garlic, basil, and olive oil.',
  price: 900,
  servings: 1, // add karo
  ingredients: ['Bread', 'Tomatoes', 'Garlic', 'Basil', 'Olive Oil'], // add karo
  imageUrl: 'https://plus.unsplash.com/premium_photo-1668095398227-c943ddb69d89?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fEJydXNjaGV0dGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
  categoryId: 'cat-2',
  catererId: 'user-1'
},

   {
  id: 'item-2',
  name: 'Fresh Tomato & Cheese Salad',
  description: 'Fresh mozzarella, tomatoes, and sweet basil, seasoned with salt and olive oil.',
  price: 500,
  servings: 1, // number of people this portion serves
  ingredients: ['Mozzarella', 'Tomatoes', 'Basil', 'Salt', 'Olive Oil'], // list of ingredients
  imageUrl: 'https://images.unsplash.com/photo-1595587870672-c79b47875c6a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2FwcmVzZSUyMFNhbGFkfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
  categoryId: 'cat-2',
  catererId: 'user-1'
},

    {
  id: 'item-5',
  name: 'Coffee Cream Dessert',
  description: 'Coffee-flavoured Italian dessert.',
  price: 650,
  servings: 2, // number of people this portion serves
  ingredients: ['Mascarpone', 'Coffee', 'Ladyfingers', 'Cocoa Powder', 'Sugar'], // list of ingredients
  imageUrl: 'https://plus.unsplash.com/premium_photo-1695028378225-97fbe39df62a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VGlyYW1pc3V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
  categoryId: 'cat-2',
  catererId: 'user-3'
},

    {
  id: 'item-6',
  name: 'Vanilla Cream Dessert',
  description: 'Italian dessert of sweetened cream thickened with gelatin.',
  price: 900,
  servings: 2, // number of people this portion serves
  ingredients: ['Cream', 'Sugar', 'Gelatin', 'Vanilla Extract', 'Berries (optional)'], // list of ingredients
  imageUrl: 'https://plus.unsplash.com/premium_photo-1713551474564-c3916a5eb3bf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UGFubmElMjBDb3R0YXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
  categoryId: 'cat-2',
  catererId: 'user-3'
},
    
   {
  id: 'item-9',
  name: 'Family Feast Package',
  description: 'A complete meal for four. Includes one large pizza, a family-size spaghetti, four bruschettas, and a pitcher of lemonade.',
  price: 900,
  servings: 4, // serves 4 people
  ingredients: ['Large Pizza', 'Family-size Spaghetti', '4 Bruschettas', 'Pitcher of Lemonade'], // list of items included
  imageUrl: 'https://images.unsplash.com/photo-1577308873518-7fd772788ec6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEZhbWlseSUyMEZlYXN0JTIwUGFja2FnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
  categoryId: 'cat-3',
  catererId: 'user-1'
},


    {
  id: 'item-7',
  name: 'Mineral Water',
  description: 'Still or sparkling mineral water.',
  price: 70,
  servings: 1, // serves 1 person
  ingredients: ['Water'], // simple ingredient
  imageUrl: 'https://plus.unsplash.com/premium_photo-1670426500867-519c487c744d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQ1fHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600',
  categoryId: 'cat-4',
  catererId: 'user-1'
},

   {
  id: 'item-8',
  name: 'Pure Coffee',
  description: 'Concentrated coffee beverage brewed by forcing a small amount of nearly boiling water under pressure.',
  price: 700,
  servings: 1, // serves 1 person
  ingredients: ['Coffee'], // simple ingredient
  imageUrl: 'https://images.unsplash.com/photo-1669162364316-a74b2d661d1e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMzfHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600',
  categoryId: 'cat-4',
  catererId: 'user-3'
},
];

export const MOCK_ORDERS = [
    { id: 'order-1', userId: 'user-2', customerName: 'Customer User', items: [{ item: MOCK_MENU_ITEMS[0], quantity: 1 }, { item: MOCK_MENU_ITEMS[1], quantity: 1 }], total: 30.49, status: 'Delivered', orderDate: '2023-10-26T10:00:00Z' },
    
    { id: 'order-2', userId: 'user-2', customerName: 'Customer User', items: [{ item: MOCK_MENU_ITEMS[2], quantity: 2 }], total: 17.98, status: 'Pending', orderDate: '2023-10-27T11:30:00Z' },
];







