const express = require("express")
const connectDB = require("./connection")
const path = require("path")
const app = express();
const port = 3001;

const urlRoute = require("./routes/url.route")
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))
app.use("/url",urlRoute)

connectDB()

if (!process.env.VERCEL) {
    app.listen(port,()=>{console.log(`server started at port ${port}`);
    })
}

module.exports = app;