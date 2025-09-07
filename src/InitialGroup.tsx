import { Character, Group as GroupType } from './types';
import CharacterProps from './Character';
import { useDroppable } from '@dnd-kit/core';

type InitialGroupProps = {
    group;
    characters: Character[];
    project: string;
};

export default function InitialGroup({ group, characters, project } : InitialGroupProps) {
    const { setNodeRef } = useDroppable({
        id: group.id
    });

    return(
        <div ref={setNodeRef} className={`initial-group ${project}-initial-group`}>
            {characters.map(character => {
                return(
                    <CharacterProps 
                        key={character.id} 
                        character={character} 
                        project={project}
                    />
                );
            })}
        </div>
    );
}
