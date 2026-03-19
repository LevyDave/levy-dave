import { useParams } from "react-router-dom";
import PageSectionHeader from "../components/PageSectionHeader";
import PageSectionNarrow from "../components/PageSectionNarrow";
import type { PageData, RouteParams } from "../types";
import {
	getHtmlString,
	getTranslationValue,
} from "../utils/contentfulValueUtil";

type Props = {
	pageData: PageData;
};

export default function About(props: Props) {
	const { languageIso } = useParams() as RouteParams;

	return (
		<>
			<PageSectionHeader
				title={getTranslationValue(
					props.pageData.pageTranslations.fields.aboutLabel,
					languageIso,
				)}
			/>

			<PageSectionNarrow>
				<div
					dangerouslySetInnerHTML={{
						__html: getHtmlString(
							props.pageData.pageTranslations.fields.oWydawnictwie,
							languageIso,
						),
					}}
				/>
			</PageSectionNarrow>
		</>
	);
}
