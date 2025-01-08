export type TabsType = {
    open: boolean,
    active: boolean,
    name: string,
    id: string,
    url: string,
    convo?: [],
    token?: null|string,
}

export type NoteTokensType = {
    [key: string]: string,
}

export type MessageType = {
    role: string,
    content: string,
}