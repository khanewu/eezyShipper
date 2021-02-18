const express = require("express");

const app = express.Router();


// app.use("/channels", require("./channels"));

// app.use("/api/admin", require("./apis/adminApis.js"));
// app.use("/api/user", require("./apis/userApi"));
app.use("/api", require("./apis/genApis"));


// app.use("/admin", require("./adminWeb"));
// app.use("/user", require("./userWeb"));
// app.use("/", require("./genWeb"));


module.exports=app;