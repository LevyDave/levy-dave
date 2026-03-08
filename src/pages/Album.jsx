import {useParams} from "react-router-dom"
import {albums} from "../data/albums"
import {motion} from "framer-motion"

export default function Album() {

    const {id} = useParams()

    const album = albums.find(a => a.id === id)

    return (
        <main className="max-w-4xl mx-auto">
            <div className="grid grid-cold-1 md:grid-cols-2 gap-8">
                <div>
                    <motion.img
                        initial={{opacity: 0, scale: 0.95}}
                        animate={{opacity: 1, scale: 1}}
                        src={album.image}
                        className="w-full mb-10"
                    />
                </div>
                <div>
                    <h1 className="text-xl mb-4">{album.title}</h1>

                    <p className="text-md text-white/70 leading-relaxed mb-6">
                        {album.description}
                    </p>

                    {album.tracks.length && <>

                        <h3 className="text-md mb-2">Track list</h3>
                        <ol className="list-decimal list-inside">
                            {album.tracks.map(track =>
                                <li className="text-white/70">{track.name}</li>
                            )}
                        </ol>
                    </>}


                </div>
            </div>

        </main>
    )
}