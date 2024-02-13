module.exports = (client) => {
  process.on("unhandledRejection", (reason, p) => {});
  process.on("uncaughtException", (err, origin) => {});
  process.on("uncaughtExceptionMonitor", (err, origin) => {});
};
