export type TabsType = {
    active: boolean,
    name: string,
    id: string,
    url: string,
}

export type NoteTokensType = {
    [key: string]: string,
}

export type MessageType = {
    role: string,
    content: string,
}