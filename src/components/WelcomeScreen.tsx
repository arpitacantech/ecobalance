import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Leaf, TrendingUp } from "lucide-react";

export function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-card rounded-2xl shadow-lg p-12 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <img
              src="/src/images/clientlogo2.png" // path from public folder
              alt="My illustration"
              className="w-25 h-25 object-contain"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-4 text-5xl md:text-6xl font-extrabold tracking-tight"
          >
            Welcome to{" "}
            <span style={{ color: "#123a92ff", fontWeight: 600 }}>
              ECOBALANCE
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5 }}
  className="text-muted-foreground mb-10 max-w-md mx-auto"
  style={{ fontSize: "1.05rem", lineHeight: "2rem", fontWeight: 500}}
>
  Helping UK small businesses track their carbon footprint.
</motion.p>


          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={() => navigate("/dashboard")}
            className="bg-primary text-primary-foreground px-10 py-4 rounded-xl hover:bg-primary/90 transition-all duration-200 hover:shadow-lg uppercase tracking-wide"
            style={{ fontSize: "1.05rem", lineHeight: "2rem", fontWeight: 500}}
          >
            Enter Dashboard
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
