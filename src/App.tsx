import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAsync } from "react-use";
import LanguageGuard from "./components/LanguageGuard";
import PageLayout from "./components/PageLayout";
import About from "./pages/About";
import Album from "./pages/Album";
import Home from "./pages/Home";
import { contentRepository } from "./utils/ApiContentRepository.js";

export default function App() {
	const pageDataRequest = useAsync(async () => {
		return contentRepository.getPageData();
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
					element={
						<Navigate to={`/${pageData.languages.default.iso}`} replace />
					}
				/>

				<Route
					path="/:languageIso"
					element={
						<LanguageGuard
							languages={pageData.languages.all}
							defaultLanguage={pageData.languages.default}
						/>
					}
				>
					<Route element={<PageLayout pageData={pageData} />}>
						<Route path="" element={<Home pageData={pageData} />} />
						<Route path="album/:id" element={<Album pageData={pageData} />} />
						<Route path="about" element={<About pageData={pageData} />} />
					</Route>
				</Route>
			</Routes>
		</HashRouter>
	);
}
