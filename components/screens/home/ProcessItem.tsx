import { PROCESS_STEPS } from "@/constants";
import { motion } from "framer-motion";
import { useState } from "react";

const ProcessItem = ({ item }: { item: (typeof PROCESS_STEPS)[0] }) => {
  const [active, setActive] = useState(false);

  return (
    <div className="w-[70%] border-t border-neutral-300">
      <div className="pt-8" />
      <div
        className="flex items-center font-normal cursor-pointer"
        onClick={() => setActive((prev) => !prev)}
      >
        <div className="w-1/12 text-xl">{item.title}</div>
        <div className="flex-1 text-3xl">{item.text}</div>
        <motion.div className="relative" animate={active ? "minus" : "plus"}>
          <motion.div
            variants={{ plus: { rotate: 90 }, minus: { rotate: 0 } }}
            className="absolute h-[2px] w-5 bg-neutral-800 right-0"
          />
          <motion.div className="absolute h-[2px] w-5 bg-neutral-800 right-0" />
        </motion.div>
      </div>

      <motion.div
        className="overflow-hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="pt-8" />
        <div className="flex">
          <div className="w-1/12" />
          <div className="font-light">{item.description}</div>
        </div>
      </motion.div>

      <div className="pt-10" />
    </div>
  );
};

export default ProcessItem;
