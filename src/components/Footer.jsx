import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Liste de tes réseaux sociaux avec tes liens personnels
  const socialLinks = [
    {
      name: "FB",
      url: "https://web.facebook.com/reda.badar.75", // (2) Facebook
      color: "hover:text-blue-700"
    },
    {
      name: "IG",
      url: "https://www.instagram.com/reda_e_laouni/",
      color: "hover:text-pink-600"
    },
    {
      name: "TW",
      url: "https://x.com/ElaouniRed7064",
      color: "hover:text-black"
    }
  ];

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Logo Section */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="bg-blue-600 p-1 rounded-lg group-hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-lg font-black text-gray-800 tracking-tight">
                Habit<span className="text-blue-600">Tracker</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm font-medium leading-relaxed">
              Construisez de meilleures habitudes, un jour à la fois.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-gray-800 font-bold text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-500 hover:text-blue-600 text-sm font-semibold transition-colors">Habits</Link></li>
              <li><Link to="/logs" className="text-gray-500 hover:text-blue-600 text-sm font-semibold transition-colors">Logs</Link></li>
              <li><Link to="/notifications" className="text-gray-500 hover:text-blue-600 text-sm font-semibold transition-colors">Notifications</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-gray-800 font-bold text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 hover:text-blue-600 text-sm font-semibold transition-colors">Aide & FAQ</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-600 text-sm font-semibold transition-colors">Confidentialité</a></li>
            </ul>
          </div>

          {/* Social Links Section - HNA FIN ZDNA LES LIENS DYALK */}
          <div className="space-y-4">
            <h4 className="text-gray-800 font-bold text-sm uppercase tracking-wider">Suivez-nous</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  target="_blank"  // Ouvre le lien dans un nouvel onglet
                  rel="noopener noreferrer" // Sécurité pour les liens externes
                  className={`w-10 h-10 bg-gray-50 flex items-center justify-center rounded-xl text-gray-400 transition-all font-bold text-xs border border-gray-100 shadow-sm hover:shadow-md hover:bg-white ${social.color}`}
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-50 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-[13px] font-medium">
            &copy; {currentYear} HabitTracker. Tous droits réservés.
          </p>
          <p className="text-[11px] font-bold text-gray-300 uppercase tracking-widest italic">
            Developed by Reda
          </p>
        </div>
        
      </div>
    </footer>
  );
}