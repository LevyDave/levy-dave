import { type LinkProps, Link as ReactLink } from "react-router-dom";

type Props = {
	text: string;
	to: string;
	size: Size;
	color: Color;
	target?: LinkProps["target"];
};

type Size = "large" | "small" | "medium";

const sizeClasses: Record<Size, string[]> = {
	small: ["text-sm"],
	medium: ["text-md"],
	large: ["text-lg"],
};

type Color = "brand" | "white";

const colorClasses: Record<Color, string[]> = {
	brand: ["text-brand-500", "hover:text-brand-700"],
	white: ["text-white", "hover:text-gray-300"],
};

const baseClasses: string[] = ["transition", "duration-200"];

export default function Link(props: Props) {
	const classNames = [
		...baseClasses,
		...sizeClasses[props.size],
		...colorClasses[props.color],
	].join(" ");

	return (
		<ReactLink
			to={props.to}
			target={props.target ?? undefined}
			className={classNames}
		>
			{props.text}
		</ReactLink>
	);
}
