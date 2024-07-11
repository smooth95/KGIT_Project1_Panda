module.exports = (app) => {
    const express = require("express");
    const router = express.Router();
    const adminCtrl = require("../../controller/admin/main_controller");
    const adminMemCtrl = require("../../controller/admin/mem_controller");
    const adminProdCtrl = require("../../controller/admin/prod_controller");
    const adminMainCtrl = require("../../controller/admin/main_controller");
    const multer = require("multer");

    app.use("/admin", (req, res, next) => {
        if (req.cookies.user_admin == 0) {
            res.send(`
            <script>
                alert("비정상적인 접근입니다.");
                location.href = "/"
            </script>`)
            return
        }
        next();
    })

    const stg = multer.diskStorage({
        destination : (req, file, cb) => {
            cb(null, "resources/upload");
        },
        filename : (req, file, cb) => {
            cb(null, file.originalname)
        }
    })
    const f_filter = (req, file, cb) => {
        const type = file.mimetype.split("/");
        if (type[1] == "jpg" || type[1] == "jpeg" || type[1] == "png") {
            cb(null, true);
        } else {
            req.fileValidation = 0;
            cb(null, false);
        }
    }

    const upload = multer({storage : stg, fileFilter : f_filter})

    router.get("/", adminCtrl.admin_view.index);


    router.get("/mem_list", adminMemCtrl.admin_view.memList)
    router.get("/mem_add", adminMemCtrl.admin_view.memAdd)
    router.get("/mem_mod", adminMemCtrl.admin_view.memMod)
    router.get("/mem_del", adminMemCtrl.admin_process.memDel)
    router.get("/mem_search", adminMemCtrl.admin_process.memSearch)
    router.get("/mem_search_list", adminMemCtrl.admin_process.memSearchList)
    router.get("/mem_id_check", adminMemCtrl.admin_process.memIdChk)
    router.post("/mem_add_check", adminMemCtrl.admin_process.memAddChk)
    router.post("/mem_mod_check", adminMemCtrl.admin_process.memModChk)
    

    router.get("/prod_list", adminProdCtrl.admin_view.prodList)
    router.get("/prod_Mod", adminProdCtrl.admin_view.prodMod)
    router.get("/prod_del", adminProdCtrl.admin_process.prodDel)
    router.get("/prod_search", adminProdCtrl.admin_process.prodSearch)
    router.get("/prod_page_list", adminProdCtrl.admin_process.prodPageList)
    router.get("/prod_search_list", adminProdCtrl.admin_process.prodSearchList)
    router.post("/prod_mod_check", upload.single("changeImg"), adminProdCtrl.admin_process.mngProdModChk)

    router.get("/main_get_data", adminMainCtrl.admin_process.mainGetData)



    return router;
};

