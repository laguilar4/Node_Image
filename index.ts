import * as app from "./src/app/app";
import * as db from "./src/database/config";

app.serverDeploy();
db.connectMongo();