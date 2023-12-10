import { UUID } from "crypto"

export type WsLogInput = {
    connectionID: UUID
    applicationID: string
    message: string
}

export type WsConnectionInput = {
    connectionID: UUID
    applicationID: string
}