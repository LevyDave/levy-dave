import { Outlet, useParams } from "react-router-dom";
import type { PageData, RouteParams } from "../types";
import Navigation from "./Navigation";

type CenteredLayoutProps = {
	pageData: PageData;
};

export default function PageLayout(props: CenteredLayoutProps) {
	const { languageIso } = useParams() as RouteParams;

	if (!languageIso) {
		return;
	}

	return (
		<>
			<Navigation languageIso={languageIso} pageData={props.pageData} />

			<main>
				<Outlet />
			</main>
		</>
	);
}
