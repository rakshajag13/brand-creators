import dotenv from "dotenv";
import express from "express";
import path from "path";

dotenv.config();
const port = process.env.PORT;
const app = express();

app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

// Configure routesroutes.register(app);
// start the express server
app.listen(port, () => {    
    // tslint:disable-next-line:no-console    
    console.log( `server started at http://localhost:${port}`);
});
