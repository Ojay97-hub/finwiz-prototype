'use client';

interface CategoryPillProps {
    id: string;
    name: string;
    color: string;
    isActive: boolean;
    onClick: (id: string) => void;
}

export default function CategoryPill({
    id,
    name,
    color,
    isActive,
    onClick,
}: CategoryPillProps) {
    return (
        <button
            onClick={() => onClick(id)}
            className={`
        px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
        ${isActive
                    ? 'text-white shadow-lg scale-105'
                    : 'bg-surface-base text-text-secondary hover:bg-surface-card-alt hover:scale-102'
                }
      `}
            style={isActive ? { backgroundColor: color } : undefined}
        >
            {name}
        </button>
    );
}

interface CategoryPillsProps {
    categories: { id: string; name: string; color: string }[];
    activeId: string;
    onSelect: (id: string) => void;
}

export function CategoryPills({ categories, activeId, onSelect }: CategoryPillsProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
                <CategoryPill
                    key={category.id}
                    id={category.id}
                    name={category.name}
                    color={category.color}
                    isActive={activeId === category.id}
                    onClick={onSelect}
                />
            ))}
        </div>
    );
}
