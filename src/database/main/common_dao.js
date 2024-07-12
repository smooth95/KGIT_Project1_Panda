const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config")
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

// oracledb.initOracleClient({
//   libDir: 'C:\\instantclient_11_2'
// });

module.exports = oracledb.getConnection( dbConfig );