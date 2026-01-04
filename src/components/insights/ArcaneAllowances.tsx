'use client';

import { useState } from 'react';
import { ChevronRight, ChevronLeft, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const allowanceCards = [
    {
        id: 'all',
        title: 'All cards',
        spend: 840,
        budget: 2100,
        status: 'On track',
        statusColor: '#00A326',
        bg: '#EFFCF5',
        percent: 40,
        trend: '+12% vs last month',
        remaining: 1260,
        avgLeft: 63,
        projected: 2000
    },
    {
        id: 'bills',
        title: 'Bills',
        spend: 750,
        budget: 900,
        status: 'Close to limit',
        statusColor: '#FFB800',
        bg: '#FFFBEB',
        percent: 83,
        trend: '+5% vs last month',
        remaining: 150,
        avgLeft: 10,
        projected: 890
    },
    {
        id: 'groceries',
        title: 'Groceries',
        spend: 310,
        budget: 500,
        status: 'On track',
        statusColor: '#00A326',
        bg: '#EFFCF5',
        percent: 62,
        trend: '-2% vs last month',
        remaining: 190,
        avgLeft: 12,
        projected: 480
    },
    {
        id: 'transport',
        title: 'Transport',
        spend: 145,
        budget: 250,
        status: 'On track',
        statusColor: '#00A326',
        bg: '#EFFCF5',
        percent: 58,
        trend: '+1% vs last month',
        remaining: 105,
        avgLeft: 8,
        projected: 240
    },
    {
        id: 'entertainment',
        title: 'Entertainment',
        spend: 380,
        budget: 400,
        status: 'Over spending',
        statusColor: '#F2645D',
        bg: '#FEF2F2',
        percent: 95,
        trend: '+20% vs last month',
        remaining: 20,
        avgLeft: 2,
        projected: 450
    }
];

export default function ArcaneAllowances() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % allowanceCards.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + allowanceCards.length) % allowanceCards.length);
    };

    const getCardIndex = (offset: number) => {
        return (activeIndex + offset + allowanceCards.length) % allowanceCards.length;
    };

    const prevCard = allowanceCards[getCardIndex(-1)];
    const currentCard = allowanceCards[activeIndex];
    const nextCard = allowanceCards[getCardIndex(1)];

    return (
        <section className="mb-14">
            <h2 className="text-2xl font-bold text-[#120048] mb-8 text-center">Arcane Allowances</h2>

            <div className="flex items-center justify-center gap-12 relative max-w-[1200px] mx-auto px-12">

                {/* Left Arrow - Outside Container */}
                <button
                    onClick={handlePrev}
                    className="bg-white rounded-full p-3 shadow-md text-text-secondary hover:text-brand-primary hover:scale-110 transition-all absolute left-0 z-20 flex-shrink-0"
                >
                    <ChevronLeft size={28} />
                </button>

                {/* Cards Container */}
                <div className="flex items-center justify-center gap-4 w-full relative h-[420px] overflow-visible">

                    {/* Previous Card (Left) */}
                    <motion.div
                        key={`prev-${prevCard.id}`}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 0.4, x: 0, scale: 0.85, filter: 'blur(1px)' }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="hidden md:flex flex-col items-center absolute left-0 lg:left-[10%] z-0"
                    >
                        <AllowanceCard card={prevCard} isMain={false} />
                    </motion.div>

                    {/* Main Card (Center) */}
                    <motion.div
                        key={`curr-${currentCard.id}`}
                        layoutId={currentCard.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', zIndex: 10 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="z-10"
                    >
                        <AllowanceCard card={currentCard} isMain={true} />
                    </motion.div>

                    {/* Next Card (Right) */}
                    <motion.div
                        key={`next-${nextCard.id}`}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 0.4, x: 0, scale: 0.85, filter: 'blur(1px)' }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.3 }}
                        className="hidden md:flex flex-col items-center absolute right-0 lg:right-[10%] z-0"
                    >
                        <AllowanceCard card={nextCard} isMain={false} />
                    </motion.div>

                </div>

                {/* Right Arrow - Outside Container */}
                <button
                    onClick={handleNext}
                    className="bg-white rounded-full p-3 shadow-md text-[#2F04B0] hover:scale-110 transition-transform absolute right-0 z-20 border-2 border-[#2F04B0] flex-shrink-0"
                >
                    <ChevronRight size={28} />
                </button>
            </div>

            <div className="flex justify-end mt-4 px-4 max-w-[1000px] mx-auto w-full">
                <button className="bg-[#2F04B0] text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg hover:bg-[#250390] transition-colors">
                    Adjust budgets
                </button>
            </div>
        </section>
    );
}

function AllowanceCard({ card, isMain }: { card: any, isMain: boolean }) {
    const size = isMain ? 400 : 280;
    const height = isMain ? 380 : 320;
    const strokeWidth = isMain ? 12 : 6;
    const radius = isMain ? 36 : 28;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (card.percent / 100) * circumference;

    return (
        <div
            className={`bg-white rounded-[2.5rem] flex flex-col justify-between transition-all duration-300 ${isMain ? 'p-8 border-2 border-[#2F04B0] shadow-xl' : 'p-6 border border-surface-divider shadow-sm'}`}
            style={{ width: `${size}px`, height: `${height}px` }}
        >
            <div className="flex justify-between items-start">
                <span className={`font-bold text-[#120048] ${isMain ? 'text-xl' : 'text-base'}`}>{card.title}</span>

                {/* Circular Progress */}
                <div className={`relative ${isMain ? 'w-24 h-24' : 'w-16 h-16'}`}>
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="50%"
                            cy="50%"
                            r={radius}
                            stroke={isMain ? "#443376" : "#E6E6E6"}
                            strokeWidth={strokeWidth}
                            fill="none"
                            strokeLinecap="round"
                        />
                        <circle
                            cx="50%"
                            cy="50%"
                            r={radius}
                            stroke={card.statusColor}
                            strokeWidth={strokeWidth}
                            fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                        />
                    </svg>
                    <span className={`absolute inset-0 flex items-center justify-center font-bold text-[#120048] ${isMain ? 'text-xl' : 'text-xs'}`}>
                        {card.percent}%
                    </span>
                </div>
            </div>

            <div>
                <span className={`${isMain ? 'text-4xl' : 'text-2xl'} font-bold text-[#120048] block mb-1`}>£{card.spend}</span>
                <span className="text-xs text-text-muted">spent of £{card.budget} budget</span>
            </div>

            {isMain && (
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold" style={{ borderColor: card.statusColor, backgroundColor: card.bg, color: card.statusColor }}>
                        <Target size={16} />
                        {card.status}
                    </div>
                    <span className="text-sm font-bold" style={{ color: card.statusColor }}>{card.trend}</span>
                </div>
            )}

            {!isMain && (
                <div className="px-3 py-1 rounded-full text-xs font-bold w-fit" style={{ backgroundColor: card.bg, color: card.statusColor }}>
                    {card.status}
                </div>
            )}

            <div className="flex justify-between items-end mt-4">
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#4F4769] mb-1">Remaining</span>
                    <span className={`${isMain ? 'text-lg' : 'text-sm'} text-[#4F4769]`}>£{card.remaining}</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-[#4F4769] mb-1">{isMain ? 'Avg / day left' : 'Projected'}</span>
                    <span className={`${isMain ? 'text-lg' : 'text-sm'} text-[#4F4769]`}>£{isMain ? card.avgLeft : card.projected}</span>
                </div>
            </div>
        </div>
    )
}
