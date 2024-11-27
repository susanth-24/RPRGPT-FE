// import React, { useState, useRef, useEffect } from 'react';

// const Chat = () => {
//   const [messages, setMessages] = useState([]); // Manage chat messages
//   const [input, setInput] = useState(''); // Track user input
//   const chatContainerRef = useRef(null); // Reference for scrolling

//   // Function to handle sending messages
//   const sendMessage = async () => {
//     if (input.trim() === '') return;

//     const userMessage = { sender: 'user', text: input };
//     setMessages((prev) => [...prev, userMessage]); // Add user message

//     // try {
//     //   const response = await fetch('https://api.groq-llama3-8b.com/chat', {
//     //     method: 'POST',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify({ message: input }),
//     //   });

//     //   const data = await response.json();
//     //   const botMessage = { sender: 'bot', text: data.response }; // Assume API returns 'response'
//     //   setMessages((prev) => [...prev, botMessage]); // Add bot response
//     // } catch (error) {
//     //   console.error('Error:', error);
//     //   const errorMessage = { sender: 'bot', text: 'Error fetching response. Please try again!' };
//     //   setMessages((prev) => [...prev, errorMessage]);
//     // }
//     try {
//         // Simulate API response by echoing the user's input
//         const botMessage = { sender: 'bot', text: input }; // Bot echoes the user input
//         setMessages((prev) => [...prev, botMessage]); // Add bot response
//       } catch (error) {
//         console.error('Error:', error);
//         const errorMessage = { sender: 'bot', text: 'Error fetching response. Please try again!' };
//         setMessages((prev) => [...prev, errorMessage]);
//       }
      

//     setInput(''); // Clear input field
//   };

//   // Scroll to the latest message when messages update
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       <div className="flex-1 overflow-y-auto p-4" ref={chatContainerRef}>
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`my-2 p-3 rounded-lg max-w-xs ${
//               message.sender === 'user'
//                 ? 'bg-blue-500 text-white self-end ml-auto'
//                 : 'bg-green-500 text-white self-start mr-auto'
//             }`}
//           >
//             {message.text}
//           </div>
//         ))}
//       </div>
//       <div className="flex items-center p-4 bg-white border-t border-gray-300">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-1 p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
//         />
//         <button
//           onClick={sendMessage}
//           className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'; // For rendering Markdown
import remarkMath from 'remark-math'; // For parsing LaTeX math
import rehypeKatex from 'rehype-katex'; // For rendering LaTeX with KaTeX
import 'katex/dist/katex.min.css'; // KaTeX styles

const Chat = () => {
  const [messages, setMessages] = useState([]); // Stores messages
  const [input, setInput] = useState(''); // Tracks user input
  const chatContainerRef = useRef(null); // Reference for scrolling

  // Function to handle sending messages
  const sendMessage = async () => {
    if (!input.trim()) return; // Prevent sending empty messages

    // Add user's message to the chat
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Make the POST request to the API
      const response = await fetch('http://127.0.0.1:5000/Home/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ query: input }),
      });

      // Parse the response
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Add the bot's response to the chat
      const botMessage = { sender: 'bot', text: data.response }; // Adjust 'data.response' if the API response differs
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);

      // Show an error message from the bot
      const errorMessage = { sender: 'bot', text: 'Error fetching response. Please try again!' };
      setMessages((prev) => [...prev, errorMessage]);
    }

    // Clear the input field after sending
    setInput('');
  };

  // Automatically scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle Enter key (Send on Enter, new line on Shift+Enter)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-center h-16 bg-blue-600 text-white font-bold text-lg">
        RPR GPT
      </div>

      {/* Chat Area */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-md p-3 rounded-lg shadow ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-black'
              }`}
            >
              {message.sender === 'bot' ? (
                <ReactMarkdown
                  children={message.text}
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                />
              ) : (
                message.text
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-300">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          placeholder="Type your message..."
          className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 resize-none"
        ></textarea>
        <button
          onClick={sendMessage}
          className="mt-3 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;



// import React from 'react';

// const Chat = () => {
//   return (
//     <div className="h-screen bg-gray-900 text-white flex flex-col">
//       {/* Top Navbar */}
//       <div className="bg-gray-800 py-2 px-4 flex items-center justify-between shadow">
//         <h1 className="text-lg font-semibold">Using (GPT-3.5-TURBO)</h1>
//         <button className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">
//           <span className="text-sm font-medium">🔍</span>
//         </button>
//       </div>

//       {/* Chat Area */}
//       <div className="flex-grow overflow-y-auto p-4">
//         {/* User Message */}
//         <div className="flex items-start mb-4">
//           <div className="bg-gray-700 p-3 rounded shadow">
//             <p className="text-sm">hi</p>
//           </div>
//         </div>

//         {/* Assistant Response */}
//         <div className="flex items-start mb-4">
//           <div className="bg-green-700 p-3 rounded shadow">
//             <p className="text-sm">
//               Hello! How can I assist you today?
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Input Box */}
//       <div className="bg-gray-800 p-4 flex items-center">
//         <input
//           type="text"
//           className="flex-grow bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none"
//           placeholder="Send a message..."
//         />
//         <button className="bg-green-600 text-white px-4 py-2 ml-2 rounded-lg hover:bg-green-500">
//           ➤
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;
