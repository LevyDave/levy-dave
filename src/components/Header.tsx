import { useLocation, useNavigate } from "react-router-dom";
import type { Language } from "../types";
import LanguageSelector from "./LanguageSelector";

type Props = {
	languageIso: string;
	logoSrc: string;
	languages: Language[];
};

export default function Header(props: Props) {
	const navigate = useNavigate();
	const location = useLocation();

	const onLanguageChange = (newIso: string) => {
		const currentPath = location.pathname.split("/").slice(2).join("/");

		navigate(`/${newIso}/${currentPath}`);
	};

	return (
		<header className="grid grid-cols-3 items-center p-5 shadow-lg">
			<div className="flex justify-start"></div>

			<div className="flex justify-center">
				<a href="https://linktr.ee/levydave">
					<img
						src={props.logoSrc}
						alt="Levy Dave"
						className="h-10 w-auto object-contain"
					/>
				</a>
			</div>

			<div className="flex justify-end">
				<LanguageSelector
					languages={props.languages}
					onSelect={onLanguageChange}
					initialValue={props.languageIso}
				/>
			</div>
		</header>
	);
}
