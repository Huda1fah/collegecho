
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-transparent to-muted/30">
      <div className="spacer wave1"></div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo to-primary bg-clip-text text-transparent">
              Campus Echo
            </h2>
            <p className="text-sm text-muted-foreground">
              Connecting Indian college students through discussions, resources, and community.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-primary">Home</Link>
              </li>
              <li>
                <Link to="/forums" className="text-sm hover:text-primary">Forums</Link>
              </li>
              <li>
                <Link to="/exams" className="text-sm hover:text-primary">Entrance Exams</Link>
              </li>
              <li>
                <Link to="/colleges" className="text-sm hover:text-primary">College Groups</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-sm hover:text-primary">Help Center</Link>
              </li>
              <li>
                <Link to="/guidelines" className="text-sm hover:text-primary">Community Guidelines</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm hover:text-primary">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm hover:text-primary">Terms of Service</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Subscribe to Newsletter</h3>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Stay updated with the latest features, tips, and community news.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-2 rounded-l-md border border-r-0 border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary w-full"
                />
                <Button className="rounded-l-none bg-primary">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Campus Echo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
