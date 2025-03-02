// Import mock products to use for user's sells and wishlist
import { mockProducts } from './productData';

// Mock user data
const mockUsers = [
  {
    _id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    phoneNumber: '+359888123456',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    totalSells: 5,
    isMe: true
  },
  {
    _id: 'user2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phoneNumber: '+359888789012',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    totalSells: 3,
    isMe: false
  },
  {
    _id: 'user3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phoneNumber: '+359888345678',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    totalSells: 7,
    isMe: false
  },
  {
    _id: 'user8',
    name: 'Alex Wilson',
    email: 'alex@example.com',
    phoneNumber: '+359888567890',
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    totalSells: 2,
    isMe: false
  }
];

export async function registerUser(userData) {
  return new Promise(resolve => {
    setTimeout(() => {
      // Validate data
      if (!userData.email || !userData.password || !userData.name || !userData.phoneNumber) {
        resolve({ error: 'All fields are required' });
        return;
      }
      
      if (userData.password !== userData.repeatPassword) {
        resolve({ error: 'Passwords do not match' });
        return;
      }
      
      if (userData.password.length < 8) {
        resolve({ error: 'Password must be at least 8 characters long' });
        return;
      }
      
      // Check if email already exists
      const existingUser = mockUsers.find(u => u.email === userData.email);
      if (existingUser) {
        resolve({ error: 'Email already registered' });
        return;
      }
      
      // Create new user
      const newUser = {
        _id: `user${mockUsers.length + 1}`,
        name: userData.name,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
        totalSells: 0,
        isMe: false
      };
      
      mockUsers.push(newUser);
      resolve({ success: true });
    }, 800);
  });
}

export async function loginUser(userData) {
  return new Promise(resolve => {
    setTimeout(() => {
      // In a real app, we would check password hash
      // Here we just check if email exists
      const user = mockUsers.find(u => u.email === userData.email);
      
      if (!user) {
        resolve({ error: { message: 'Invalid email or password' } });
        return;
      }
      
      // Set the logged in user as "me"
      mockUsers.forEach(u => {
        u.isMe = (u._id === user._id);
      });
      
      resolve({ user });
    }, 800);
  });
}

export async function getUser() {
  return new Promise(resolve => {
    setTimeout(() => {
      const currentUser = mockUsers.find(u => u.isMe === true);
      if (currentUser) {
        resolve({ user: currentUser });
      } else {
        resolve({ user: null });
      }
    }, 300);
  });
}

export async function getUserActiveSells(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      const activeSells = mockProducts.filter(p => p.sellerId === id && p.active === true);
      resolve({ sells: activeSells });
    }, 300);
  });
}

export async function getUserArchivedSells() {
  return new Promise(resolve => {
    setTimeout(() => {
      const currentUser = mockUsers.find(u => u.isMe === true);
      if (!currentUser) {
        resolve({ error: 'Not authenticated' });
        return;
      }
      
      const archivedSells = mockProducts.filter(p => p.sellerId === currentUser._id && p.active === false);
      resolve({ sells: archivedSells });
    }, 300);
  });
}

export async function getUserWishlist() {
  return new Promise(resolve => {
    setTimeout(() => {
      const wishedProducts = mockProducts.filter(p => p.isWished === true);
      resolve({ wishlist: wishedProducts });
    }, 300);
  });
}

export async function editUserProfile(id, data) {
  return new Promise(resolve => {
    setTimeout(() => {
      const index = mockUsers.findIndex(u => u._id === id);
      if (index !== -1) {
        mockUsers[index] = {
          ...mockUsers[index],
          ...data
        };
        resolve({ success: true });
      } else {
        resolve({ error: 'User not found' });
      }
    }, 800);
  });
}

export async function getUserById(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      const user = mockUsers.find(u => u._id === id);
      if (user) {
        resolve({ user });
      } else {
        resolve({ user: null });
      }
    }, 300);
  });
}