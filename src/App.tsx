import { useRef, useState } from 'react';
import type { Character, Group as GroupType } from './types';
import Group from './Group';
import InitialGroup from './InitialGroup';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import * as htmlToImage from 'html-to-image';
import { RiScreenshot2Fill } from "react-icons/ri";

const UNASSIGNED: GroupType = {id: 'unassigned'};

const GROUPS: GroupType[] = [
    {id: 'ln'},
    {id: 'mmj'},
    {id: 'vbs'},
    {id: 'wxs'},
    {id: '25n'},
];

const CHARACTERS: Character[] = shuffleArray([
    {id: 'ichika', group: 'unassigned'},
    {id: 'saki', group: 'unassigned'},
    {id: 'honami', group: 'unassigned'},
    {id: 'shiho', group: 'unassigned'},
    {id: 'minori', group: 'unassigned'},
    {id: 'haruka', group: 'unassigned'},
    {id: 'airi', group: 'unassigned'},
    {id: 'shizuku', group: 'unassigned'},
    {id: 'kohane', group: 'unassigned'},
    {id: 'an', group: 'unassigned'},
    {id: 'akito', group: 'unassigned'},
    {id: 'toya', group: 'unassigned'},
    {id: 'tsukasa', group: 'unassigned'},
    {id: 'rui', group: 'unassigned'},
    {id: 'emu', group: 'unassigned'},
    {id: 'nene', group: 'unassigned'},
    {id: 'kanade', group: 'unassigned'},
    {id: 'mafuyu', group: 'unassigned'},
    {id: 'mizuki', group: 'unassigned'},
    {id: 'ena', group: 'unassigned'},
]);

export default function App() {
    const [characters, setCharacters] = useState<Character[]>(CHARACTERS);

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (!over) return;

        const charId = active.id as string;
        const newGroup = over.id as Character['group'];

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

    const downloadFile = (image, { name = "啤酒烧烤分组", extension = "png" } = {}) => {
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
        alert("分组结果已存储为 啤酒烧烤分组.png");
    };

    return (
        <div className="p-4">
            <div className="flex rounded-lg gap-4 w-240 h-200">
                <DndContext onDragEnd={handleDragEnd}>
                    <div className="flex rounded-lg bg-neutral-800 w-1/2">
                        <InitialGroup
                            key={UNASSIGNED.id}
                            group={UNASSIGNED}
                            characters={characters.filter(character => character.group === UNASSIGNED.id)}
                        />
                    </div>
                    <div ref={screenshotArea} className="grid grid-rows-5 rounded-lg bg-neutral-800 p-4 gap-4 w-1/2">
                        {GROUPS.map(group => {
                            return(
                                <Group
                                    key={group.id} 
                                    group={group} 
                                    characters={characters.filter(character => character.group === group.id)}
                                />
                            );
                        })}
                    </div>
                    <button onClick={handleMemeDownload} className='h-1/10 bg-neutral-800 shadow-black shadow-sm'>
                        <RiScreenshot2Fill size='100%'/>
                    </button>
                </DndContext>
            </div>
        </div>
    );
}

function shuffleArray<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
