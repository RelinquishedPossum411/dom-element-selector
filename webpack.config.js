
const   path = require("path"),
        configuration = {
            entry: "./src/exports/init.js",
            output: {
                path: path.resolve(__dirname, "build/"),
                filename: "build.js"
            }
        };

module.exports = configuration;
