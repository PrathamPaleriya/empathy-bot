import React, { useState, useRef, useEffect } from 'react';
import PaddingMarging from '../components/ui/PaddingMarging';
import ChatInterface from '../components/chat/chatInterface';
import ChatInput from '../components/chat/ChatInput';
import ChatWelcome from '../components/chat/ChatWelcome';
import { useAppContext } from '../context/MainContext';
import useChatApi from '../libs/char_auth';
import useAuthAPI from '../libs/api_auth';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { chatHistory, setChatHistory } = useAppContext();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const bottomRef = useRef(null);
  const {isTokenValid} = useAuthAPI();
  const {chat} = useChatApi();
  const navigate = useNavigate();

  const handleSend = async (e) => {
    e.preventDefault();
    setAlert(null)
    if (!input.trim()) return;

    const newHistory = [...chatHistory, { role: 'user', content: input }];
    setChatHistory(newHistory);
    setInput('');
    document.querySelector('textarea').style.height = 'auto';
    setLoading(true);

    const resp = await chat(input);
    if (resp.success) {
      setChatHistory(prev => [...prev, { role: 'assistant', content: resp.response }]); 
    } else {
      setAlert(resp.error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if(!isTokenValid()) {
      navigate("/login")
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, loading]);

  return (
    <div className="relative h-screen max-h-screen w-full">
      <div className="absolute bg-[#9AE2FF]/60 w-full aspect-square rounded-full -translate-y-[20%] blur-[100px]  md:-translate-y-[70%] md:blur-[200px]" />

      <div className="z-20 relative">
        <div className="flex flex-col min-h-screen max-h-screen w-full">
          <div className="flex-1 w-full overflow-y-auto py-24">
            <PaddingMarging>
              {chatHistory.length >= 1 ? (
                <ChatInterface
                  chatHistory={chatHistory}
                  loading={loading}
                  alert={alert}
                  reference={bottomRef}
                />
              ) : (
                <div className="w-[70%] lg:w-[40%] mx-auto mt-[20%] lg:mt-[10%]">
                  <ChatWelcome />
                </div>
              )}
            </PaddingMarging>
          </div>

          <div className="bg-bg/20 w-full md:w-[85%] lg:w-[70%] px-3 md:px-7 lg:px-20 pt-8 md:pt-10 pb-13 md:pb-14 mx-auto">
            <ChatInput
              handleSend={handleSend}
              setInput={setInput}
              input={input}
              loading={loading}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 md:bottom-5 text-sm text-center w-full font-semibold text-placeholder">
        empathy-bot
      </div>
    </div>
  );
};

export default Home;
