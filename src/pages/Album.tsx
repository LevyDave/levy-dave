import { useParams } from "react-router-dom";
import Button from "../components/Button";
import PageSectionHeader from "../components/PageSectionHeader";
import PageSectionNarrow from "../components/PageSectionNarrow";
import type { PageData, RouteParams } from "../types";

type Props = {
	pageData: PageData;
};

export default function Album(props: Props) {
	const { id, languageIso } = useParams() as RouteParams;

	const album = props.pageData.config.albums.find((a) => a.id === id);

	if (!album) {
		return;
	}

	return (
		<>
			<PageSectionHeader title={album.title} />

			<PageSectionNarrow>
				<div className="grid grid-cols-1 md:grid-cols-5 gap-12">
					<div className="col-span-2">
						<img
							src={album.coverSource}
							alt={album.title}
							className="max-h-full max-w-full object-contain rounded-lg"
						/>
					</div>
					<div className="col-span-3">
						<div
							className="text-xl font-light"
							dangerouslySetInnerHTML={{
								__html: album.description[languageIso],
							}}
						/>
						<div className="text-lg font-light">
							{props.pageData.translations.tracks[languageIso]}
						</div>

						{album.tracks.length && (
							<ol className="list-decimal list-inside">
								{album.tracks.map((track) => (
									<li key={track.name}>{track.name}</li>
								))}
							</ol>
						)}
						<div>
							<Button
								text={props.pageData.translations.orderButton[languageIso]}
								size={"medium"}
								variant={"primary"}
								color={"brand"}
								to={props.pageData.config.purchaseFormUrl}
							/>
						</div>
					</div>
				</div>
			</PageSectionNarrow>
		</>
	);
}
