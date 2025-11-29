import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()   // <-- important for object logging
  ),
  transports: [
    new winston.transports.File({ filename: "app.log" })
  ],
});

export default logger;
