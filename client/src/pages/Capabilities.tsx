import { PageHeader } from "@/components/PageHeader";
import { motion } from "framer-motion";
import { PenTool, Box, Microscope, Settings } from "lucide-react";

export default function Capabilities() {
  const steps = [
    {
      title: "Design & Simulation",
      desc: "Custom photonic circuit design using industry-leading Lumerical and COMSOL suites. We optimize geometry for minimal loss and maximum efficiency.",
      icon: <PenTool className="w-8 h-8" />
    },
    {
      title: "Nano-Fabrication",
      desc: "CMOS-compatible manufacturing processes including E-beam lithography, RIE etching, and thin-film deposition in Class 100 cleanrooms.",
      icon: <Settings className="w-8 h-8" />
    },
    {
      title: "Characterization",
      desc: "Comprehensive testing including insertion loss measurement, spectral analysis, and high-speed data transmission testing up to 100 Gbps.",
      icon: <Microscope className="w-8 h-8" />
    },
    {
      title: "Packaging",
      desc: "Fiber-to-chip coupling, thermal management solutions, and ruggedized housing for deployment in harsh environments.",
      icon: <Box className="w-8 h-8" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A1428]">
      {/* Cleanroom / Lab background */}
      <PageHeader 
        title="Engineering Capabilities" 
        subtitle="End-to-end silicon photonics development from concept to packaged product."
        bgImage="https://images.unsplash.com/photo-1574352067721-72d5913ef3e1?q=80&w=2074&auto=format&fit=crop"
      />

      {/* Process Infographic Section */}
      <div className="container mx-auto px-4 md:px-6 py-24">
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="relative"
              >
                <div className="w-24 h-24 mx-auto bg-[#0F1C44] rounded-full border-2 border-cyan-500/50 flex items-center justify-center text-cyan-400 mb-8 relative z-10 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                  {step.icon}
                </div>
                
                <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors h-full">
                  <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Section */}
      <section className="py-24 bg-[#050B16]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://pixabay.com/get/g370a148c222c58f7fe837cd223719ca79f8b34025e92b3a5eba4bb1da8fc783a7234f98dfda50820c5cb270783291d793a51b8e57c2f3ffba4d5385960f21a71_1280.jpg" 
                alt="Lab Equipment" 
                className="w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0A1428]/80 to-transparent" />
            </div>

            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-6">Precision Engineering</h2>
              <div className="space-y-6 text-gray-400">
                <p>
                  Our fabrication facility utilizes state-of-the-art lithography systems capable of 10nm feature sizes, essential for creating high-Q resonators and ultra-compact waveguides.
                </p>
                <p>
                  We maintain strict quality control throughout the manufacturing process, utilizing automated optical inspection (AOI) and electrical probing at the wafer level to ensure high yield and reliability.
                </p>
                <ul className="space-y-3 pt-4">
                  {["100+ Wafer per month capacity", "Automated Optical Inspection", "ISO 9001 Certified Processes"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-cyan-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
