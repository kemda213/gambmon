import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void; // YENİ: Tıklama özelliği eklendi
}

export const GlassCard = ({ children, className, hoverEffect = false, onClick }: GlassCardProps) => {
  return (
    <motion.div
      onClick={onClick} // YENİ: Tıklama fonksiyonu buraya bağlandı
      whileHover={hoverEffect ? { y: -5, boxShadow: "0 10px 40px -10px rgba(0,240,255,0.1)" } : {}}
      transition={{ type: "spring", stiffness: 300 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-glass-border",
        "bg-glass-100 backdrop-blur-xl", 
        "shadow-lg ring-1 ring-white/5",
        className
      )}
    >
      {/* İç Parıltı Efekti */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
};