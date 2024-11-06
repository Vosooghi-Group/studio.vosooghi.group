import { motion } from "framer-motion";
import styles from "./style.module.scss";
import { TbMenu } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";

export default function Button({
  isActive,
  toggleMenu,
}: {
  isActive: boolean;  // Change 'Boolean' to 'boolean'
  toggleMenu: () => void;
}) {
  return (
    <div className={`${styles.button} `}>
      <motion.div
        className={styles.slider}
        animate={{ top: isActive ? "-100%" : "0%" }}
        transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1] }}
      >
        <div
          className={styles.el}
          onClick={() => {
            toggleMenu();
          }}
        >
          <PerspectiveText
            label={
              <div className="flex items-center  justify-center text-black">
                <TbMenu className="text-lg" />
              </div>
            }
          />
        </div>
        <div
          className={styles.el}
          onClick={() => {
            toggleMenu();
          }}
        >
          <PerspectiveText
            label={
              <div className="flex items-center justify-center text-white">
                <IoMdClose className="text-lg" />
              </div>
            }
          />
        </div>
      </motion.div>
    </div>
  );
}

interface PerspectiveTextProps {
  label: React.ReactNode;  // Use React.ReactNode instead of 'any'
}

function PerspectiveText({ label }: PerspectiveTextProps) {
  return (
    <div className={styles.perspectiveText}>
      <div className="">{label}</div>
    </div>
  );
}