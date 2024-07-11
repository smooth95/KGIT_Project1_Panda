const con = require("../main/common_dao");


const get = {
  get_userInfo : async (userId) => {
    const sql = `select * from user_info where info_id = '${userId}'`;

    const result = await (await con).execute(sql);

    return result.rows[0];
  }

}

module.exports = { get };