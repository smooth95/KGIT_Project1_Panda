const service = require("../../service/admin/main_service")

const admin_view = {
    index : (req, res) => {
        console.log("asdf")
        res.render("admin/main")
    },
}

const admin_process = {
    mainGetData : async (req, res) => {
        console.log("getData실행")
        const prodTotalContent = await service.process.getProdTotalContent();
        console.log("prodTotaoContent : ", prodTotalContent)
        const prodTradeContent = await service.process.getProdTradeContent();
        const prodCategoryContent = await service.process.getProdCategoryContent();
        res.json({
            total : prodTotalContent.rows[0]['COUNT(*)'],
            trade : prodTradeContent.rows[0]['COUNT(*)'],
            category : prodCategoryContent.rows
        })
    },
}



module.exports = {
    admin_view,
    admin_process
}