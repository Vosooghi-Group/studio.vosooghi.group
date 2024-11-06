"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";
import styles from "./styles.module.scss";
import Nav from "./nav/index";

const menu = {
  open: {
    width: "110%",
    height: "640px",
    top: "-5px",
    right: "-5px",
    transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    width: "40px",
    height: "40px",
    top: "0px",
    right: "0px",
    transition: {
      duration: 0.75,
      delay: 0.35,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export default function Index() {
  const [isActive, setIsActive] = useState(false);
  const toggleMenu = () => {
    setIsActive(!isActive);
  };
  return (
    <div className={`${styles.header}`}>
      <motion.div
        className={`${styles.menu}`}
        variants={menu}
        animate={isActive ? "open" : "closed"}
        initial="closed"
      >
        <AnimatePresence>
          {isActive && <Nav toggleMenu={toggleMenu} />}
        </AnimatePresence>
      </motion.div>
      <Button isActive={isActive} toggleMenu={toggleMenu} />
    </div>
  );
}
