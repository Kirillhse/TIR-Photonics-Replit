import { PageHeader } from "@/components/PageHeader";
import { useProducts } from "@/hooks/use-products";
import { motion } from "framer-motion";
import { useState } from "react";
import { Loader2, Zap } from "lucide-react";

export default function Products() {
  const { data: products, isLoading } = useProducts();
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Waveguides", "Bragg gratings", "Modulators", "Detectors"];

  const filteredProducts = products?.filter(p => 
    filter === "All" || p.category === filter
  );

  return (
    <div className="min-h-screen bg-[#0A1428]">
      {/* Abstract chip circuit background */}
      <PageHeader 
        title="Photonic Products" 
        subtitle="High-performance components engineered for the next era of optical computing and communication."
        bgImage="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop"
      />

      <div className="container mx-auto px-4 md:px-6 py-20">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === cat 
                  ? "bg-cyan-500 text-[#0A1428] shadow-[0_0_15px_rgba(0,240,255,0.4)]" 
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts?.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-[#0F1C44]/50 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                {/* Image Section */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1C44] to-transparent z-10 opacity-60" />
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">{product.category}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                    {product.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    {product.specs?.slice(0, 3).map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <Zap className="w-3 h-3 text-cyan-500" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full py-3 rounded-lg border border-cyan-500/30 text-cyan-400 font-semibold hover:bg-cyan-500 hover:text-[#0A1428] transition-all duration-300 uppercase text-xs tracking-widest">
                    View Specifications
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
