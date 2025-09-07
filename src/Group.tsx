import { Character as CharacterType, Group as GroupType } from './types';
import Character from './Character';
import { useDroppable } from '@dnd-kit/core';

type GroupProps = {
    group: GroupType;
    characters: CharacterType[];
    project: string;
};

export default function Group({ group, characters, project } : GroupProps) {
    const { setNodeRef } = useDroppable({
        id: group.id
    });

    return(
        <div ref={setNodeRef} className={`group ${project}-group ${project}-${group.id}`}>
            {characters.map(character => {
                return(
                    <Character 
                        key={character.id} 
                        character={character} 
                        project={project}
                    />
                );
            })}
        </div>
    );
}
