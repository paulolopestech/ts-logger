import { app } from "./config/http";
import { router } from "./routes";
app.use(router);
const startHTTP = (PORT: number) => {
    app.listen(PORT, () => console.log('REST SERVER STARTED AT:', PORT));
}

export default startHTTP;