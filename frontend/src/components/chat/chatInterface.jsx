import React from 'react';
import ReactMarkdown from 'react-markdown';
import { BeatLoader } from 'react-spinners';
import BlurIn from '../animation/BlurIn';
import TextFade from '../animation/TextFade';
import LineBlurIn from '../animation/LineBlurIn';

const ChatInterface = ({ chatHistory, loading, alert, reference }) => {
  return (
    <div className="flex flex-col gap-3 md:gap-4 md:w-[85%] lg:w-[75%] mx-auto text-sm md:text-base font-semibold">
      {chatHistory.map((msg, idx) => (
        <div
          key={idx}
          className={`max-w-[70%] h-fit  rounded-2xl leading-snug whitespace-pre-wrap break-words ${
            msg.role === 'user'
              ? 'self-end bg-[#FDFBEE] text-caption shadow-lg px-4 py-2 md:px-4 md:py-3'
              : 'self-start'
          }`}
        >
          {msg.role === 'user' ? (
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          ) : (
            <LineBlurIn duration={0.4} text={msg.content} />
          )}
        </div>
      ))}

      {loading && (
        <div className="self-start flex items-center gap-1">
          <div>Typing</div>
          <BeatLoader size={4} className="pt-2" />
        </div>
      )}
      {alert && <div className="self-start text-red-600">{alert}</div>}

      <div ref={reference} />
    </div>
  );
};

export default ChatInterface;
