var log4js = require('log4js');

module.exports.log=log4js.configure({
    appenders: {
        stdout: {
            type: "stdout",
            level: "all",
            layout: {
                type: "pattern",
                pattern: "[%d %p] %m"
            }
        },
        daily: {
            type: "dateFile",
            filename: __dirname+"\\logs\\all",
            pattern: ".yyyy-MM-dd.log",
            alwaysIncludePattern: true,
            compress: true,
            daysToKeep: 30,
            encoding: "utf-8",
            layout: {
                type: "pattern",
                pattern: "[%d %p] %m"
            }
        },
        errorFile: {
            type: "file",
            filename: __dirname+"\\logs\\error.log",
            maxLogSize: 10485760,
            backups:10,
            encoding: "utf-8",
            compress: true,
            level: "error"
        },
        error: {
            type: "logLevelFilter",
            appender: "errorFile",
            level: "error"
        },
        infoFile: {
            type: "file",
            filename: __dirname+"\\logs\\info.log",
            maxLogSize: 10485760,
            backups: 10,
            encoding: "utf-8",
            compress: true
        },
        info: {
            type: "logLevelFilter",
            appender: "infoFile",
            level: "info"
        }
    },
    categories: {
        default: {
            appenders: [
                "stdout",
                "daily",
                "error",
                "info"
            ],
            level: "DEBUG"
        },
        custom:{
            appenders: [
                "stdout",
                "daily",
                "error",
                "info"
            ],
            level:"all"
        }
    }
});


