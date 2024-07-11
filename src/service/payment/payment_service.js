const dao = require("../../database/payment/paymentDAO");

get = {
  getBuyerPage: async (board_num) => {
    let result = await dao.get.getBuyerPage(board_num);
    result = await modifyData_buyerPage.modifyPrice(result);

    return result;
  },
  getSellerOk : async (board_num) => {
    const result = await dao.get.getSellerOk(board_num);

    return result;
  },
  getSellerPage : async (board_num) => {
    const result = await dao.get.getSellerPage(board_num);

    return result;
  },
  getBuyerOk : async (board_num) => {
    const result = await dao.getBuyerOk(board_num);

    return result;
  },
  getUserInfo : async (userId) => {
    const result = await dao.get.getUserInfo(userId);

    return result;
  },
  getBoardInfo : async (board_num) => {
    const result = await dao.get.getBoardInfo(board_num);

    return result;
  }
}

set = {
  setBuyerOk : async (board_num) => {
    const result = await dao.set.setBuyerOk(board_num);
    
    return result;
  },
  setBuyerCancel :  (board_num) => {
    dao.set.setBuyerCancel(board_num);
  },
  setSellerOk : async (board_num) => {
    const result = await dao.set.setSellerOk(board_num);

    return result;
  },
  setTradeSuccess : async (price, sellerId, buyerId) => {
    dao.set.setTradeSuccess(price, sellerId, buyerId);
  },
  setPoint : (userId, point) =>{
    dao.set.setPoint(userId, point);

  }
}

modifyData_buyerPage = {
  modifyPrice: async (list) => {

    let temp = '';
    temp = list.rows[0].BOARD_PRICE;
    list.rows[0].BOARD_PRICE = temp.toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    let start = new Date();
    let diff = start - list.rows[0].BOARD_CREATETIME;

    let seconds = Math.floor((diff / 1000) % 60);
    diff = diff / 1000;
    let minutes = Math.floor((diff / 60) % 60);
    diff = diff / 60;
    let hours = Math.floor((diff / 60) % 24);
    diff = diff / 60;
    let days = Math.floor(diff / 24) - 730487;

    if (days == 0)
      list.rows[0].BOARD_CREATETIME = '오늘';
    else
      list.rows[0].BOARD_CREATETIME = days;


    return list;
  }
}

module.exports = {
  get, set
};