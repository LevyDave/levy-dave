import {Outlet, useParams} from "react-router-dom";
import type {PageData, RouteParams} from "../types";
import Button from "./Button";
import AlbumCard from "./AlbumCard";
import {ReactNode} from "react";

type ContentPanelProps = {
    children: ReactNode,
    text: string,
    id: string,
    extraClasses?: string[]
}

function ContentPanel(props: ContentPanelProps) {

    const extraClassNames = props.extraClasses?.join(" ");

    return (
        <div className={`p-10 ${extraClassNames}`}>
            <div className={"max-w-7xl mx-auto"}>

                <h2 id={props.id}
                    className={"text-4xl leading-relaxed mb-6 capitalize text-center font-semibold"}>{props.text}</h2>

                {props.children}
            </div>
        </div>
    )
}

type CenteredLayoutProps = {
    pageData: PageData;
};

const description = "Moja twórczość to nieustanne poszukiwanie harmonii między światem wewnętrznym a otaczającą nas rzeczywistością. Czerpię inspirację z ulotnych momentów — gry światła na teksturowanych powierzchniach, surowego piękna natury oraz złożoności ludzkich emocji. Każdy projekt zaczyna się od impulsu, który staram się przełożyć na język wizualny, dążąc do tego, by każde dzieło opowiadało własną, unikalną historię i prowokowało widza do głębszej refleksji nad tym, co niedostrzegalne na pierwszy rzut oka.";

export default function CenteredLayout(props: CenteredLayoutProps) {
    const {languageIso} = useParams() as RouteParams;

    const tabs = [
        {
            text: "My music",
        },
        {
            text: "About me",
        },
        {
            text: "Linktree",
        },
    ];

    return (
        <>
            <header className={'bg-brand-950 shadow-lg px-10 py-5'}>
                <div className={"max-w-7xl mx-auto"}>
                    <div className={"grid grid-cols-[1fr_auto_1fr] gap-16"}>
                        <div className={"flex justify-end items-center"}>
                            <a href={"#"} className={"text-brand-500 font-semibold leading-relaxed capitalize"}>My music</a>
                        </div>
                        <div className={"grid place-items-center"}>
                            <a href="https://linktr.ee/levydave">
                                <img
                                    src={props.pageData.config.logoSource}
                                    alt="Levy Dave"
                                    className="h-9 w-auto object-contain"
                                />
                            </a>
                        </div>
                        <div className={"flex justify-start items-center"}>
                            <a href={"#"} className={"text-brand-500 font-semibold leading-relaxed capitalize"}>My music</a>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                <ContentPanel extraClasses={["bg-brand-600", "text-white"]} text={"My music"} id={'my-music'}>
                    <div className={"grid grid-cols-1 gap-12"}>
                        {props.pageData.config.albums.map(album => (
                            <div className={"grid grid-cols-1 sm:grid-cols-4"}>
                                <div>
                                    <img
                                        src={album.coverSource}
                                        alt={album.title}
                                        className="max-h-full max-w-full object-contain rounded-xl shadow-lg"
                                    />
                                </div>
                                <div className={"col-span-3 py-6 px-6 sm:px-12"}>
                                    <div
                                        className={"text-2xl mb-8 font-semibold"}>{album.title}</div>
                                    <div
                                        className="text-sm font-light mb-8"
                                        dangerouslySetInnerHTML={{__html: album.description.en}}
                                    />

                                    <Button type={'button'} text={'See album'} size={'small'} variant={'primary'} extraClasses={["shadow-md"]}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </ContentPanel>

                <ContentPanel extraClasses={["bg-brand-950", "text-white"]} text={"About me"} id={'about-me'}>
                    <div className={"max-w-6xl mx-auto"}>
                        <div className={"text-center font-lg leading-relaxed"}>
                            {description}
                        </div>
                    </div>
                </ContentPanel>
            </main>

            <footer className={"text-center bg-gray-950 p-3 text-white text-sm"}>
                Levy Dave Music @ {new Date().getFullYear()}
            </footer>
        </>
    );
}