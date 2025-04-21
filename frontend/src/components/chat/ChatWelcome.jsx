import React, { useEffect, useState } from 'react';
import BlurIn from '../animation/BlurIn';
import TextFade from '../animation/TextFade';

const ChatWelcome = () => {
  const headings = [
    "Hey, good to see you here. What's on your mind today?",
    'Welcome back 🤍 Wanna chat or just chill for a bit?',
    'Yo! Ready when you are.',
    'Hey you, glad you dropped by. Type away whenever you feel like.',
    "Hey there 👋 This space's all yours, take it wherever you want.",
    "Guess who's been waiting to hear from you? (Yep, me 😌)",
    "Let it out, I'm all ears today.",
    "Long day? I'm here for you.",
    'You made it — wanna talk about anything or nothing at all?',
    "Hey sunshine ☀️ What's been up lately?",
    'Just us here. No rush, no pressure.',
    "Feeling things? Same. Let's talk it out.",
    'This chatbox? Judgment-free zone 🫶',
    "Drop a thought, a word, even a sigh — I'm listening.",
  ];

  const [heading, setHeading] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * headings.length);
    setHeading(headings[randomIndex]);
  }, []);

  return (
    <div className="text-center text-xl md:text-2xl lg:text-3xl font-semibold text-secondary">
      <BlurIn duration={0.5}>{heading}</BlurIn>
    </div>
  );
};

export default ChatWelcome;
