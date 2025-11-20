"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText, Calendar } from "lucide-react";
import { useEffect } from "react";
import styles from "./ResumeModal.module.css";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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

  const handleDownload = () => {
    // Trigger download
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Bezaleel_Nwabia_Resume.pdf";
    link.click();
    
    // Close modal after short delay
    setTimeout(() => onClose(), 500);
  };

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

          {/* Modal */}
          <div className={styles.modalContainer}>
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                className={styles.closeButton}
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} />
              </motion.button>

              {/* Icon */}
              <motion.div
                className={styles.iconContainer}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
              >
                <FileText size={48} />
              </motion.div>

              {/* Content */}
              <motion.div
                className={styles.content}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
              >
                <h2 className={styles.title}>Download Resume</h2>
                <p className={styles.description}>
                  You're about to download my professional resume. It includes my experience, skills, and projects.
                </p>

                {/* File Details */}
                <div className={styles.details}>
                  <div className={styles.detailItem}>
                    <FileText size={16} />
                    <span>PDF Format</span>
                  </div>
                  <div className={styles.detailItem}>
                    <Download size={16} />
                    <span>~250 KB</span>
                  </div>
                  <div className={styles.detailItem}>
                    <Calendar size={16} />
                    <span>Updated Nov 2025</span>
                  </div>
                </div>

                {/* Actions */}
                <div className={styles.actions}>
                  <motion.button
                    className={styles.downloadButton}
                    onClick={handleDownload}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Download size={20} />
                    Download Resume
                  </motion.button>
                  <motion.button
                    className={styles.cancelButton}
                    onClick={onClose}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
