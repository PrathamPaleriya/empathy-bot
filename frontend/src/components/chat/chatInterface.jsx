import React from 'react';
import ReactMarkdown from 'react-markdown';

const ChatInterface = ({ chatHistory, loading, alert, reference }) => {
  return (
    <div className="flex flex-col gap-2 md:gap-4 md:w-[85%] lg:w-[75%] mx-auto text-base font-semibold">
      {chatHistory.map((msg, idx) => (
        <div
          key={idx}
          className={`max-w-[70%] h-fit  rounded-2xl leading-snug whitespace-pre-wrap break-words ${
            msg.role === 'user'
              ? 'self-end bg-[#FDFBEE] text-caption shadow-lg px-4 py-3'
              : 'self-start'
          }`}
        >
          <ReactMarkdown>{msg.content}</ReactMarkdown>
        </div>
      ))}

      {loading && <div className="self-start">typing...</div>}
      {alert && <div className="self-start text-red-600">{alert}</div>}

      <div ref={reference} />
    </div>
  );
};

export default ChatInterface;
