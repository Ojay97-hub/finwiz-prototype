'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CARDS = [
    {
        id: 'credit',
        title: 'Credit sorcery',
        color: '#FCBFBA', // Pink
        value: '£1,250.00',
        textColor: 'text-[#2D235C]',
        accentColor: 'text-[#2D235C]',
        borderColor: 'border-red-100',
        zIndex: 0,
        btnColor: 'bg-[#2D235C] text-white'
    },
    {
        id: 'dream',
        title: 'Dream vault',
        color: '#FFD466', // Yellow
        value: '£5,000.00',
        textColor: 'text-[#2D235C]',
        accentColor: 'text-[#2D235C]',
        borderColor: 'border-yellow-100',
        zIndex: 10,
        btnColor: 'bg-[#2D235C] text-white'
    },
    {
        id: 'magic',
        title: 'Current magic',
        color: '#2D235C', // Dark Purple
        value: '£2,300.00',
        textColor: 'text-white',
        accentColor: 'text-[#FFD466]',
        borderColor: 'border-indigo-900',
        zIndex: 20,
        btnColor: 'bg-white text-[#2D235C]'
    }
];

export default function TrendsHeader() {
    // Initial order: Credit (back), Dream (middle), Magic (front)
    const [order, setOrder] = useState(['credit', 'dream', 'magic']);

    const handleCardClick = (clickedId: string) => {
        // Move clicked card to the front (end of the array)
        if (clickedId === order[order.length - 1]) return; // Already front

        setOrder(prevOrder => {
            const newOrder = prevOrder.filter(id => id !== clickedId);
            newOrder.push(clickedId);
            return newOrder;
        });
    };

    return (
        <div className="grid lg:grid-cols-[400px_364px] justify-center gap-10 mb-16 items-start">
            {/* Hero Card */}
            <div className="bg-[#2D235C] rounded-[2rem] p-10 h-[340px] w-full lg:w-[400px] flex flex-col justify-center relative overflow-hidden shadow-xl border-2 border-indigo-900/20 group hover:scale-[1.02] transition-transform duration-300">
                <h1 className="text-6xl font-bold text-white leading-[1.1] mb-6 tracking-tight font-sans">
                    Trends &<br />
                    <span className="text-[#FFD466]">Insights</span>
                </h1>
                <button className="bg-[#1A1A1A]/80 backdrop-blur-md text-white px-6 py-3.5 rounded-2xl w-fit font-semibold text-sm hover:bg-black transition-colors shadow-lg border border-white/10 mt-auto font-sans">
                    Time to extract those spells!
                </button>
                {/* Decorative blurred blob */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FFD466] rounded-full blur-[80px] opacity-20 pointer-events-none" />
            </div>

            {/* Stacked Cards Section */}
            <div className="flex flex-col h-full">
                <h3 className="text-xl font-bold text-[#2D235C] mb-8 pl-2 font-sans">Data taken from your accounts...</h3>

                <div className="relative flex-1 min-h-[260px]">
                    <AnimatePresence>
                        {order.map((id, index) => {
                            const card = CARDS.find(c => c.id === id)!;
                            const isFront = index === order.length - 1;
                            const isMiddle = index === order.length - 2;

                            // Calculate positions based on index (visual stacking)
                            // Front: top-28 (112px)
                            // Middle: top-14 (56px)
                            // Back: top-0
                            // New requirement: compact height, maybe tighter spacing?
                            // User requested reduced height, let's keep vertical spacing proportional

                            // Let's stick to the previous spacing logic but ensure the card itself is the requested size

                            return (
                                <motion.div
                                    layout
                                    key={card.id}
                                    initial={false}
                                    animate={{
                                        top: index * 56, // Keep existing stacking spacing
                                        zIndex: index * 10,
                                        scale: isFront ? 1 : 0.96 + (index * 0.02),
                                        y: isFront ? 0 : -10
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    onClick={() => handleCardClick(card.id)}
                                    className={`absolute left-0 h-[116px] w-full max-w-[364px] rounded-[2rem] px-6 py-4 shadow-xl cursor-pointer border ${card.borderColor} transition-colors font-sans`}
                                    style={{
                                        backgroundColor: card.color,
                                    }}
                                >
                                    <div className="flex flex-col h-full justify-between">
                                        <div className="flex items-center gap-2">
                                            {id === 'magic' && <span className="text-[#FFD466]">✨</span>}
                                            {id === 'credit' && <span className="w-2 h-2 rounded-full bg-red-400"></span>}
                                            {id === 'dream' && <span className="w-2 h-2 rounded-full bg-yellow-600"></span>}

                                            <p className={`${card.accentColor} font-semibold tracking-wide uppercase text-xs font-sans`}>
                                                {card.title}
                                            </p>
                                        </div>

                                        <div className="flex items-end justify-between">
                                            <p className={`text-4xl font-bold tracking-tight ${card.textColor} font-sans`}>
                                                {card.value}
                                            </p>
                                            <button className={`${card.btnColor} px-6 py-2 rounded-xl font-bold text-xs shadow-md hover:scale-105 transition-transform`}>
                                                View
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
