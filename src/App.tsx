import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAsync } from "react-use";
import CenteredLayout from "./components/CenteredLayout";
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
				<Route path="/" element={<Navigate to="/pl" replace />} />

				<Route
					path="/:languageIso"
					element={<CenteredLayout pageData={pageData} />}
				>
					<Route path="" element={<Home pageData={pageData} />} />
					<Route path="album/:id" element={<Album pageData={pageData} />} />
				</Route>
			</Routes>
		</HashRouter>
	);
}
