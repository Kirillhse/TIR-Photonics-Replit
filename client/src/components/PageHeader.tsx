import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  bgImage?: string;
}

export function PageHeader({ title, subtitle, bgImage }: PageHeaderProps) {
  return (
    <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        {bgImage && (
          <img 
            src={bgImage} 
            alt={title} 
            className="w-full h-full object-cover opacity-20"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1428] via-[#0A1428]/90 to-[#0A1428]" />
        
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-cyan-500/5 blur-[100px] rounded-full transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-blue-600/10 blur-[80px] rounded-full transform -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-display font-bold text-white mb-6"
        >
          {title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-gray-400 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
}
