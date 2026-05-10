import { useParams } from "react-router-dom";
import Button from "../components/Button";
import PageSectionHeader from "../components/PageSectionHeader";
import PageSectionNarrow from "../components/PageSectionNarrow";
import PhotoGallery from "../components/PhotoGallery";
import { AlbumProductData } from "../models/AlbumProductData";
import type { PageData, RouteParams } from "../types";
import { getTranslationValue } from "../utils/contentfulValueUtil";

type Props = {
	pageData: PageData;
};

export default function ProductPage(props: Props) {
	const { id, languageIso } = useParams() as RouteParams;

	const product = props.pageData.products.find(
		(product) => product.getId() === id,
	);

	if (!product) {
		return;
	}

	const longDescription = product.getLongDescription(languageIso);
	const subtype = product.getSubtype();
	const orderLink = product.getOrderLink(languageIso);

	return (
		<>
			<PageSectionHeader
				title={product.getBrand() ?? product.getName(languageIso)}
			/>

			<PageSectionNarrow>
				<div className={"mb-6"}>
					<Button
						text={getTranslationValue(
							props.pageData.pageTranslations.fields.back,
							languageIso,
						)}
						size={"medium"}
						variant={"ghost"}
						color={"brand"}
						to={`/${languageIso}`}
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-5 gap-y-12 md:gap-x-12 md:gap-y-12">
					<div className="col-span-2">
						<PhotoGallery images={product.getGalleryImages()} />
					</div>
					<div className="col-span-3">
						<div className={"text-2xl font-semibold mb-6"}>
							{product.getName(languageIso)}
						</div>

						{longDescription && (
							<div
								className="mb-6"
								dangerouslySetInnerHTML={{
									__html: longDescription,
								}}
							/>
						)}

						{subtype instanceof AlbumProductData && (
							<div className={"mb-6"}>
								<div className="text-lg font-semibold mb-3">
									{getTranslationValue(
										props.pageData.pageTranslations.fields.tracks,
										languageIso,
									)}
								</div>
								<ol className="list-decimal list-inside">
									{subtype.getTracks().map((track) => (
										<li key={track}>{track}</li>
									))}
								</ol>
							</div>
						)}

						<div className={"flex gap-3"}>
							{orderLink && (
								<Button
									text={getTranslationValue(
										props.pageData.pageTranslations.fields.orderButton,
										languageIso,
									)}
									size={"medium"}
									variant={"primary"}
									color={"brand"}
									to={orderLink}
									disabled={product.getStockQuantity() === 0}
								/>
							)}

							{product.getSeeMoreLink() && (
								<Button
									text={getTranslationValue(
										props.pageData.pageTranslations.fields.pagelink,
										languageIso,
									)}
									size={"medium"}
									variant={"ghost"}
									color={"brand"}
									to={product.getSeeMoreLink()}
								/>
							)}
						</div>
					</div>
				</div>
			</PageSectionNarrow>
		</>
	);
}
