import Link from 'next/link';
import { Shield, Trophy, Users } from 'lucide-react';

export default function Footer() {
    const currentYear = 2025; // Hardcoded to match design "@ 2025" or dynamic

    return (
        <footer className="bg-[#120048] text-white pt-16 pb-8">
            {/* Newsletter Section */}
            <div className="max-w-[1440px] mx-auto px-4 lg:px-8 text-center mb-16">
                <h2 className="text-3xl font-bold mb-3 text-[#FFD466]">Stay ahead of your financial game</h2>
                <p className="text-white/80 mb-8 font-medium">Get exclusive insights, tips, and early access to new features!</p>
                <div className="flex justify-center gap-3 max-w-lg mx-auto">
                    <input
                        type="email"
                        placeholder="Sign Up to the Newsletter...."
                        className="flex-1 px-6 py-3 rounded-[12px] bg-white text-[#120048] placeholder-text-muted text-sm focus:outline-none font-medium"
                    />
                    <button className="px-8 py-3 bg-[#EEF2FF] text-[#120048] font-bold rounded-[12px] hover:bg-white/90 transition-colors text-sm">
                        Subscribe
                    </button>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="md:col-span-5 lg:col-span-4">
                        <Link href="/dashboard" className="block mb-6">
                            {/* Estimated Outline Logo based on image */}
                            <svg width="180" height="50" viewBox="0 0 180 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5 45V5H42.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12.5 25H38.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M52.5 45V18M52.5 8V8.1" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M68.5 45V18L78.5 25L88.5 18V45" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M112.5 45H108.5L98.5 5H102.5L108.5 35L114.5 5H118.5L124.5 35L130.5 5H134.5L124.5 45H120.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M144.5 45V18M144.5 8V8.1" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M158.5 45H178.5L158.5 18H178.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <p className="text-white text-sm leading-relaxed max-w-sm">
                            Empowering your financial journey with AI-driven Insights and seamless money management.
                        </p>
                    </div>

                    {/* Links Grid */}
                    <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="font-bold text-lg mb-6">Product</h3>
                            <ul className="space-y-4 text-sm font-medium">
                                <li><Link href="#" className="hover:text-[#FFD466] transition-colors">Personal Finance</Link></li>
                                <li><Link href="#" className="hover:text-[#FFD466] transition-colors">Business Banking</Link></li>
                                <li><Link href="#" className="hover:text-[#FFD466] transition-colors">Investment Tools</Link></li>
                                <li><Link href="#" className="hover:text-[#FFD466] transition-colors">Credit Cards</Link></li>
                                <li><Link href="#" className="hover:text-[#FFD466] transition-colors">Loans</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-6">Company</h3>
                            <ul className="space-y-4 text-sm font-medium">
                                <li><Link href="#" className="hover:text-[#FFD466] transition-colors">About Us</Link></li>
                                <li><Link href="#" className="hover:text-[#FFD466] transition-colors">Careers</Link></li>
                                <li><Link href="#" className="hover:text-[#FFD466] transition-colors">Press</Link></li>
                                <li><Link href="#" className="hover:text-[#FFD466] transition-colors">Blog</Link></li>
                                <li><Link href="#" className="hover:text-[#FFD466] transition-colors">Contact</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-6">Support</h3>
                            <ul className="space-y-4 text-sm font-medium">
                                <li><Link href="#" className="hover:text-[#FFD466] transition-colors">Help Center</Link></li>
                                <li><Link href="#" className="hover:text-[#FFD466] transition-colors">Security</Link></li>
                                <li><Link href="#" className="hover:text-[#FFD466] transition-colors">Privacy Policy</Link></li>
                                <li><Link href="#" className="hover:text-[#FFD466] transition-colors">Terms of Service</Link></li>
                                <li><Link href="#" className="hover:text-[#FFD466] transition-colors">API Docs</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-white text-sm font-medium">
                        @ {currentYear} FinWiz. All Rights Reserved
                    </p>
                    <div className="flex gap-8 text-sm font-medium">
                        <span className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-[#FFD466]" />
                            Bank-level security
                        </span>
                        <span className="flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-[#FFD466]" />
                            Award-winning support
                        </span>
                        <span className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-[#FFD466]" />
                            5M+ happy users
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
