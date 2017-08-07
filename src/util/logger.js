
const loggers = {};

export default function Loggers() {}

Loggers.getLogger = function (name) {
    if (!name) {
        if (!loggers[native])
            loggers[native] = new Logger();

        return loggers[native];
    }

    return loggers[name] || null;
}

Loggers.newLogger = function (name) {
    if (!name) {
        if (!loggers[native])
            loggers[native] = new Logger();

        return loggers[native];
    }

    loggers[name] = new Logger();

    return loggers[name];
}

class Logger {
    constructor() {
        this.lines = [];
    }

    add(string) {
        this.lines.push(string + "");
    }

    append(string) {
        if (this.lines.length) {
            this.lines[this.lines.length - 1].concat(string + "");
        }
    }

    appendFirst(string) {
        if (this.lines.length) {
            this.lines[0].concat(string + "");
        }
    }

    log(string) {
        this.add(string);
    }

    toString() {
        let string = "";

        for (let i = 0; i < this.lines.length; i++) {
            string += "[" + (i + 1) + "] " + this.lines[i];
        }

        return string;
    }

    toConsole() {
        for (let i = 0; i < this.lines.length; i++)
            console.log("[" + (i + 1) + "] " + this.lines[i]);
    }
}
