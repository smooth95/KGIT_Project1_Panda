
const service = require("../../service/main/main_service");

let category = 0;

const view = {
  getMain : async(req, res) => {
    const board = await getDB.getFirstBoard();

    const test = req.cookies.user_id;
    //console.log(test);
    res.render("main/main", { list : board, category : 0});

  },
  getMain_board : async(req, res) => {
    let count = req.params.count;
    const board = await getDB.getNBoard(count);
    
    console.log("board :", count);
    if(board != 0)
      res.json({list : board});
  },
  getMain_category : async(req, res) => {
    const board = await getDB.getCategoryBoard(req.params.category_id);
    
    // 이미지 경로 확인해보기 ( 테스트 용 )
    if(req.params.category_id != 123)
      category = req.params.category_id;

   res.render("main/main", { list : board, category: category});
  },
  getMain_category_board : async (req, res) => {
    let count = req.params.count;
    const board = await getDB.getCategory_NBoard(category, count);

    console.log("board :", count);
    if(board != 0)
      res.json({list : board});
  },
  get_Board_id : async (req, res) => {
    const result = await service.getBoard.getBoardId(req.params.board_id);
    res.json({result, user_id : req.cookies.user_id});
  }
}

const getDB ={
   getFirstBoard : async () => {
     const result = await service.getBoard.getFirstBoard();
    
     return result.rows;
  },
  getNBoard : async ( count ) => {
    const result = await service.getBoard.getNBoard( count );

    return result.rows;
  },
  getCategoryBoard : async (category_id) => {
    const result = await service.getBoard.getCategoryBoard(category_id);

    return result.rows;
  },
  getCategory_NBoard : async (category, count) => {
    const result = await service.getBoard.getCategory_NBoard(category, count);


    return result.rows;
  }
}

const set = {
  setBuyer : (req, res) => {
    service.set.setBuyer(req.cookies.user_id, req.params.board_num);
  }

}



module.exports = { view, getDB, set };

