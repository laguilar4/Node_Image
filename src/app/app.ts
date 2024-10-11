import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import * as userRoutes from '../routes/user';
import * as fileRoutes from '../routes/file';
import path from 'path';
//import * as routes from '../routes/general';
//const routes = require('../routes/general.ts');

export function serverDeploy()
{
    dotenv.config();
    if (!process.env.PORT) {
        console.log(`No port value specified...`);
    }

    const PORT = parseInt(process.env.PORT as string, 10);

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended : true}));
    app.use(cors());
    app.use(helmet());

    app.use("/api/users",userRoutes.default);
    app.use("/api/files",fileRoutes.default);
    //carpeta publica para visualizar las imagenes
    app.use('/api/docportal/files/documents', express.static(path.join(__dirname, '../documents')));
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });

}

