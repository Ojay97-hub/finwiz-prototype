import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-brand-primary text-white">
            {/* Newsletter Section */}
            <div className="bg-gradient-purple-1 py-10">
                <div className="max-w-[1440px] mx-auto px-4 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold mb-2">Stay ahead of your financial game</h2>
                    <p className="text-white/80 mb-6">Get exclusive insights, tips, and early access to new features!</p>
                    <div className="flex justify-center gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Sign Up to the Newsletter..."
                            className="flex-1 px-4 py-2.5 rounded-lg bg-white text-text-primary placeholder-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                        <button className="px-6 py-2.5 bg-white text-brand-primary font-medium rounded-lg hover:bg-white/90 transition-colors text-sm">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/dashboard" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-gradient-orange-3 flex items-center justify-center">
                                <span className="text-sm">🧙</span>
                            </div>
                            <span className="text-lg font-bold">
                                Fin<span className="text-brand-logo">Wiz</span>
                            </span>
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Empowering your financial journey with AI-driven insights and seamless money management.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="font-semibold mb-4">Product</h3>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li><Link href="#" className="hover:text-white transition-colors">Personal Finance</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Business Banking</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Investment Tools</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Credit Cards</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Loans</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Press</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">API Docs</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/60 text-sm">
                        © {currentYear} FinWiz. All Rights Reserved
                    </p>
                    <div className="flex gap-6 text-sm text-white/60">
                        <span className="flex items-center gap-2">
                            <ShieldIcon className="w-4 h-4" />
                            Bank-level security
                        </span>
                        <span className="flex items-center gap-2">
                            <StarIcon className="w-4 h-4" />
                            Award-winning support
                        </span>
                        <span className="flex items-center gap-2">
                            <UsersIcon className="w-4 h-4" />
                            6M+ happy users
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function ShieldIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    );
}

function StarIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
    );
}

function UsersIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 00-3-3.87" />
            <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
    );
}
