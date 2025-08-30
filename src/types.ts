export type GroupId = 'unassigned' | 'ln' | 'mmj' | 'vbs' | 'wxs' | '25n';

export type Group = {
    id: GroupId;
}

export type Character = {
    id: string;
    group: GroupId;
}
