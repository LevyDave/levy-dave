import { type ChangeEvent, useState } from "react";
import {
	type Color,
	getClasses,
	type Size,
	type Variant,
} from "../utils/commonClassNamesUtil";

type Props = {
	size: Size;
	variant: Variant;
	color: Color;
	options: {
		id: string;
		label: string;
	}[];
	initialOptionId: string;
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export default function Dropdown(props: Props) {
	const [optionId, setOptionId] = useState(props.initialOptionId);

	const classNames = getClasses(props.size, props.variant, props.color);

	const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		setOptionId(e.target.value);
		props.onChange(e);
	};

	return (
		<select className={classNames} onChange={handleSelect} value={optionId}>
			{props.options.map((option) => (
				<option key={option.id} value={option.id}>
					{option.label}
				</option>
			))}
		</select>
	);
}
