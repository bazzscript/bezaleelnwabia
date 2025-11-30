"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Download, MessageCircle } from "lucide-react";
import { useState } from "react";
import styles from "./Header.module.css";
import ResumeModal from "./ResumeModal";
import ResumeChat from "./ResumeChat";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <div className={styles.headerContainer}>
        <motion.header
          className={styles.header}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/" className={styles.logo}>
            BN
          </Link>
          <nav className={styles.nav}>
            <Link href="#about" className={styles.link}>About</Link>
            <Link href="#experience" className={styles.link}>Exp</Link>
            <Link href="#projects" className={styles.link}>Work</Link>
            <Link href="#contact" className={styles.link}>Contact</Link>
          </nav>
          <div className={styles.buttonGroup}>
            <motion.button 
              onClick={() => setIsChatOpen(true)}
              className={styles.chatButton}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              title="Chat with Resume (AI)"
            >
              <MessageCircle size={16} />
              <span className={styles.buttonText}>AI Chat</span>
            </motion.button>
            <motion.button 
              onClick={() => setIsModalOpen(true)}
              className={styles.resumeButton}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Resume <Download size={14} />
            </motion.button>
          </div>
        </motion.header>
      </div>

      <ResumeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      <ResumeChat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </>
  );
}
