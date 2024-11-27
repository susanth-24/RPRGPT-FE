import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'; // For rendering Markdown
import remarkMath from 'remark-math'; // For parsing LaTeX math
import rehypeKatex from 'rehype-katex'; // For rendering LaTeX with KaTeX
import 'katex/dist/katex.min.css'; // KaTeX styles

const Chat = () => {
  const [messages, setMessages] = useState([]); // Stores messages
  const [input, setInput] = useState(''); // Tracks user input
  const [selectedCategory, setSelectedCategory] = useState(''); // Tracks selected category
  const [error, setError] = useState(''); // For displaying error if no category is selected
  const chatContainerRef = useRef(null); // Reference for scrolling

  // Dummy user data (you can replace this with actual data from your app)
  const user = JSON.parse(localStorage.getItem('profile'));
  // console.log(user)

  // Function to handle sending messages
  const sendMessage = async () => {
    if (!selectedCategory) {
      setError('Please select a category before sending the message.');
      return; // Don't send the message if no category is selected
    }

    if (!input.trim()) return; // Prevent sending empty messages

    // Add user's message to the chat
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setError(''); // Reset the error if the message is being sent

    let categoryToSend = selectedCategory;

    // Check if "Academics" is selected and modify the category value
    if (selectedCategory === 'Academics') {
      categoryToSend = `${user?.result?.grad}${user?.result?.year}`; // Custom value for Academics
    }else if (selectedCategory === 'Faculty' || selectedCategory === 'Clubs') {
      categoryToSend = selectedCategory.toLowerCase(); // Convert "Faculty" and "Clubs" to lowercase
    }

    try {
      // Make the POST request to the API
      const response = await fetch('http://127.0.0.1:5080/Home/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ query: input, pursuing: categoryToSend }), // Send only the selected category
      });
      console.log(input)
      console.log(categoryToSend)

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

  // Set selected category (only one category at a time)
  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName); // Set the selected category
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      
      {/* Category Buttons */}
      <div className="p-4 bg-gray-100 border-b border-gray-300">
        <div className="flex space-x-6">
          <button
            onClick={() => handleCategoryChange('Academics')}
            className={`px-4 py-2 rounded-md ${selectedCategory === 'Academics' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} hover:bg-blue-600 focus:outline-none`}
          >
            Academics
          </button>
          <button
            onClick={() => handleCategoryChange('Faculty')}
            className={`px-4 py-2 rounded-md ${selectedCategory === 'Faculty' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} hover:bg-blue-600 focus:outline-none`}
          >
            Faculty
          </button>
          <button
            onClick={() => handleCategoryChange('Clubs')}
            className={`px-4 py-2 rounded-md ${selectedCategory === 'Clubs' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} hover:bg-blue-600 focus:outline-none`}
          >
            Clubs
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error if no category selected */}
      </div>

      {/* Chat Area */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
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
