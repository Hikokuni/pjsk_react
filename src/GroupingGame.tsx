import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Character as CharacterType, Group as GroupType } from "./types";
import { useState, useRef } from "react";
import { RiScreenshot2Fill } from "react-icons/ri";
import Group from "./Group";
import InitialGroup from "./InitialGroup";
import * as htmlToImage from 'html-to-image';

type GroupingGameProps = {
    characters: CharacterType[];
    groups: GroupType[];
    project: string;
}

export default function GroupingGame(game: GroupingGameProps) {
    const [characters, setCharacters] = useState<CharacterType[]>(game.characters);

    const UNASSIGNED = {id: 'unassigned'};

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (!over) return;

        const charId = active.id as string;
        const newGroup = over.id as CharacterType['group'];

        setCharacters(() => characters.map(character => character.id === charId ? {
            ...character,
            group: newGroup,
        } : character));
    }

    const createFileName = (extension = "", ...names) => {
        if (!extension) {
            return "";
        }
        return `${names.join("")}.${extension}`;
    };

    const downloadFile = (image, { name = `${game.project}分组`, extension = "png" } = {}) => {
        const a = document.createElement("a");
        a.href = image;
        a.download = createFileName(extension, name);
        a.click();
    };

    //... inside of your component
    const screenshotArea = useRef(null);

    const handleMemeDownload = async () => {
        if (!screenshotArea.current) return;
        await htmlToImage.toJpeg(screenshotArea.current).then(downloadFile);
        alert(`分组结果已存储为 ${game.project}分组.png`);
    };

    return (
        <div className="flex flex-col p-[1vh] gap-[1vh] max-w-200">
            <div className="flex rounded-lg">
                <DndContext onDragEnd={handleDragEnd}>
                    <div className="flex rounded-l-lg bg-neutral-600 w-1/2">
                        <InitialGroup
                            key={UNASSIGNED.id}
                            group={UNASSIGNED}
                            characters={characters.filter(character => character.group === UNASSIGNED.id)}
                            project={game.project}
                        />
                    </div>
                    <div ref={screenshotArea} className={`${game.project}-groups`}>
                        {game.groups.map(group => {
                            return(
                                <Group
                                    key={group.id} 
                                    group={group} 
                                    characters={characters.filter(character => character.group === group.id)}
                                    project={game.project}
                                />
                            );
                        })}
                    </div>
                </DndContext>
            </div>
            <button onClick={handleMemeDownload} className='h-[4vh] bg-neutral-600 shadow-black shadow-sm'>
                <RiScreenshot2Fill size='100%'/>
            </button>
        </div>
    );
}