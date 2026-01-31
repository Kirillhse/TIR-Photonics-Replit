import { PageHeader } from "@/components/PageHeader";
import { useTeam } from "@/hooks/use-team";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Team() {
  const { data: team, isLoading } = useTeam();

  return (
    <div className="min-h-screen bg-[#0A1428]">
      {/* Conference / People background */}
      <PageHeader 
        title="Our Team" 
        subtitle="Physicists, engineers, and visionaries dedicated to the future of light."
        bgImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
      />

      <div className="container mx-auto px-4 md:px-6 py-20">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-3xl font-bold text-white mb-6">The Minds Behind TIR</h2>
          <p className="text-gray-400 leading-relaxed">
            Founded in 2023, TIR Photonics brings together experts from Stanford, MIT, and leading semiconductor companies. Our collective expertise spans quantum mechanics, material science, and high-volume manufacturing.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {team?.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-[#0F1C44]/30 rounded-2xl overflow-hidden border border-white/5 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="aspect-[3/4] overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1428] via-transparent to-transparent opacity-80 z-10" />
                  <img 
                    src={member.imageUrl} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                    <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-cyan-400 font-mono text-sm uppercase tracking-wider mb-3">{member.role}</p>
                    <div className="h-0.5 w-12 bg-cyan-500/50 mb-3 group-hover:w-full transition-all duration-500" />
                    <p className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                      {member.expertise}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
