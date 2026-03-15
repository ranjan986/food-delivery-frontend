import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div>
                        <Link to="/" className="text-3xl font-extrabold text-white tracking-tight mb-4 inline-block">
                            QuickBite<span className="text-secondary">.</span>
                        </Link>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Order fresh and delicious food from the best restaurants in town. Fast delivery, hot food, and great service.
                        </p>
                        <div className="flex gap-4">
                            {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
                                <a key={index} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                                    <Icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-6 text-white border-b-2 border-primary inline-block pb-2">Company</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li><Link to="/about" className="hover:text-primary transition-colors hover:pl-2 duration-200 block">About Us</Link></li>
                            <li><Link to="/careers" className="hover:text-primary transition-colors hover:pl-2 duration-200 block">Careers</Link></li>
                            <li><Link to="/team" className="hover:text-primary transition-colors hover:pl-2 duration-200 block">Our Team</Link></li>
                            <li><Link to="/blog" className="hover:text-primary transition-colors hover:pl-2 duration-200 block">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-6 text-white border-b-2 border-primary inline-block pb-2">Support</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li><Link to="/contact" className="hover:text-primary transition-colors hover:pl-2 duration-200 block">Contact Us</Link></li>
                            <li><Link to="/faq" className="hover:text-primary transition-colors hover:pl-2 duration-200 block">FAQ</Link></li>
                            <li><Link to="/terms" className="hover:text-primary transition-colors hover:pl-2 duration-200 block">Terms of Service</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary transition-colors hover:pl-2 duration-200 block">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-6 text-white border-b-2 border-primary inline-block pb-2">Newsletter</h3>
                        <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-primary border border-gray-700 placeholder-gray-500"
                            />
                            <button className="bg-primary hover:bg-red-600 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-primary/30">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} QuickBite. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
