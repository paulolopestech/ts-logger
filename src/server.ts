import { startHTTP, startWSLogger } from "./infra";
import { startWSView } from "./infra/http.server";

const REST_PORT = 3001;

startHTTP(REST_PORT);
startWSLogger();
startWSView();