const dao = require("../../database/admin/mainDAO")

const process = {
    getProdTotalContent : () => {
        prodTotalContent = dao.mainSelect.getProdTotalContent();
        return prodTotalContent;
    },
    getProdTradeContent : () => {
        prodTradeContent = dao.mainSelect.getProdTradeContent();
        return prodTradeContent;
    },
    getProdCategoryContent : () => {
        prodCategoryContent = dao.mainSelect.getProdCategoryContent();
        return prodCategoryContent;
    },
}



module.exports = {
    process,
}