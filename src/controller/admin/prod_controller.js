const service = require("../../service/admin/prod_service")
const fs = require("fs");

const admin_view = {
    prodList : async (req, res) => {
        const totalContent = await service.process.getProdTotalContent();
        const content = await service.process.getPageContent(totalContent, req.query.page);
        
        res.render("admin/product/prod_list", {
            total : totalContent.rows[0],
            page : content.page,
            pageContent : content.pageContent.rows
        })
    },
    prodMod : async (req, res) => {
        const prod = await service.readProd.oneProd(req.query.num)

        res.render("admin/product/prod_mod", {prod : prod.rows[0]})
    }
    
}

const admin_process = {
    prodPageList : async (req, res) => {
        const totalContent = await service.process.getProdTotalContent();
        const content = await service.process.getPageContent(totalContent, req.query.page);
        res.json({
            curPage : req.query.page,
            total : totalContent.rows[0],
            page : content.page,
            pageContent : content.pageContent.rows
        })
    },
    prodSearch : async (req, res) => {
        const totalContent = await service.process.getProdSearchTotalContent(req.query);
        const content = await service.process.getProdSearchContent(totalContent, req.query.page);

        res.json({
            curPage : req.query.page,
            total : totalContent.rows[0],
            page : content.page,
            pageContent : content.pageContent.rows,
        })
    },
    prodSearchList : async (req, res) => {
        const totalContent = await service.process.getProdSearchTotalContent(req.query);
        const content = await service.process.getProdSearchContent(totalContent, req.query.page);
        res.json({
            curPage : req.query.page,
            total : totalContent.rows[0],
            page : content.page,
            pageContent : content.pageContent.rows,
        })
    },
    prodDel : async (req, res) => {
        const result = await service.process.delProd(req.query.arr);
        if (result.rowsAffected != 0) {
            msg = "삭제가 완료되었습니다.";
        } else {
            msg = "문제가 발생하였습니다.";
        }
        url = "/admin/prod_list"
        res.send(service.sendMsg.msg(msg, url))
    },
    mngProdModChk : async (req, res) => {
        const result = await service.process.modProd(req);
        if (req.file) {
            if (fs.existsSync("resources/upload/image/" + req.body.originImg)) {
                fs.unlinkSync("resources/upload/image/" + req.body.originImg);
            }
        }
        if (result != 0) {
            msg = "변경이 완료되었습니다.";
            url = "/admin/prod_list"
            res.send(service.sendMsg.msg(msg, url))
        } else if (req.fileValidation == 0) {
            res.send(`
                <script>
                    alert('올바른 이미지 파일을 선택하세요');
                    window.location.href = "/admin/prod_mod/?num=${req.body.num}"
                </script>
            `)
        } else {
            res.send(`
                <script>
                    alert('문제발생');
                    window.history.go(-1);;
                </script>
            `)
        }
    },
}

module.exports = {
    admin_view,
    admin_process,
}