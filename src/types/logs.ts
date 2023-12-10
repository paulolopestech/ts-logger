import { UUID } from "crypto";
export type Log = {
    serverID: UUID
    clientID: string
    message: string
    type: string
    priority: string
    timestamp: number
}

export type LogsFilter = {
    clientID: any
    type: any
    priority: any
    initialTimeStamp: any
    finalTimeStamp: any
}