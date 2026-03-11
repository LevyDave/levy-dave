import {Link} from "react-router-dom";

type Props = {
	type: ButtonType;
	text: string;
	size: ButtonSize;
	variant: ButtonVariant;
	extraClasses?: string[];
	url?: string;
};

type ButtonType = "link" | "button";

type ButtonSize = "medium"|"small"

const sizeClasses: Record<ButtonSize, string[]> = {
	small: ["px-4", "py-2", "leading-tight", "text-xs"],
	medium: ["px-6", "py-2.5", "leading-tight", "text-medium"],
};

type ButtonVariant = "primary"|"ghost";

const variantClasses: Record<ButtonVariant, string[]> = {
	primary: [
		"bg-brand-500",
		"hover:bg-brand-600",
		"text-white",
	],
	ghost: [
		"border-1",
		"border-brand-500",
		"text-brand-500",
		"hover:text-brand-600",
		"hover:border-brand-600",
	]
};

const baseClasses: string[] = [
	"inline-block",
	"capitalize",
	"rounded",
	"text-center",
	"hover:cursor-pointer",
	"transition-colors"
];

export default function Button(props: Props) {
	const classNames = [
		...baseClasses,
		...sizeClasses[props.size],
		...variantClasses[props.variant],
		...(props.extraClasses ?? []),
	].join(" ");

	if (props.type === "link") {
		return (
			<Link to={props.url ?? '#'} className={classNames}>{props.text}</Link>
		);
	}

	if (props.type === "button") {
		return <button className={classNames}>{props.text}</button>;
	}
}
