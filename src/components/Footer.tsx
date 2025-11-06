import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import cipmLogo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* About Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={cipmLogo} alt="CIPM Logo" className="h-20 w-20" />
              <h3 className="text-2xl font-bold font-serif">CIPM Abuja Branch</h3>
            </div>
            <p className="text-sm text-primary-foreground/80 mb-4">
              The Chartered Institute of Personnel Management of Nigeria (CIPM) Abuja Branch - 
              Empowering HR Excellence in the Federal Capital Territory.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/cipmabujazone" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/cipmabuja" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/company/cipm-abuja" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/cipmabuja" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-primary-foreground/80 hover:text-secondary transition-colors">Who We Are</Link></li>
              <li><Link to="/services" className="text-primary-foreground/80 hover:text-secondary transition-colors">What We Do</Link></li>
              <li><Link to="/membership" className="text-primary-foreground/80 hover:text-secondary transition-colors">Membership</Link></li>
              <li><Link to="/news" className="text-primary-foreground/80 hover:text-secondary transition-colors">News</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Plot 17 Benghazi Street, Wuse Zone 4, Abuja</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>08056357501</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>abuja@cipmnigeria.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/80">
          <p>&copy; {new Date().getFullYear()} CIPM Abuja Branch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}