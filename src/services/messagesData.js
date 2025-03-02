// Mock messages data
const mockChatRooms = [
  {
    _id: 'chat1',
    seller: {
      _id: 'user2',
      name: 'Jane Smith',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    buyer: {
      _id: 'user1',
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    conversation: [
      { message: 'Hi, is this item still available?', senderId: 'user1' },
      { message: 'Yes, it is still available.', senderId: 'user2' },
      { message: 'Great! Can we meet tomorrow?', senderId: 'user1' }
    ]
  },
  {
    _id: 'chat2',
    seller: {
      _id: 'user3',
      name: 'Mike Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    buyer: {
      _id: 'user1',
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    conversation: [
      { message: 'Hello, I\'m interested in your product.', senderId: 'user1' },
      { message: 'Hello! What would you like to know?', senderId: 'user3' }
    ]
  }
];

export async function createChatRoom(receiver, message) {
  return new Promise(resolve => {
    setTimeout(() => {
      // Check if chat room already exists
      const existingRoom = mockChatRooms.find(room => 
        (room.seller._id === receiver && room.buyer._id === 'user1') || 
        (room.seller._id === 'user1' && room.buyer._id === receiver)
      );
      
      if (existingRoom) {
        // Add message to existing room
        existingRoom.conversation.push({
          message,
          senderId: 'user1'
        });
        
        resolve({ messageId: existingRoom._id, sender: 'user1' });
        return;
      }
      
      // Create new chat room
      const newChatId = `chat${mockChatRooms.length + 1}`;
      const receiverUser = {
        _id: receiver,
        name: 'Receiver Name',
        avatar: 'https://randomuser.me/api/portraits/men/43.jpg'
      };
      
      const currentUser = {
        _id: 'user1',
        name: 'John Doe',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      };
      
      const newChatRoom = {
        _id: newChatId,
        seller: receiverUser,
        buyer: currentUser,
        conversation: [
          { message, senderId: 'user1' }
        ]
      };
      
      mockChatRooms.push(newChatRoom);
      resolve({ messageId: newChatId, sender: 'user1' });
    }, 500);
  });
}

export async function getUserConversations() {
  return new Promise(resolve => {
    setTimeout(() => {
      const userConversations = mockChatRooms.map(chat => {
        const isBuyer = chat.buyer._id === 'user1';
        return {
          chats: chat,
          isBuyer,
          myId: 'user1'
        };
      });
      
      resolve(userConversations);
    }, 300);
  });
}

export async function sendMessage(chatId, message) {
  return new Promise(resolve => {
    setTimeout(() => {
      const chatIndex = mockChatRooms.findIndex(chat => chat._id === chatId);
      
      if (chatIndex !== -1) {
        mockChatRooms[chatIndex].conversation.push({
          message,
          senderId: 'user1'
        });
        
        resolve({ sender: 'user1' });
      } else {
        resolve({ error: 'Chat not found' });
      }
    }, 300);
  });
}