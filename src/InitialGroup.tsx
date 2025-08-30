import { Character, Group as GroupType } from './types';
import CharacterProps from './Character';
import { useDroppable } from '@dnd-kit/core';

type InitialGroupProps = {
    group: GroupType;
    characters: Character[];
};

export default function InitialGroup({ group, characters } : InitialGroupProps) {
    const { setNodeRef } = useDroppable({
        id: group.id
    });
    return(
        <div ref={setNodeRef} className="grid grid-cols-4 grid-rows-5 rounded-lg w-full p-4 gap-4 bg-contain">
            {characters.map(character => {
                return(
                    <CharacterProps key={character.id} character={character} />
                );
            })}
        </div>
    );
}
