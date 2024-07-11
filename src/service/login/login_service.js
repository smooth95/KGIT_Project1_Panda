const dao = require("../../database/login/loginDAO");

const set = {
  setRegister : async (account) => {
    const result = await dao.set.setRegister(account);

    return result;
  }
}

const get = {
  getLogin : async (account) => {
    
    const result = await dao.get.getLogin(account);

    return result;
  }
}

module.exports = {
  set,
  get
};