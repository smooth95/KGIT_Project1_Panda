const dao = require("../../database/common/common_dao");

const get = {
  get_userInfo : async(userId) => {
    const result = await dao.get.get_userInfo(userId);

    return result;
  }

}

module.exports = {
  get
};