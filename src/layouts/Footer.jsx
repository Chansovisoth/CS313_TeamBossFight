// ===== LIBRARIES ===== //
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faInstagram,
    faLinkedin,
    faXTwitter,
    faReddit,
    faGithub,
    faBluesky,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#18181b] dark:brightness-65 dark:hover:brightness-95 transition-[filter] duration-300 ease-in-out text-white py-8">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 items-center text-center md:text-left gap-6">

                {/* Logo and Tagline */}
                <div className="logo-container flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-center text-left sm:text-center gap-2 sm:gap-4 min-w-0">

                    <img
                        className="footer-logo-image w-10 sm:w-12 md:w-16 h-auto object-contain shrink-0"
                        src="/src/assets/Swords.png"
                        alt="Team Boss Fight"
                    />
                    {/* <h1 className="footer-logo-title text-center sm:text-left" data-text="Ballot Pilot">
                        Ballot<br />Pilot
                    </h1> */}
                </div>


                {/* Social Media Icons */}
                <div className="flex justify-center space-x-6 text-2xl">
                    <a href="#" aria-label="BlueSky" className="footer-icon hover:text-sky-400 transition-colors">
                        <FontAwesomeIcon icon={faBluesky} />
                    </a>
                    <a href="#" aria-label="Reddit" className="footer-icon hover:text-orange-500 transition-colors">
                        <FontAwesomeIcon icon={faReddit} />
                    </a>
                    <a href="#" aria-label="LinkedIn" className="footer-icon hover:text-blue-400 transition-colors">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href="#" aria-label="GitHub" className="footer-icon hover:text-white transition-colors">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                </div>

                {/* Copyright */}
                <div className="text-sm text-gray-400 flex justify-center md:justify-end">
                    © {currentYear} UniRaid. All rights reserved.
                </div>
            </div>
            
            {/* University Credit */}
            <div className="text-center mt-2 pt-0">
              <p className="text-xs text-gray-400">
                Developed as part of CS 313 - Software Engineering Final Project
              </p>
              <p className="text-xs text-gray-400">
                Paragon International University
              </p>
            </div>
        </footer>
    );
};

export default Footer;
