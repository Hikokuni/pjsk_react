import { useDraggable } from '@dnd-kit/core';
import { Character as CharacterType } from './types';

type CharacterProps = {
    character: CharacterType;
}

export default function Character({ character }: CharacterProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: character.id
    });

    const style = transform ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`
    } : undefined;

    var path = `/img/${character.id}.png`;
    return(
        <div 
            ref={setNodeRef} 
            {...listeners} 
            {...attributes} 
            className="flex rounded-lg justify-center pt-4"
            style={style}
        >
            <img className={`${character.id} flex rounded-lg h-full object-cover cursor-grab drop-shadow-neutral-800 drop-shadow-lg`} src={path} />
        </div>
    );
}
