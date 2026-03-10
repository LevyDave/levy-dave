import { Outlet, useParams } from "react-router-dom";
import type { PageData, RouteParams } from "../types";
import Header from "./Header";

type Props = {
	pageData: PageData;
};

export default function CenteredLayout(props: Props) {
	const { languageIso } = useParams() as RouteParams;

	return (
		<div className="min-h-screen bg-black text-white">
			<Header
				languageIso={languageIso}
				logoSrc={props.pageData.config.logoSource}
				languages={props.pageData.languages}
			/>

			<main className="py-16">
				<main className="max-w-6xl mx-auto">
					<Outlet />
				</main>
			</main>
		</div>
	);
}
