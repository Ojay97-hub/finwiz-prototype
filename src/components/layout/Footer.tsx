import Link from 'next/link';
import { Shield, Trophy, Users, Sparkles } from 'lucide-react';

export default function Footer() {
    const currentYear = 2025;

    return (
        <footer className="bg-gradient-to-b from-[#120048] to-[#0a0028] text-white pt-20 pb-8 relative overflow-hidden">
            {/* Subtle background glow effects */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-[#2F04B0]/20 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-[#FFB602]/10 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Newsletter Section */}
            <div className="max-w-[1440px] mx-auto px-4 lg:px-8 text-center mb-20 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFB602]/10 rounded-full mb-6">
                    <Sparkles className="w-4 h-4 text-[#FFB602]" />
                    <span className="text-sm font-medium text-[#FFB602]">Newsletter</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FFD466] via-[#FFB602] to-[#FFD466] bg-clip-text text-transparent">
                    Stay ahead of your financial game
                </h2>
                <p className="text-white/70 mb-10 font-medium text-lg max-w-xl mx-auto">
                    Get exclusive insights, tips, and early access to new features!
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email address..."
                        className="flex-1 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-[#FFB602]/50 focus:bg-white/15 transition-all font-medium"
                    />
                    <button className="px-8 py-4 bg-gradient-to-r from-[#FFB602] to-[#FFD466] text-[#120048] font-bold rounded-2xl hover:shadow-lg hover:shadow-[#FFB602]/25 transition-all text-sm hover:scale-[1.02] active:scale-[0.98]">
                        Subscribe Now
                    </button>
                </div>
            </div>

            {/* Divider */}
            <div className="max-w-[1440px] mx-auto px-4 lg:px-8 mb-16">
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-16">
                    {/* Brand Column */}
                    <div className="md:col-span-5 lg:col-span-4">
                        <Link href="/dashboard" className="block mb-8 group">
                            {/* Refined Logo */}
                            <div className="flex items-center gap-1">
                                <span className="text-4xl font-light tracking-tight text-white group-hover:text-[#FFB602] transition-colors">
                                    Fin
                                </span>
                                <span className="text-4xl font-bold tracking-tight bg-gradient-to-r from-[#FFB602] to-[#FFD466] bg-clip-text text-transparent">
                                    Wiz
                                </span>
                                <div className="w-2 h-2 bg-[#FFB602] rounded-full ml-1 animate-pulse"></div>
                            </div>
                        </Link>
                        <p className="text-white/60 text-base leading-relaxed max-w-sm mb-8">
                            Empowering your financial journey with AI-driven insights and seamless money management.
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-4">
                            {['Twitter', 'LinkedIn', 'Instagram', 'GitHub'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#FFB602] hover:border-[#FFB602]/50 hover:bg-[#FFB602]/10 transition-all"
                                    title={social}
                                >
                                    <span className="text-xs font-bold">{social[0]}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
                        <div>
                            <h3 className="font-bold text-base mb-6 text-white/90 uppercase tracking-wider text-sm">Product</h3>
                            <ul className="space-y-4">
                                {['Personal Finance', 'Business Banking', 'Investment Tools', 'Credit Cards', 'Loans'].map((item) => (
                                    <li key={item}>
                                        <Link
                                            href="#"
                                            className="text-white/60 hover:text-[#FFB602] transition-colors text-sm font-medium flex items-center gap-2 group"
                                        >
                                            <span className="w-0 h-px bg-[#FFB602] group-hover:w-3 transition-all duration-300"></span>
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-base mb-6 text-white/90 uppercase tracking-wider text-sm">Company</h3>
                            <ul className="space-y-4">
                                {['About Us', 'Careers', 'Press', 'Blog', 'Contact'].map((item) => (
                                    <li key={item}>
                                        <Link
                                            href="#"
                                            className="text-white/60 hover:text-[#FFB602] transition-colors text-sm font-medium flex items-center gap-2 group"
                                        >
                                            <span className="w-0 h-px bg-[#FFB602] group-hover:w-3 transition-all duration-300"></span>
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-base mb-6 text-white/90 uppercase tracking-wider text-sm">Support</h3>
                            <ul className="space-y-4">
                                {['Help Center', 'Security', 'Privacy Policy', 'Terms of Service', 'API Docs'].map((item) => (
                                    <li key={item}>
                                        <Link
                                            href="#"
                                            className="text-white/60 hover:text-[#FFB602] transition-colors text-sm font-medium flex items-center gap-2 group"
                                        >
                                            <span className="w-0 h-px bg-[#FFB602] group-hover:w-3 transition-all duration-300"></span>
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6">
                    <p className="text-white/50 text-sm font-medium">
                        © {currentYear} FinWiz. All Rights Reserved
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFB602]/20 to-[#FFD466]/10 flex items-center justify-center">
                                <Shield className="w-4 h-4 text-[#FFB602]" />
                            </div>
                            <span className="text-sm font-medium text-white/80">Bank-level security</span>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFB602]/20 to-[#FFD466]/10 flex items-center justify-center">
                                <Trophy className="w-4 h-4 text-[#FFB602]" />
                            </div>
                            <span className="text-sm font-medium text-white/80">Award-winning support</span>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFB602]/20 to-[#FFD466]/10 flex items-center justify-center">
                                <Users className="w-4 h-4 text-[#FFB602]" />
                            </div>
                            <span className="text-sm font-medium text-white/80">5M+ happy users</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
