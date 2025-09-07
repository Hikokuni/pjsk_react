export type Group = {
    id: string;
    characters: Character[];
}

export type Character = {
    id: string;
    group: string;
    spriteImageUrl: string;
}
