const con = require("../main/common_dao");

const set = {
  setRegister : async (account) => {
    const sql = `insert into user_info values('${account.ID}', '${account.pwsd}', '${account.txt}', null, null, '${account.PH}', 0, 0)`;
    let result;
    try{
      
      result = await (await con).execute(sql);
  
      if(result.rowsAffected == 1)
      {        
        return 1;
      }
      else {
        return 0;
      }
    }
    catch(err)
    { 
      return 0;
    }
  }
}

const get = {
  getLogin : async (account) => {
    
    const sql = `select * from user_info where info_id = '${account.ID}' and info_pw = '${account.pswd}'`;
    const result = await (await con).execute(sql);
    
    return result;
  }

}


module.exports = { get, set };