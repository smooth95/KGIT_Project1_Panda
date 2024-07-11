const router = require("express").Router();
const mainCtrl = require("../../controller/main/main_controller");


router.get("/", mainCtrl.view.getMain);
router.get("/main/:category_id", mainCtrl.view.getMain_category)
router.get("/get_listView/:count", mainCtrl.view.getMain_board);
router.get("/get_listView_category/:count", mainCtrl.view.getMain_category_board);
router.get("/get_boardId/:board_id", mainCtrl.view.get_Board_id);
router.get("/set_buyer/:board_num", mainCtrl.set.setBuyer )



module.exports = router;
