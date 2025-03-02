import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserConversations, sendMessage } from '../services/messagesData';
import { Link } from 'react-router-dom';

function Messages() {
    const { id: chatId } = useParams();
    const [conversations, setConversations] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    const [selected, setSelected] = useState({
        chats: {
            _id: 0,
            seller: {
                _id: "",
                avatar: "",
                name: ""
            },
            buyer: {
                _id: "",
                avatar: "",
                name: ""
            },
            conversation: []
        },
        isBuyer: null,
        myId: 0
    });
    const [message, setMessage] = useState("");
    const [alert, setAlert] = useState(null);
    const [alertShow, setAlertShow] = useState(false);

    useEffect(() => {
        getUserConversations()
            .then(res => {
                setConversations(res);
            })
            .catch(err => console.log(err));
        if (isSelected && chatId) {
            setSelected(conversations.find(x => x.chats._id === chatId));
        }
    }, [isSelected, chatId, setSelected, conversations]);

    function handleMsgSubmit(e) {
        e.preventDefault();
        sendMessage(chatId, message)
            .then((res) => {
                setAlert("Message sent!");
                setAlertShow(true);
                setMessage("");
                setSelected(prev => {
                    const updatedConversation = [...prev.chats.conversation, { message, senderId: res.sender }];
                    return {
                        ...prev,
                        chats: {
                            ...prev.chats,
                            conversation: updatedConversation
                        }
                    };
                });
                setTimeout(() => {
                    setAlert(null);
                    setAlertShow(false);
                }, 1000);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-xl font-medium text-white mb-6">Messages</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 border-r border-background-tertiary">
                    <h3 className="text-base font-medium text-text-secondary border-b border-background-tertiary py-4">Conversations</h3>
                    {conversations.length >= 1 ? (
                        conversations.map(x => (
                            <div className="border-b border-background-tertiary py-3 px-4 hover:bg-background-secondary" key={x.chats._id}>
                                <Link 
                                    onClick={() => setIsSelected(true)} 
                                    to={`/messages/${x.chats._id}`}
                                    className="flex items-center"
                                >
                                    {x.isBuyer ? (
                                        <>
                                            <img 
                                                src={x.chats.seller.avatar} 
                                                alt="user-avatar" 
                                                className="w-12 h-12 rounded-full object-cover mr-3" 
                                            />
                                            <span>{x.chats.seller.name}</span>
                                        </>
                                    ) : (
                                        <>
                                            <img 
                                                src={x.chats.buyer.avatar} 
                                                alt="user-avatar" 
                                                className="w-12 h-12 rounded-full object-cover mr-3" 
                                            />
                                            <span>{x.chats.buyer.name}</span>
                                        </>
                                    )}
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="text-center py-4 text-text-muted">No messages yet</p>
                    )}
                </div>
                
                <div className="md:col-span-2">
                    {isSelected && selected.chats && selected.chats._id ? (
                        <>
                            <div className="border-b border-background-tertiary py-3 px-4">
                                {selected.isBuyer ? (
                                    <Link 
                                        to={`/profile/${selected.chats.seller._id}`}
                                        className="flex items-center"
                                    >
                                        <img 
                                            src={selected.chats.seller.avatar} 
                                            alt="user-avatar" 
                                            className="w-12 h-12 rounded-full object-cover mr-3" 
                                        />
                                        <span>{selected.chats.seller.name}</span>
                                    </Link>
                                ) : (
                                    <Link 
                                        to={`/profile/${selected.chats.buyer._id}`}
                                        className="flex items-center"
                                    >
                                        <img 
                                            src={selected.chats.buyer.avatar} 
                                            alt="user-avatar" 
                                            className="w-12 h-12 rounded-full object-cover mr-3" 
                                        />
                                        <span>{selected.chats.buyer.name}</span>
                                    </Link>
                                )}
                            </div>
                            
                            {alertShow && (
                                <div className="bg-green-900/30 text-green-300 border border-green-800 p-4 mb-4 rounded-md" role="alert">
                                    <span className="block sm:inline">{alert}</span>
                                </div>
                            )}
                            
                            <div className="py-4 px-4 h-96 overflow-y-auto">
                                {selected.chats.conversation.map((x, index) => (
                                    <div 
                                        className={`mb-4 ${selected.myId === x.senderId ? 'text-right' : 'text-left'}`} 
                                        key={index}
                                    >
                                        <span 
                                            className={`inline-block px-4 py-2 rounded-full ${
                                                selected.myId === x.senderId 
                                                    ? 'bg-accent-primary text-white' 
                                                    : 'bg-background-tertiary border border-background'
                                            }`}
                                        >
                                            {x.message}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="border-t border-background-tertiary py-3 px-4">
                                <form onSubmit={handleMsgSubmit}>
                                    <div className="flex">
                                        <textarea 
                                            className="flex-grow bg-background-tertiary border border-background rounded-l-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary resize-none"
                                            rows="2"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            required
                                        ></textarea>
                                        <button 
                                            type="submit" 
                                            className="bg-accent-primary hover:bg-accent-secondary text-white px-4 py-2 rounded-r-md transition-colors duration-300"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-text-muted">Select a conversation to start messaging</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Messages;