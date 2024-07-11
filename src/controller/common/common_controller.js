const service = require("../../service/common/common_service");
const config = require("../../../config/cookie/config");

const cookieConfig = config.cookieConfig;
const get = {
  get_isAdmin : (req, res) => {
    const admin = req.cookies.user_admin;
    
    let result = [{check : admin}];
    
    res.json(result);
  },
  get_userInfo : async (req, res) => {
    if(req.cookies.user_id != undefined)
    {
      const result = await service.get.get_userInfo(req.cookies.user_id);

      res.json(result);
    }
    else{
      res.json(0);
    }
  }
}

const set = {
  deleteCookie : (req, res) =>{
    res.clearCookie('user_id');
    res.clearCookie('user_name');
    res.clearCookie('user_admin');

    res.json(0);

  }

}

module.exports = { get, set };