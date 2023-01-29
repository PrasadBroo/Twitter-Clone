import React from "react";
import RootModelHeader from "./RootModelHeader";
import classNames from "classnames";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", duration: 0.5, bounce: 0.4 },
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
};

export default function RootModel({
  children,
  hideHeader,
  className,
  bcWhite,
  navigateTo,
}) {
  const rootModelClassnames = classNames("root-model-wrap", className);
  const rootModelWrapClassnames = classNames("root-model", {
    bcWhite: bcWhite,
  });
  return (
    <motion.div
      className={rootModelClassnames}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className={rootModelWrapClassnames}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {!hideHeader && (
          <RootModelHeader hideHeader={hideHeader} navigateTo={navigateTo} />
        )}
        {children}
      </motion.div>
    </motion.div>
  );
}
