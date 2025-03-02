import { useState } from 'react';
import { io } from "socket.io-client";

function SubmitForm({ chatId }) {
    const socket = io();
    const [text, setText] = useState("");

    function handleMsgSubmit(e) {
        e.preventDefault();
        socket.emit('chat message', text);
    }

    return (
        <div className="border-t border-gray-200 py-3 px-4">
            <form onSubmit={handleMsgSubmit}>
                <div className="flex">
                    <textarea 
                        className="flex-grow border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        rows="2"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                    ></textarea>
                    <button 
                        type="submit" 
                        className="bg-gray-800 text-white px-4 py-2 rounded-r-md hover:bg-gray-700"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SubmitForm;