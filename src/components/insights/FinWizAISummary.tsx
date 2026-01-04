'use client';

import { Wand2 } from 'lucide-react';

export default function FinWizAISummary() {
    return (
        <section className="mb-14 relative">
            <h2 className="text-xl font-bold text-[#120048] mb-6">FinWiz AI data summary</h2>

            <div className="relative">
                {/* Gradient Container */}
                <div className="w-full bg-gradient-to-r from-[#7159b6] via-[#f2645d] to-[#ffb602] rounded-[20px] p-5 relative shadow-sm">
                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
                        {/* Card 1 */}
                        <div className="bg-[#fcfcfd] rounded-[12px] p-4 flex items-center h-full min-h-[80px]">
                            <p className="text-sm font-medium text-[#120048] leading-tight">
                                Your savings grew <span className="text-[#00a326] font-bold">12%</span> faster than expenses last month, keeping you on track with your budget goals.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-[#fcfcfd] rounded-[12px] p-4 flex items-center h-full min-h-[80px]">
                            <p className="text-sm font-medium text-[#120048] leading-tight">
                                Entertainment spend has doubled since January, now accounting for <span className="text-[#f2645d] font-bold">15%</span> of total outgoings.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-[#fcfcfd] rounded-[12px] p-4 flex items-center h-full min-h-[80px]">
                            <p className="text-sm font-medium text-[#120048] leading-tight">
                                Annual expenses are trending upwards, projected to reach <span className="text-[#f2645d] font-bold">£2,600</span> by June if current habits continue.
                            </p>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-[#fcfcfd] rounded-[12px] p-4 flex items-center h-full min-h-[80px]">
                            <p className="text-sm font-medium text-[#120048] leading-tight">
                                Top expenses remain Travel, Rent, and Food, with Travel taking the lead at just over <span className="text-[#f76559] font-bold">£2k</span> this quarter.
                            </p>
                        </div>
                    </div>

                    {/* Wizard Icon - Positioned Top Right, overlapping */}
                    <div className="absolute -top-6 -right-2 md:-right-4 w-14 h-14 md:w-16 md:h-16 bg-[#FF6B5A] rounded-2xl md:rounded-[20px] shadow-lg flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform cursor-pointer border-4 border-white z-10">
                        <span className="text-2xl md:text-3xl filter drop-shadow-md">🧙</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
