"use client";
import styles from "./style.module.scss";
import { motion } from "framer-motion";
import { links, footerLinks } from "./data";
import { perspective, slideIn } from "./anim";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function Nav({ toggleMenu }: { toggleMenu: () => void }) {
  const handleToggle = () => {
    toggleMenu();
  };

  return (
    <div className={styles.nav}>
      <div className={styles.body}>
        {links.map((link, i) => {
          const { title, href } = link;
          return (
            <div
              key={`b_${i}`}
              className={`${styles.linkContainer}`}
              onClick={handleToggle}
            >
              <Link href={href}>
                <motion.div
                  custom={i}
                  variants={perspective}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  className="flex items-center justify-between"
                >
                  <a className="">{title}</a>
                  <div className="bg-neutral-300 rounded-lg w-[40px] h-[40px] flex items-center justify-center">
                    <FaArrowLeft size={22} className="text-neutral-950 rotate-45" />
                  </div>
                </motion.div>
              </Link>
            </div>
          );
        })}
      </div>
      <motion.div className="grid grid-cols-2 gap-4 mt-10">
        {footerLinks.map((link, i) => {
          const { title, href, icon } = link;
          return (
            <Link href={href} key={`f_${i}`} target="_blank">
              <motion.a
                variants={slideIn}
                custom={i}
                initial="initial"
                animate="enter"
                exit="exit"
                className="text-neutral-400 rounded-full p-1.5 pl-4 flex items-center justify-between w-full gap-2"
              >
                {title}
                {icon}
              </motion.a>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}