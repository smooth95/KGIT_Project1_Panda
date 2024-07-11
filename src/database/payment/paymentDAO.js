const con = require("../main/common_dao");

get = {
  getBuyerPage : async (board_num) => {
    const sql = `select * from user_board where board_num = ${board_num}`;
    let result = await (await con).execute(sql);

    const sql_name = `select info_name, info_phone from user_info where info_id = '${result.rows[0].BOARD_ID}'`;
    let result_name = await (await con).execute(sql_name);

    result.rows[1] = result_name.rows[0];

    return result;
  },
  getSellerOk : async (board_num) => {
  
    const sql_sellerOk = `select board_IsSellerOk from user_board where board_num = ${board_num}`;
    const result = await (await con).execute(sql_sellerOk);
  
    return result;
  },
  getSellerPage : async (board_num) => {
    const sql = `select * from user_board inner join user_info on user_board.board_buyerid = user_info.info_id where user_board.board_num = ${board_num}`;
    const result = await (await con).execute(sql);

    return result;
  }, 
  getUserInfo : async (userId) => {
    const sql =`select * from user_info where info_id = '${userId}'`;
    const result = await (await con).execute(sql);

    return result;
  },
  getBoardInfo : async (board_num) => {
    
    const sql =`select * from user_board where board_num = ${board_num}`;
    const result = await (await con).execute(sql);

    return result.rows;
  }

};

set = {
  setBuyerOk : async (board_num) => {
    const sql_buyerOk = `update user_board set board_IsBuyerOk = 1 where board_num = ${board_num}`;
    await (await con).execute(sql_buyerOk);

    const result = get.getSellerOk(board_num);

    return result;
  },
  setBuyerCancel : async(board_num) => {
    const sql = `update user_board set board_IsSellerOk = null, board_IsBuyerOk = null, board_buyerId = null, board_istrading = 0 where board_num = ${board_num}`;
    await (await con).execute(sql);
  },
  setSellerOk : async (board_num) => {
    const sql_sellerOk = `update user_board set board_IsSellerOk = 1 where board_num = ${board_num}`;
    await (await con).execute(sql_sellerOk);

    const result = getBuyerOk(board_num);

    return result;
  },
  setTradeSuccess : async (price, sellerId, buyerId) => {

    const sql_seller = `update user_info set info_point = info_point + ${price} where info_id = '${sellerId}'`;
    const sql_buyer = `update user_info set info_point = info_point - ${price} where info_id = '${buyerId}'`;
    const seller = await (await con).execute(sql_seller);
    const buyer = await(await con).execute(sql_buyer);
  },
  setPoint : async(userId, point) => {
    const sql = `update user_info set info_point = info_point + ${point} where info_id = '${userId}'`;
    const seller = await (await con).execute(sql);
  }
};

async function  getBuyerOk(board_num) {
  const sql_buyerOk = `select * from user_board where board_num = ${board_num}`;
  const result = await (await con).execute(sql_buyerOk);

  return result;
}


module.exports = { get, set, getBuyerOk };