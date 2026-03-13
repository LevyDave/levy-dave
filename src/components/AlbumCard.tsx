import { Link } from "react-router-dom";
import type { Album } from "../types";

type Props = {
	album: Album;
	languageIso: string;
};

export default function AlbumCard(props: Props) {
	return (
		<Link to={`/${props.languageIso}/album/${props.album.id}`}>
			<div className="w-full aspect-square flex items-center justify-center group relative rounded-lg overflow-hidden hover:shadow-lg transition">
				<img
					src={props.album.coverSource}
					alt={props.album.title}
					className="max-h-full max-w-full object-contain"
				/>

				<div
					className={
						"absolute inset-0 group-hover:bg-brand-500/90 flex items-center justify-center transition"
					}
				>
					<span
						className={"text-white font-bold invisible group-hover:visible"}
					>
						{props.album.title}
					</span>
				</div>
			</div>
		</Link>
	);
}
