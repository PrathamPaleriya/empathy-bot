import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const LineBlurIn = ({ text, duration = 0.6, delayPerLine = 0.2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const lines = text.split('\n');

  return (
    <div ref={ref} className="space-y-1">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ filter: 'blur(8px)', opacity: 0 }}
          animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : {}}
          transition={{ duration, delay: i * delayPerLine }}
        >
          <ReactMarkdown>{line}</ReactMarkdown>
        </motion.div>
      ))}
    </div>
  );
};

export default LineBlurIn;
