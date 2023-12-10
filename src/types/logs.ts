import { UUID } from "crypto";
export type Log = {
    connectionID: UUID
    applicationID: string
    message: string
    type: string
    priority: number
    timestamp: number
}

export type LogsFilter = {
    applicationID: UUID
    type: string
    priority: number
    initialTimeStamp: number
    finalTimeStamp: number
}