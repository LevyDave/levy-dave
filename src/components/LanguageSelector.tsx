import { type ChangeEvent, useState } from "react";
import type { Language } from "../types";

type Props = {
	languages: Language[];
	onSelect: (newIso: string) => void;
	initialValue: string;
};

export default function LanguageSelector(props: Props) {
	const [value, setValue] = useState(props.initialValue);

	const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		const targetValue = e.target.value;

		setValue(targetValue);

		props.onSelect(targetValue);
	};

	return (
		<div className="relative inline-block text-left">
			<select
				value={value}
				onChange={handleSelect}
				className="appearance-none bg-transparent border border-gray-700 text-gray-300 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer hover:border-gray-500 transition-colors"
			>
				{props.languages.map((language) => (
					<option
						key={language.iso}
						value={language.iso}
						className="bg-gray-900 text-white"
					>
						{language.name}
					</option>
				))}
			</select>

			<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
				<svg
					aria-label="Down"
					className="w-4 h-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</div>
		</div>
	);
}
