"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import styles from "./Experience.module.css";

const experiences = [
  {
    id: 1,
    role: "Co-Founder & CTO",
    company: "Intelligent Food Solutions",
    companyUrl: "https://www.intelligentfoodsolutions.com/",
    date: "Sep 2025 - Present",
    description: "Building intelligent technology to redefine the food ecosystem. Leading development of MealCondo—an AI kitchen assistant designed for the modern home that transforms how people interact with food and cooking.",
    tags: ["Next.js", "React Native", "Expo", "NestJS", "FastAPI", "Python", "LLMs", "AWS S3", "Product Development"],
    products: [{ name: "MealCondo", url: "https://www.mealcondo.com/" }, { name: "MealCondo Chef", url: "https://www.mealcondo.com/" }],
  },
  {
    id: 2,
    role: "Senior Backend Engineer",
    company: "MESiERE",
    companyUrl: "https://www.mesiere.com/",
    date: "Jul 2025 - Present",
    description: "Own and deliver end-to-end features across the stack. Architect scalable serverless backend systems powering high-traffic applications. Manage OpenAI API integrations for AI-powered features and AWS S3 for media storage infrastructure. Work cross-functionally with product, frontend, mobile, and QA teams to ship production-grade solutions.",
    tags: ["Serverless", "Hono.js", "TypeScript", "PostgreSQL", "MongoDB", "AWS Lambda", "OpenAI API", "AWS S3"],
    products: [{ name: "DevotionHub", url: "https://devotionhub.com" }],
  },
  {
    id: 3,
    role: "Chief Technology Officer",
    company: "Quick Leap",
    companyUrl: "https://www.quickleap.co/",
    date: "Jul 2024 - Present",
    description: "Lead technology strategy and engineering team. Built entire backend infrastructure and APIs from scratch. Manage cloud architecture, deployment pipelines, and operations ensuring 99.9% uptime. Drive technical vision while aligning engineering efforts with business objectives. Currently building blockchain-based token infrastructure.",
    tags: ["NestJS", "TypeScript", "PostgreSQL", "MongoDB", "Azure", "Solidity", "Hardhat"],
  },
  {
    id: 4,
    role: "Lead Backend Engineer",
    company: "Dado Food",
    companyUrl: null,
    date: "Aug 2022 - Jul 2025 · 3 yrs",
    description: "Led engineering across backend, infrastructure, and internal tools for a logistics and commerce platform. Architected core systems including: wallet infrastructure for vendor sales and rider earnings; customer APIs for location-based discovery, real-time ordering, and multi-gateway payments; smart order routing with proximity-based rider assignment; vendor management APIs; and admin dashboard systems. Drove platform reliability, delivery efficiency, and user experience improvements across all stakeholder groups.",
    tags: ["NestJS", "Python", "FastAPI", "PostgreSQL", "MongoDB", "Express.js", "TypeScript", "AWS S3"],
    achievements: [
      "Built wallet service handling financial transactions for vendors and riders",
      "Designed smart routing algorithm optimizing delivery assignments",
      "Led team building SmartMenu.ai product",
    ],
  },
  {
    id: 5,
    role: "Backend Engineer",
    company: "Forcythe",
    companyUrl: "https://forcythe.com/",
    date: "Jan 2024 - Sep 2024",
    description: "Designed, developed, and maintained APIs powering Perime.co—a platform enabling users to explore and engage with the unique rhythm of any city. Built scalable backend systems supporting location-based features and real-time user interactions.",
    tags: ["NestJS", "TypeScript", "PostgreSQL"],
    products: [{ name: "Perime", url: "https://perime.co/" }],
  },
];

export default function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.container}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Professional Experience
        </motion.h2>
        
        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.id} 
              className={styles.item}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.dot} />
              <div className={styles.header}>
                <h3 className={styles.role}>{exp.role}</h3>
                <div className={styles.companyWrapper}>
                  {exp.companyUrl ? (
                    <a 
                      href={exp.companyUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.companyLink}
                    >
                      {exp.company}
                      <ExternalLink size={14} className={styles.linkIcon} />
                    </a>
                  ) : (
                    <div className={styles.company}>{exp.company}</div>
                  )}
                </div>
              </div>
              <span className={styles.date}>{exp.date}</span>
              <p className={styles.description}>{exp.description}</p>
              
              {exp.products && exp.products.length > 0 && (
                <div className={styles.products}>
                  {exp.products.map((product) => (
                    <a
                      key={product.name}
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.productLink}
                    >
                      → {product.name}
                      <ExternalLink size={12} />
                    </a>
                  ))}
                </div>
              )}
              
              {exp.achievements && (
                <ul className={styles.achievements}>
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              )}
              
              <div className={styles.tags}>
                {exp.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
