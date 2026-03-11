import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Album } from "../types";

type Props = {
	album: Album;
	languageIso: string;
};

export default function AlbumCard(props: Props) {
	return (
		<Link to={`/${props.languageIso}/album/${props.album.id}`}>
			<div className="w-full aspect-square flex items-center justify-center">
				<img
					src={props.album.coverSource}
					alt={props.album.title}
					className="max-h-full max-w-full object-contain transition"
				/>
			</div>
		</Link>
	);
}
