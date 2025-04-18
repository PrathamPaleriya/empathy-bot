import React, { useState, useRef, useEffect } from 'react';
import PaddingMarging from '../components/ui/PaddingMarging';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'user',
      content: 'thsi is a test',
    },
    {
      role: 'assistant',
      content: 'thsi is a test',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const handleSend = e => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [...chatHistory, { role: 'user', content: input }];
    setChatHistory(newHistory);
    setInput('');
    document.querySelector('textarea').style.height = 'auto';
    setLoading(true);

    setTimeout(() => {
      setChatHistory(prev => [...prev, { role: 'assistant', content: 'hi' }]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, loading]);

  return (
    <div className="relative h-screen max-h-screen w-full">
      <div className="absolute bg-[#9AE2FF]/60 w-full aspect-square rounded-full -translate-y-[70%] blur-[200px]" />

      <div className="z-20 relative">
        <div className="flex flex-col min-h-screen max-h-screen w-full">
          <div className="flex-1 w-full overflow-y-auto py-24">
            <PaddingMarging>
              <div className="flex flex-col gap-4 w-[75%] mx-auto text-base font-semibold">
                {chatHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`max-w-[70%] h-fit px-4 py-3 rounded-2xl leading-snug whitespace-pre-wrap break-words break-all ${
                      msg.role === 'user'
                        ? 'self-end bg-[#FDFBEE] text-caption shadow-lg'
                        : 'self-start text-start'
                    }`}
                  >
                    {msg.content}
                  </div>
                ))}

                {loading && <div className="self-start text-start">typing...</div>}

                <div ref={bottomRef} />
              </div>
            </PaddingMarging>
          </div>

          <div className="bg-bg/20 w-[70%] pt-10 pb-14 mx-auto">
            <PaddingMarging>
              <form
                className="flex w-full items-center justify-center gap-3 text-heading"
                onSubmit={handleSend}
              >
                <textarea
                  rows={1}
                  placeholder="Type anything ..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onInput={e => {
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                  className="bg-white w-full border-2 px-4 py-3  border-placeholder/20 rounded-2xl resize-none overflow-hidden leading-snug max-h-28"
                />
                <button
                  type="submit"
                  className="py-3 px-3 rounded-2xl bg-primary aspect-square text-white shadow-lg"
                >
                  <ArrowRight />
                </button>
              </form>
            </PaddingMarging>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 text-center w-full font-semibold text-placeholder">
        empathy-bot
      </div>
    </div>
  );
};

export default Home;
