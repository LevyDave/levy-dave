import { Link } from "react-router-dom";

type variants = "primary" | "ghost";

type Props = {
	text: string;
	linkUrl: string;
	variant: variants;
	isDisabled: boolean;
};

const variantStyles: Record<variants, { classes: string }> = {
	primary: {
		classes:
			"bg-brand-400 text-white hover:bg-brand-500 focus:bg-brand-500 active:bg-brand-500",
	},
	ghost: {
		classes:
			"bg-transparent border-2 border-orange-500 text-orange-500 shadow-none hover:bg-transparent hover:text-orange-400 hover:border-orange-400 focus:border-orange-400 active:border-orange-300",
	},
};

export default function ActionButton(props: Props) {
	const baseClasses =
		"inline-block px-6 py-2.5 font-medium text-sm leading-tight uppercase rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out";

	const disabledClasses =
		"opacity-50 pointer-events-none shadow-none cursor-not-allowed";

	const getClasses = (variant: variants, isDisabled: boolean) => {
		const variantStyle = variantStyles[variant];

		if (!variantStyle) {
			throw new Error(`Unknown variant style "${variant}"`);
		}

		const variantClasses = `${baseClasses} ${variantStyle.classes}`;

		return isDisabled ? `${variantClasses} ${disabledClasses}` : variantClasses;
	};

	return (
		<Link
			to={props.isDisabled ? "" : props.linkUrl}
			aria-disabled={props.isDisabled}
			className={getClasses(props.variant, props.isDisabled)}
		>
			{props.text}
		</Link>
	);
}
