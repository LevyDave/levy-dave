import { Navigate, Outlet, useParams } from "react-router-dom";
import type { Language, RouteParams } from "../types";

type Props = {
	languages: Language[];
	defaultLanguage: Language;
};

export default function LanguageGuard(props: Props) {
	const { languageIso } = useParams() as RouteParams;

	if (!props.languages.find((language) => language.iso === languageIso)) {
		return <Navigate to={`/${props.defaultLanguage.iso}`} replace />;
	}

	return <Outlet />;
}
