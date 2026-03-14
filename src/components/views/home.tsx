import { motion } from "framer-motion";
import { News } from "@/components/home/news";
import { Greeting } from "../home/greet";
import { useEffect, useState } from "react";
import axios from "axios";

export function Home() {
  const [profile, setProfile] = useState<string | null>(null);
  const authUserString = localStorage.getItem("authUser");
  const authUser = authUserString ? JSON.parse(authUserString) : null;
  const username = authUser?.username || "?";

  useEffect(() => {
    async function getSkin() {
      try {
        const res = await axios.get(
          "http://26.7.188.28:3551/api/launcher/skin?accountId=" +
            authUser?.accountId
        );

        if (!res.data.favorite_character) {
          setProfile("cid_001_athena_commando_f_default");
        } else {
          setProfile(res.data.favorite_character);
        }
      } catch (err) {
        console.error("Failed to fetch skin:", err);
        setProfile("cid_001_athena_commando_f_default");
      }
    }

    getSkin();
  }, [authUser?.accountId]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
          },
        },
      }}
      exit={{ opacity: 0, y: 30, scale: 0.9 }}
    >
      <div className="gap-4 flex flex-col mb-2">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          <Greeting
            username={username}
            skinImageUrl={`https://fortnite-api.com/images/cosmetics/br/${profile}/icon.png`}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          <News />
        </motion.div>
      </div>
    </motion.div>
  );
}
