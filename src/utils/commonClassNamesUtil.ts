export type Size = "large" | "small" | "medium";

const sizeClasses: Record<Size, string[]> = {
	small: ["px-2.75", "py-1.75", "leading-tight", "text-xs"],
	medium: ["px-3", "py-2", "leading-tight", "text-sm"],
	large: ["px-3.25", "py-2.25", "leading-tight", "text-medium"],
};

export type Color = "brand" | "white";

export type Variant = "primary" | "ghost";

const variantColorClasses: Record<Variant, Record<Color, string[]>> = {
	primary: {
		brand: ["bg-brand-500", "hover:bg-brand-600", "text-white"],
		white: ["bg-brand-500", "hover:bg-brand-600", "text-white"],
	},
	ghost: {
		brand: [
			"ring-1",
			"ring-brand-500",
			"text-brand-500",
			"hover:bg-brand-500/20",
		],
		white: ["ring-1", "ring-white", "text-white", "hover:bg-white/20"],
	},
};

const baseClasses: string[] = [
	"inline-block",
	"rounded",
	"text-center",
	"hover:cursor-pointer",
	"transition-colors",
	"duration-200",
	"appearance-none",
];

export const getClasses = (size: Size, variant: Variant, color: Color) => {
	return [
		...baseClasses,
		...sizeClasses[size],
		...variantColorClasses[variant][color],
	].join(" ");
};
