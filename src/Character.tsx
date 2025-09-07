import { useDraggable } from '@dnd-kit/core';
import { Character as CharacterType } from './types';

type CharacterProps = {
    character: CharacterType;
    project: string;
}

export default function Character({ character, project }: CharacterProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: character.id
    });

    const style = transform ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`
    } : undefined;

    return(
        <div 
            ref={setNodeRef} 
            {...listeners} 
            {...attributes} 
            className={`character ${project}-character`}
            style={style}
        >
            <img className={`character ${project}-character ${project}-${character.id} rounded-sm object-cover cursor-grab drop-shadow-black drop-shadow-sm`} src={character.spriteImageUrl} />
        </div>
    );
}
