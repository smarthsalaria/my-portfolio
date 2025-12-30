'use client';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export default function Card({ children, className }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={twMerge(
        "bg-gray-900 border border-gray-800 rounded-3xl p-6 text-white overflow-hidden flex flex-col",
        className
      )}
    >
      {children}
    </motion.div>
  );
}