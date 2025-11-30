"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageCircle, Bot, User, Loader2, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import styles from "./ResumeChat.module.css";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ResumeChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeChat({ isOpen, onClose }: ResumeChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Bazz AI Assistant, here to tell you all about Bezaleel Nwabia - an exceptional Senior AI and Full Stack Engineer. Ask me anything about his experience, skills, projects, or why he's wonderful to work with!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const conversationHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          role: "assistant",
          content: data.message,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || "Failed to get response");
      }
    } catch (error: any) {
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    "What are Bezaleel's key skills?",
    "Tell me about Bezaleel's experience",
    "What projects has Bezaleel worked on?",
    "What makes Bezaleel a great engineer?",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Chat Modal */}
          <div className={styles.modalContainer}>
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={styles.header}>
                <div className={styles.headerContent}>
                  <div className={styles.iconContainer}>
                    <Bot size={20} />
                  </div>
                  <div>
                    <h2 className={styles.title}>Bazz AI Assistant</h2>
                    <p className={styles.subtitle}>Learn about Bezaleel - Senior AI & Full Stack Engineer</p>
                  </div>
                </div>
                <motion.button
                  className={styles.closeButton}
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Messages */}
              <div className={styles.messagesContainer}>
                <div className={styles.messages}>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      className={`${styles.message} ${
                        message.role === "user" ? styles.userMessage : styles.assistantMessage
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className={styles.messageIcon}>
                        {message.role === "user" ? (
                          <User size={16} />
                        ) : (
                          <Bot size={16} />
                        )}
                      </div>
                      <div className={styles.messageContent}>
                        {message.role === "assistant" ? (
                          <ReactMarkdown
                            components={{
                              a: ({ node, ...props }) => (
                                <a 
                                  {...props} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className={styles.markdownLink}
                                >
                                  {props.children} <ExternalLink size={12} />
                                </a>
                              ),
                              p: ({ node, ...props }) => <p className={styles.markdownParagraph} {...props} />,
                              ul: ({ node, ...props }) => <ul className={styles.markdownList} {...props} />,
                              ol: ({ node, ...props }) => <ol className={styles.markdownList} {...props} />,
                              li: ({ node, ...props }) => <li className={styles.markdownListItem} {...props} />,
                              strong: ({ node, ...props }) => <strong className={styles.markdownStrong} {...props} />,
                              h3: ({ node, ...props }) => <h3 className={styles.markdownHeading} {...props} />,
                              h4: ({ node, ...props }) => <h4 className={styles.markdownHeading} {...props} />,
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        ) : (
                          <p>{message.content}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      className={`${styles.message} ${styles.assistantMessage}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className={styles.messageIcon}>
                        <Bot size={16} />
                      </div>
                      <div className={styles.messageContent}>
                        <Loader2 size={16} className={styles.loader} />
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Suggested Questions */}
              {messages.length === 1 && (
                <motion.div
                  className={styles.suggestions}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className={styles.suggestionsLabel}>Try asking:</p>
                  <div className={styles.suggestionsList}>
                    {suggestedQuestions.map((question, index) => (
                      <motion.button
                        key={index}
                        className={styles.suggestionChip}
                        onClick={() => {
                          setInput(question);
                          setTimeout(() => handleSend(), 100);
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Input */}
              <div className={styles.inputContainer}>
                <div className={styles.inputWrapper}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about experience, skills, projects..."
                    className={styles.input}
                    disabled={isLoading}
                  />
                  <motion.button
                    className={styles.sendButton}
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isLoading ? (
                      <Loader2 size={18} className={styles.loader} />
                    ) : (
                      <Send size={18} />
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

