const mockProducts = [
  {
    _id: '1',
    title: 'iPhone 13 Pro',
    price: 999.99,
    description: 'Brand new iPhone 13 Pro with 256GB storage. Comes with charger and original box.',
    city: 'Sofia',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1336&q=80',
    addedAt: '2023-01-15T10:30:00',
    seller: 'user1',
    sellerId: 'user1',
    active: true,
    isWished: false
  },
  {
    _id: '2',
    title: 'Modern Apartment in City Center',
    price: 150000,
    description: 'Beautiful 2-bedroom apartment in the heart of the city. Recently renovated with modern appliances.',
    city: 'Plovdiv',
    category: 'properties',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    addedAt: '2023-01-10T14:20:00',
    seller: 'user2',
    sellerId: 'user2',
    active: true,
    isWished: true
  },
  {
    _id: '3',
    title: 'BMW 5 Series 2020',
    price: 45000,
    description: 'BMW 5 Series in excellent condition. Low mileage, full service history, and many extras.',
    city: 'Varna',
    category: 'auto',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    addedAt: '2023-01-05T09:15:00',
    seller: 'user3',
    sellerId: 'user3',
    active: true,
    isWished: false
  },
  {
    _id: '4',
    title: 'Designer Sofa',
    price: 899.99,
    description: 'Elegant designer sofa in mint condition. Perfect for modern homes.',
    city: 'Burgas',
    category: 'home',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    addedAt: '2023-01-20T16:45:00',
    seller: 'user4',
    sellerId: 'user4',
    active: true,
    isWished: false
  },
  {
    _id: '5',
    title: 'Winter Jacket',
    price: 120,
    description: 'Warm winter jacket, perfect for cold weather. Size L, barely used.',
    city: 'Sofia',
    category: 'clothes',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    addedAt: '2023-01-25T11:30:00',
    seller: 'user5',
    sellerId: 'user5',
    active: true,
    isWished: true
  },
  {
    _id: '6',
    title: 'LEGO Star Wars Set',
    price: 79.99,
    description: 'Complete LEGO Star Wars set. All pieces included, box in good condition.',
    city: 'Plovdiv',
    category: 'toys',
    image: 'https://images.unsplash.com/photo-1563901935883-cb9fb1991fda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    addedAt: '2023-02-01T13:20:00',
    seller: 'user6',
    sellerId: 'user6',
    active: true,
    isWished: false
  },
  {
    _id: '7',
    title: 'Garden Tools Set',
    price: 149.99,
    description: 'Complete set of garden tools including shovel, rake, and pruning shears.',
    city: 'Varna',
    category: 'garden',
    image: 'https://images.unsplash.com/photo-1585513502335-37ed0e060bc9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    addedAt: '2023-02-05T10:15:00',
    seller: 'user7',
    sellerId: 'user7',
    active: true,
    isWished: false
  },
  {
    _id: '8',
    title: 'MacBook Pro 2022',
    price: 1899.99,
    description: 'MacBook Pro with M1 chip, 16GB RAM, and 512GB SSD. Like new condition.',
    city: 'Sofia',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1452&q=80',
    addedAt: '2023-02-10T15:30:00',
    seller: 'user8',
    sellerId: 'user8',
    active: true,
    isWished: true
  },
  {
    _id: '9',
    title: 'Archived Vintage Watch',
    price: 299.99,
    description: 'Rare vintage watch from the 1960s. Excellent condition and working perfectly.',
    city: 'Burgas',
    category: 'clothes',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80',
    addedAt: '2023-02-15T09:45:00',
    seller: 'user1',
    sellerId: 'user1',
    active: false,
    isWished: false
  },
  {
    _id: '10',
    title: 'Archived Mountain Bike',
    price: 450,
    description: 'High-quality mountain bike with front suspension. Perfect for off-road adventures.',
    city: 'Sofia',
    category: 'auto',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    addedAt: '2023-02-20T14:10:00',
    seller: 'user1',
    sellerId: 'user1',
    active: false,
    isWished: false
  }
];

// Helper function to filter products
const filterProducts = (category, query, page = 1, limit = 8) => {
  let filtered = [...mockProducts];
  
  // Filter by category
  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }
  
  // Filter by search query
  if (query && query !== '') {
    const searchLower = query.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(searchLower) || 
      p.description.toLowerCase().includes(searchLower) ||
      p.city.toLowerCase().includes(searchLower)
    );
  }
  
  // Filter active products
  filtered = filtered.filter(p => p.active === true);
  
  // Paginate
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filtered.slice(startIndex, endIndex);
  
  return {
    products: paginatedProducts,
    count: filtered.length
  };
};

export async function getAll(page, category, query) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(filterProducts(category, query, page));
    }, 500); // Simulate network delay
  });
}

export async function getSpecific(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      const product = mockProducts.find(p => p._id === id);
      if (product) {
        // Add additional details for the product page
        resolve({
          ...product,
          isSeller: product.sellerId === 'user1', // Assuming current user is user1
          isAuth: true,
          name: 'John Doe',
          email: 'john@example.com',
          phoneNumber: '+359888123456',
          createdSells: 5,
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        });
      } else {
        resolve({ error: 'Product not found' });
      }
    }, 300);
  });
}

export async function createProduct(product) {
  return new Promise(resolve => {
    setTimeout(() => {
      const newId = (mockProducts.length + 1).toString();
      const newProduct = {
        _id: newId,
        ...product,
        addedAt: new Date().toISOString(),
        seller: 'user1',
        sellerId: 'user1',
        active: true,
        isWished: false
      };
      
      mockProducts.push(newProduct);
      resolve({ productId: newId });
    }, 800);
  });
}

export async function editProduct(id, product) {
  return new Promise(resolve => {
    setTimeout(() => {
      const index = mockProducts.findIndex(p => p._id === id);
      if (index !== -1) {
        mockProducts[index] = {
          ...mockProducts[index],
          ...product
        };
        resolve({ success: true });
      } else {
        resolve({ error: 'Product not found' });
      }
    }, 800);
  });
}

export async function activateSell(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      const index = mockProducts.findIndex(p => p._id === id);
      if (index !== -1) {
        mockProducts[index].active = true;
        resolve({ success: true });
      } else {
        resolve({ error: 'Product not found' });
      }
    }, 300);
  });
}

export async function archiveSell(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      const index = mockProducts.findIndex(p => p._id === id);
      if (index !== -1) {
        mockProducts[index].active = false;
        resolve({ success: true });
      } else {
        resolve({ error: 'Product not found' });
      }
    }, 300);
  });
}

export async function wishProduct(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      const index = mockProducts.findIndex(p => p._id === id);
      if (index !== -1) {
        mockProducts[index].isWished = !mockProducts[index].isWished;
        resolve({ success: true });
      } else {
        resolve({ error: 'Product not found' });
      }
    }, 300);
  });
}

export { mockProducts }