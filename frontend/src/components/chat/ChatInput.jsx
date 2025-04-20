import { ArrowRight } from 'lucide-react';
import React from 'react';

const ChatInput = ({ handleSend, input, setInput, loading }) => {
  const toDisable = () => {
    if (loading || input.length < 1) {
      return true;
    }

    return false;
  };

  return (
    <form
      className="flex w-full h-full items-center justify-center gap-2 md:gap-3 text-heading text-sm md:text-base"
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
        disabled={toDisable()}
        className="py-3 px-3 rounded-2xl bg-primary aspect-square text-white shadow-lg disabled:bg-primary/60 disabled:cursor-auto"
      >
        <ArrowRight />
      </button>
    </form>
  );
};

export default ChatInput;
