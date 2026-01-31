import { motion } from "framer-motion";
import { ArrowRight, Cpu, Layers, Zap, Activity } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0 z-0">
          {/* Abstract network tech background */}
          <img 
            src="https://pixabay.com/get/g346a8c0ff52302cbef566d3fa144e9d12a45894d164a64734832e232e0e90697c0ce3e23749e0833d709c57096f3c4ec15df2e07e96b6f03c45202a13982e42f_1280.jpg" 
            alt="Circuit background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1428] via-[#0A1428]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1428] via-transparent to-[#0A1428]/50" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 pt-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-sm mb-6">
                NEXT GEN PHOTONICS
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-tight mb-8">
                Light at the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Speed of Thought
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
                Advanced Photonic Integrated Circuits designed for high-performance computing, sensing, and telecommunications.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products" className="inline-flex items-center justify-center px-8 py-4 bg-cyan-500 text-[#0A1428] font-bold rounded-lg hover:bg-cyan-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                  Explore Products
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-lg hover:bg-white/5 transition-all duration-300 backdrop-blur-sm">
                  Contact Sales
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Advantages */}
      <section className="py-24 bg-[#0A1428] relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Why TIR Photonics?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              We push the boundaries of physics to deliver integrated circuits that outperform traditional electronics in speed, bandwidth, and efficiency.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-10 h-10 text-cyan-400" />,
                title: "Ultra-Low Loss",
                desc: "Proprietary waveguide geometry reducing signal attenuation to theoretical limits."
              },
              {
                icon: <Cpu className="w-10 h-10 text-blue-500" />,
                title: "High Density Integration",
                desc: "Pack more functionality into smaller footprints with our nanometer-scale precision."
              },
              {
                icon: <Activity className="w-10 h-10 text-purple-500" />,
                title: "Wide Bandwidth",
                desc: "Operate across typical telecom bands (O, C, L) and extending into mid-IR."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group hover:bg-white/10"
              >
                <div className="mb-6 p-4 rounded-xl bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Preview */}
      <section className="py-24 relative overflow-hidden">
        {/* Abstract chip detail background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop" 
            alt="Chip Technology" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-[#0A1428]/90" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                Silicon Photonics <br />
                <span className="text-cyan-400">Redefined</span>
              </h2>
              <div className="space-y-6">
                <p className="text-gray-300 text-lg leading-relaxed">
                  Our platform leverages standard CMOS processes to manufacture photonic circuits at scale. By integrating lasers, modulators, and detectors on a single chip, we reduce complexity and cost.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  From data center interconnects to LiDAR sensors for autonomous vehicles, our technology powers the future.
                </p>
                <div className="pt-4">
                  <Link href="/capabilities" className="text-cyan-400 font-bold hover:text-cyan-300 flex items-center gap-2 group">
                    View Manufacturing Process 
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
                {/* Clean lab background */}
                <img 
                  src="https://pixabay.com/get/g035411c575e5674e9f770e99fb1fd2c5f4f1710f59fbb019948660ae300858c2dbe8c958911875d24d4020cc9f4f0b61df4829828bd22c9cf4d2d4dc9229faea_1280.jpg" 
                  alt="Lab" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1428] to-transparent opacity-80" />
                
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-cyan-400 font-mono text-sm mb-1">FACILITY</p>
                      <h3 className="text-2xl font-bold text-white">Class 100 Cleanroom</h3>
                    </div>
                    <Layers className="text-white w-8 h-8 opacity-50" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-[#0A1428] to-[#050B16]">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto p-12 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Ready to Accelerate?</h2>
              <p className="text-gray-400 mb-8 text-lg">
                Partner with us to develop custom photonic solutions for your specific application needs.
              </p>
              <Link href="/contact" className="inline-block px-8 py-4 bg-cyan-500 text-[#0A1428] font-bold rounded-lg hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transform hover:-translate-y-1">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
