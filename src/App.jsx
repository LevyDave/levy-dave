import {Routes, Route, HashRouter} from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Album from "./pages/Album"

export default function App() {
    return (
        <HashRouter>
            <div className="min-h-screen bg-black text-white">
                <Header/>

                <main className="py-16">

                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/album/:id" element={<Album/>}/>
                    </Routes>

                </main>

            </div>
        </HashRouter>
    )
}