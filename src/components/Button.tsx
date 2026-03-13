import { Link } from "react-router-dom";
import {
	type Color,
	getClasses,
	type Size,
	type Variant,
} from "../utils/commonClassNamesUtil";

type Props = {
	text: string;
	size: Size;
	variant: Variant;
	color: Color;
	extraClasses?: string[];
	to?: string;
	disabled?: boolean;
};

export default function Button(props: Props) {
	const classNames = getClasses(props.size, props.variant, props.color);

	if (props.to) {
		return (
			<Link to={props.to} className={classNames}>
				{props.text}
			</Link>
		);
	} else {
		return (
			<button type={"button"} className={classNames}>
				{props.text}
			</button>
		);
	}
}
