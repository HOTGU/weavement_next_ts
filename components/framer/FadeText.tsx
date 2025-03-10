import { motion } from "framer-motion";

export default ({
  children,
  duration = 0.5,
  delay = 0,
  type = "up",
  framerKey,
  className,
}: {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  type?: "up" | "down";
  framerKey?: string;
  className?: string;
}) => {
  return (
    <motion.div
      key={framerKey}
      initial={{ opacity: 0, y: type === "up" ? 30 : -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
