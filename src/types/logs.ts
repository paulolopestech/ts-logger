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
    connectionID: UUID | undefined
    applicationID: UUID | undefined
    type: string | undefined
    priority: number | undefined
    initialTimeStamp: number | undefined
    finalTimeStamp: number | undefined
}