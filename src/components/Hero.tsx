"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { useState } from "react";
import styles from "./Hero.module.css";
import ResumeChat from "./ResumeChat";

export default function Hero() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <section className={styles.hero}>
      <div className={styles.backgroundGradient} />
      
      <div className={styles.content}>
        <motion.span 
          className={styles.greeting}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          Hello, I'm Bezaleel.
        </motion.span>
        
        <motion.h1 
          className={styles.headline}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        >
          Building digital products<br />
          that scale.
        </motion.h1>
        
        <motion.p 
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        >
          Senior Full Stack Engineer building scalable mobile, web, and cloud solutions. Exploring applied machine learning engineering.
        </motion.p>
        
        <motion.div 
          className={styles.ctaGroup}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="#projects" className={styles.primaryButton}>
              View My Work
            </Link>
          </motion.div>
          <motion.button
            onClick={() => setIsChatOpen(true)}
            className={styles.aiButton}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Sparkles size={18} />
            <span>Chat with AI</span>
          </motion.button>
          <Link href="#contact" className={styles.secondaryButton}>
            <motion.span
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Contact Me <ArrowRight size={18} />
            </motion.span>
          </Link>
        </motion.div>
      </div>
      <ResumeChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </section>
  );
}
