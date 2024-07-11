const oracledb = require("oracledb");
const dbConfig = require("../../../config/main/dbConfig");;
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

oracledb.initOracleClient({
  libDir: 'C:\\instantclient_11_2'
});

module.exports = oracledb.getConnection( dbConfig );