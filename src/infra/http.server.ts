import { WebSocketLoggerServer, WebSocketViewServer, app } from "./config/http";
import { router } from "./routes";
import { LoggerAdapter } from "./config/database/index"
import { LoggerService } from "../services/logger";

app.use(router);


const loggerAdapter = new LoggerAdapter();
const loggerService = new LoggerService(loggerAdapter);

const startHTTP = (PORT: number) => {
    app.listen(PORT, () => console.log('REST SERVER STARTED AT:', PORT));
}

const startWSLogger = () => {
    const logger = new WebSocketLoggerServer(loggerService);
    logger.start();
}

const startWSView = () => {
    const view = new WebSocketViewServer();
    view.start();
}

export {
    startHTTP,
    startWSLogger,
    startWSView
};