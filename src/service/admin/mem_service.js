const dao = require("../../database/admin/memDAO")

const process = {
    getMemTotalContent : async() => {
        console.log("service getMemTotalContent 실행")
        const totalContent = await dao.memSelect.getMemTotalContent();
        console.log("totalContent : ", totalContent)
        return totalContent;
    },
    getMem : async(totalContent, page) => {
        const content = await getMemPage(totalContent.rows[0]['COUNT(*)'], page);
        console.log("content : ", content)
        content.pageContent = await dao.memSelect.getMem(content.start, content.end)
        return content;
    },
    addMem : (body) => {
        const result = dao.memInsert.addMem(body);
        return result;
    },
    delMem : async (query) => {
        const result = await dao.memDelete.delMem(query)
        return result;
    },
    modMem : async (body) => {
        const result = await dao.memUpdate.modMem(body);
        return result;
    },
    memIdChk : async (id) => {
        const result = await dao.memSelect.idChk(id);
        return result;
    },
    getMemSearchTotalContent : async (query) => {
        const totalContent = await dao.memSelect.getMemSearchTotalContent(query);
        return totalContent;
    },
    getMemSearchContent : async (totalContent, page) => {
        const content = await getMemPage(totalContent.rows[0]['COUNT(*)'], page);
        content.pageContent = await dao.memSelect.getMemSearchPageContent(content.start, content.end);
        return content
    }
}

const readUser = {
    oneUser : async (query) => {
        const user = await dao.memSelect.getUser(query);
        return user;
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
const getMemPage = (total, page) => {
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
    readUser,
}