"use client";
import { motion } from "framer-motion";

export function News() {
  const panelStyles =
    "relative flex-1 flex flex-col justify-between border border-stone-800 min-h-[220px] overflow-hidden rounded-xl";

  const overlayStyles = "absolute inset-0 bg-black/60 z-0";

  const contentStyles =
    "relative z-10 p-4 flex flex-col justify-between h-full";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full flex flex-col md:flex-row gap-4 text-white relative"
    >
      <div className={panelStyles}>
        <img
          src="https://assetsio.gnwcdn.com/desert-coliseum.jpg?width=1200&height=630&fit=crop&enable=upscale&auto=png"
          alt="Welcome to Orbit"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className={overlayStyles} />

        <div className={contentStyles}>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Orbit</h2>
            <p className="text-sm text-gray-300 leading-relaxed">Season</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
