const dao = require("../../database/main/mainDAO");

getBoard = {
  getFirstBoard: async () => {
    let result = await dao.getBoard.getFirstBoard();
    result = modifyData.modifyPrice(result);
    return result;
  },
  getNBoard: async (count) => {
    let result = await dao.getBoard.getNBoard(count);
    if(result != 0)
    {
      result = modifyData.modifyPrice(result);
    }

    return result;
  },
  getCategoryBoard : async (category_id) => {
    let result = await dao.getBoard.getCategoryBoard(category_id);

    result = modifyData.modifyPrice(result);

    return result;
  },
  getCategory_NBoard : async (category, count) => {
    let result = await dao.getBoard.getCategory_NBoard(category, count);

    result = modifyData.modifyPrice( result );

    return result;
  },
  getBoardId : async (board_id) => {
    const result = await dao.getBoard.getBoardId(board_id);

    return result;
  }
}

modifyData = {
  modifyPrice: async (list) => {

    let temp = '';
    for (let i = 0; i < list.rows.length; i++) {
      temp = list.rows[i].BOARD_PRICE;
      list.rows[i].BOARD_PRICE = temp.toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

      let start = new Date();
      let diff = start - list.rows[i].BOARD_CREATETIME;
      
      let seconds = Math.floor((diff / 1000) % 60);
      diff = diff / 1000;
      let minutes = Math.floor((diff / 60) % 60);
      diff = diff / 60;
      let hours = Math.floor((diff / 60) % 24);
      diff = diff / 60;
      let days = Math.floor(diff / 24);

      if(days == 0)
        list.rows[i].BOARD_CREATETIME = '오늘';
      else
        list.rows[i].BOARD_CREATETIME = days;
    }

    return list;
  }
}

const set = {
  setBuyer : (user_id, board_num) => {
    dao.set.setBuyer(user_id, board_num);
  }
}

module.exports = {
  getBoard, set
};