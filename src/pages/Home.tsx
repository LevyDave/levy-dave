import { useParams } from "react-router-dom";
import AlbumCard from "../components/AlbumCard";
import type { PageData, RouteParams } from "../types";

type Props = {
	pageData: PageData;
};

export default function Home(props: Props) {
	const { languageIso } = useParams() as RouteParams;

	return (
		<div>
			<h1 className={"text-white text-4xl leading-relaxed mb-12 capitalize text-center"}>Moje albumy</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
				{props.pageData.config.albums.map((album) => (
					<AlbumCard key={album.id} album={album} languageIso={languageIso} />
				))}
			</div>
		</div>
	);
}
