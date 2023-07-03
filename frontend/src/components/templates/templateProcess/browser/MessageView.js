import React, { useState } from 'react';

function MessageView() {
  const [messages, setMessages] = useState([]);

  const handleButtonClick = () => {
    const newMessage = `Mensaje ${messages.length + 1}`;
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  return (
    <div style={{ height: '300px', overflow: 'auto' }}>
      <button onClick={handleButtonClick}>Agregar Mensaje</button>
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  );
}

export default MessageView;
