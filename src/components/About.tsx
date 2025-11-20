"use client";

import { motion } from "framer-motion";
import styles from "./About.module.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};


export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <motion.div 
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 className={styles.title} variants={itemVariants}>
            Engineering Leader & System Architect
          </motion.h2>
          <motion.p className={styles.text} variants={itemVariants}>
            I'm a <span className={styles.highlight}>Senior Full Stack Software Engineer</span> with extensive experience building production-grade systems that scale. From architecting backend infrastructure to leading engineering teams, I've delivered end-to-end solutions that power real businesses and serve real users.
          </motion.p>
          <motion.p className={styles.text} variants={itemVariants}>
            My expertise spans <span className={styles.highlight}>cloud architecture, API design, and distributed systems</span>. I've built wallet infrastructure handling financial transactions, designed smart routing algorithms for logistics platforms, and led teams shipping products from concept to production. Currently, I'm expanding into <span className={styles.highlight}>applied machine learning</span> to build intelligent, data-driven solutions.
          </motion.p>
          
          <motion.div 
            className={styles.stats}
            variants={containerVariants}
          >
            <motion.div className={styles.statItem} variants={statVariants}>
              <span className={styles.statValue}>5+</span>
              <span className={styles.statLabel}>Years Experience</span>
            </motion.div>
            <motion.div className={styles.statItem} variants={statVariants}>
              <span className={styles.statValue}>2</span>
              <span className={styles.statLabel}>CTO Roles</span>
            </motion.div>
            <motion.div className={styles.statItem} variants={statVariants}>
              <span className={styles.statValue}>10+</span>
              <span className={styles.statLabel}>Technologies</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
