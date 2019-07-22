const log4js = require('log4js');
log4js.configure('./log4js.json');
const logger = log4js.getLogger("startup");
logger.info("你好")
logger.error("223");
logger.debug("23")