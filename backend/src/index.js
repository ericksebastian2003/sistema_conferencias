import app from "./server.js";
import connection from "./database.js";

connection();

app.listen(app.get("port"), () => console.log(`el servidor se esta ejecutando en http//localhost:${app.get("port")}`))