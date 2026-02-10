export type GameForUser = {
    userId: number;
    gameId: number;
    GameName: string;
    ReleaseYear: number;
    PlatformName: string;
}

export type AddGameRequest = {
    userId: number;
    GameName: string;
    PlatformName: string;
    ReleaseYear: number;
}

export type DeleteGameForUserRequest = {
    userId: number;
    gameId: number;
}