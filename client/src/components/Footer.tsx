import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#050B16] border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group cursor-pointer w-fit">
              <div className="w-8 h-8 rounded bg-cyan-500 flex items-center justify-center">
                <span className="text-[#0A1428] font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold font-display tracking-tight text-white">
                TIR<span className="text-cyan-400">Photonics</span>
              </span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
              Pioneering advanced photonic integrated circuits for next-generation telecommunications, 
              sensing, and quantum computing applications.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Products", href: "/products" },
                { label: "Capabilities", href: "/capabilities" },
                { label: "Publications", href: "/publications" },
                { label: "About Us", href: "/team" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-cyan-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li>123 Research Park Blvd</li>
              <li>Palo Alto, CA 94304</li>
              <li className="pt-2">
                <a href="mailto:info@tirphotonics.com" className="hover:text-cyan-400 transition-colors">
                  info@tirphotonics.com
                </a>
              </li>
              <li>
                <a href="tel:+15551234567" className="hover:text-cyan-400 transition-colors">
                  +1 (555) 123-4567
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} TIR Photonics. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
