import { PageHeader } from "@/components/PageHeader";
import { usePublications } from "@/hooks/use-publications";
import { Loader2, ExternalLink, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function Publications() {
  const { data: publications, isLoading } = usePublications();

  return (
    <div className="min-h-screen bg-[#0A1428]">
      {/* Books / Library / Research background */}
      <PageHeader 
        title="Research & Publications" 
        subtitle="Contributing to the global body of knowledge in integrated photonics."
        bgImage="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2190&auto=format&fit=crop"
      />

      <div className="container mx-auto px-4 md:px-6 py-20">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {publications?.map((pub, i) => (
              <motion.a
                href={pub.doiUrl}
                target="_blank"
                rel="noopener noreferrer"
                key={pub.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="block p-8 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-start gap-6">
                  <div className="hidden md:flex flex-shrink-0 w-16 h-16 rounded-full bg-[#0F1C44] items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <FileText className="w-8 h-8" />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {pub.title}
                    </h3>
                    <p className="text-gray-400 mb-3">{pub.authors}</p>
                    <div className="flex items-center gap-4 text-sm font-mono text-gray-500">
                      <span className="text-cyan-500/80">{pub.journal}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-600" />
                      <span>{pub.year}</span>
                    </div>
                  </div>

                  <ExternalLink className="w-6 h-6 text-gray-500 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
