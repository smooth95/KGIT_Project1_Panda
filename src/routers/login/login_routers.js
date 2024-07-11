const router = require("express").Router();
const loginCtrl = require("../../controller/login/login_controller");

router.get("/", loginCtrl.view.getLogin);

router.post("/register", loginCtrl.set.setRegister);
router.post("/login", loginCtrl.get.getLogin);


module.exports = router;
