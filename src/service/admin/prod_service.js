const dao = require("../../database/admin/prodDAO")

const process = {
    getProdTotalContent : () => {
        const totalContent = dao.prodSelect.getProdTotalContent();
        return totalContent;
    },
    getPageContent : async (totalContent, page) => {
        const content = await getProdPage(totalContent.rows[0]['COUNT(*)'], page);
        content.pageContent = await dao.prodSelect.getProdPageContent(content.start, content.end);
        return content
    },
    getProdSearchTotalContent : async (query) => {
        const totalContent = await dao.prodSelect.getProdSearchTotalContent(query);
        return totalContent;
    }, 
    getProdSearchContent : async (totalContent, page) => {
        const content = await getProdPage(totalContent.rows[0]['COUNT(*)'], page);
        content.pageContent = await dao.prodSelect.getProdSearchPageContent(content.start, content.end);
        return content
    },
    delProd : async (query) => {
        const result = await dao.prodDelete.delProd(query)
        return result;
    },
    modProd : async (req) => {
        const result = await dao.prodUpdate.modProd(req);
        return result;
    }
}


const readProd = {
    oneProd : async (query) => {
        const prod = await dao.prodSelect.getProd(query);
        return prod;
    }
}

const sendMsg = {
    msg : (msg, url) => {
        return `
        <script>
            alert('${msg}');
            location.href = "${url}";
        </script>
    `
    }
}

const getProdPage = (total, page) => {
    if (page == null) {
        page = 1;
    }
    let content = [];
    let pageContent = 50;
    content.page = parseInt(total / pageContent);
    if (total % pageContent != 0) {
        content.page ++;
    }
    content.start = (page - 1) * pageContent +1
    content.end = page*pageContent
    return content;
}



module.exports = {
    process,
    sendMsg,
    readProd
}