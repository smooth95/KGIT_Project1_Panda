const router = require("express").Router();
const commonCtrl = require("../../controller/common/common_controller");

router.get("/get_isAdmin", commonCtrl.get.get_isAdmin);
router.get("/get_userInfo", commonCtrl.get.get_userInfo);
router.get("/delete_cookie", commonCtrl.set.deleteCookie);

module.exports = router;
