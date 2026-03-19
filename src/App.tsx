import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAsync } from "react-use";
import LanguageGuard from "./components/LanguageGuard";
import PageLayout from "./components/PageLayout";
import Shop from "./pages/Shop";
import { pageDataRepository } from "./services/PageDataRepository";

export default function App() {
	const pageDataRequest = useAsync(async () => {
		return pageDataRepository.getPageData();
	}, []);

	if (pageDataRequest.loading) {
		return;
	}

	const pageData = pageDataRequest.value;

	if (!pageData) {
		return;
	}

	return (
		<HashRouter>
			<Routes>
				<Route
					path="/"
					element={<Navigate to={`/${pageData.defaultLocale.code}`} replace />}
				/>

				<Route
					path="/:languageIso"
					element={
						<LanguageGuard
							locales={pageData.locales}
							defaultLocale={pageData.defaultLocale}
						/>
					}
				>
					<Route element={<PageLayout pageData={pageData} />}>
						<Route path="" element={<Shop pageData={pageData} />} />
						<Route path="album/:id" element={<div>Abba</div>} />
						<Route path="about" element={<div>Abba</div>} />
					</Route>
				</Route>
			</Routes>
		</HashRouter>
	);
}
