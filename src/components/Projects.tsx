"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import styles from "./Projects.module.css";

const projects = [
  {
    id: 1,
    title: "MealCondo",
    role: "Co-Founder & CTO",
    description: "An AI-powered kitchen assistant designed for the modern home. Transforms how people interact with food and cooking through intelligent recipe suggestions, smart meal planning, intelligent shopping list, personalized nutrition guidance, e.t.c.",
    tags: ["Next.js", "Expo - React Native", "NestJS", "FastAPI", "LLMs", "AWS S3"],
    liveUrl: "https://www.mealcondo.com/",
    repoUrl: null,
    image: null,
  },
  {
    id: 2,
    title: "DevotionHub",
    role: "Senior Backend Engineer",
    description: "A faith-based mobile platform connecting users with daily devotionals, worship music, and prayer communities. Features include personalized ministry feeds, Bible reading streaks, Prayer Room and Prayer Bank, podcast streaming, and verse of the day. Built on serverless architecture to serve a growing community with seamless performance and AI-powered content recommendations.",
    tags: ["Serverless", "Hono.js", "TypeScript", "PostgreSQL", "AWS Lambda", "OpenAI API", "AWS S3"],
    liveUrl: "https://devotionhub.com",
    repoUrl: null,
    image: "/projects/devotionhub.png",
  },
  {
    id: 3,
    title: "QuickLeap Platform",
    role: "Chief Technology Officer",
    description: "A comprehensive food and agriculture supply chain platform connecting producers, processors, and consumers. Built entire backend infrastructure from scratch including inventory management, order processing, and delivery logistics. Includes blockchain-based token system for transparent transactions.",
    tags: ["NestJS", "TypeScript", "PostgreSQL", "MongoDB", "Azure", "Solidity"],
    liveUrl: "https://www.quickleap.co/",
    repoUrl: null,
    image: "/projects/quickleap.png",
  },
];

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Featured Projects
        </motion.h2>
        
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <motion.div 
              key={project.id} 
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
              }}
            >
              {project.image ? (
                <div 
                  className={styles.imageContainer}
                  style={{ 
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              ) : (
                <div className={styles.imagePlaceholder} />
              )}
              <div className={styles.content}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectRole}>{project.role}</p>
                <p className={styles.projectDescription}>{project.description}</p>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <motion.span 
                      key={tag} 
                      className={styles.tag}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                <div className={styles.links}>
                  <Link href={project.liveUrl} className={styles.link}>
                    <motion.span
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                      Live Site <ExternalLink size={16} />
                    </motion.span>
                  </Link>
                  {project.repoUrl && (
                    <Link href={project.repoUrl} className={styles.link}>
                      <motion.span
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                      >
                        GitHub <Github size={16} />
                      </motion.span>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
