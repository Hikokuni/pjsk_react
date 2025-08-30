import { Character as CharacterType, Group as GroupType } from './types';
import Character from './Character';
import { useDroppable } from '@dnd-kit/core';

type GroupProps = {
    group: GroupType;
    characters: CharacterType[];
};

export default function Group({ group, characters } : GroupProps) {
    const { setNodeRef } = useDroppable({
        id: group.id
    });
    var path = `/img/${group.id}_logo.png`;
    return(
        <div ref={setNodeRef} className={`${group.id}-chars grid grid-cols-4 grid-rows-1 w-full rounded-lg gap-4`}>
            {characters.map(character => {
                return(
                    <Character key={character.id} character={character} />
                );
            })}
        </div>
    );
}
