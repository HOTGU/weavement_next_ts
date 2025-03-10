import { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { slidingText } from "@/libs/framer";

export default ({
  children,
  duration = 0.8,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}) => {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration, delay }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};
