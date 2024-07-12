const con = require("../common_dao");

const prodSelect = {
    getProdTotalContent : async () => {
        const sql = "select count(*) from user_board"
        let totalContent;
        try {
            totalContent = (await con).execute(sql);
        } catch (err) {
            console.log(err)
        }
        return totalContent;
    },
    getProdPageContent : async (start, end) => {
        const sql = `select B.* from(select rownum rn, A.* from(select * from user_board order by board_num desc)A)B where rn between ${start} and ${end}`
        let pageContent;
        try {
            pageContent = await (await con).execute(sql);
        } catch(err) {
            console.log(err);
        }
        return pageContent
    },
    getProdSearchTotalContent : async (query) => {
        let sql;
        if (query.page) {
            const input = getSearchData();
            sql = `select count(*) from user_board where ${input.type} like '%${input.text}%'`
        } else {
            sql = `select count(*) from user_board where ${query.type} like '%${query.text}%'`
            setSearchData(query.type, query.text);
        }
        let content;
        try {
            content = (await con).execute(sql);
        } catch (err) {
            console.log(err)
        }
        return content
    },
    getProdSearchPageContent : async (start, end) => {
        const input = getSearchData();
        console.log("input : ", input)
        const sql = `select B.* from(select rownum rn, A.* from(select * from user_board where ${input.type} like '%${input.text}%')A)B where rn between ${start} and ${end}`
        let pageContent;
        try {
            pageContent = await (await con).execute(sql);
        } catch(err) {
            console.log(err);
        }
        return pageContent
    },
    getProd : async (query) => {
        const sql = `select * from user_board where board_num='${query}'`;
        let user;
        try {
            user = (await con).execute(sql)
        } catch(err) {
            console.log(err)
        }
        return user;

    }
}
const prodDelete = {
    delProd : async (query) => {
        if (Array.isArray(query)) {
            let setQuery = query.map(item => `'${item}'`)
            const sql = `delete from user_board where board_num in (${setQuery})`
            try {
                result = (await con).execute(sql);
            } catch (err) {
                console.log(err);
            }
        } 
        else {
            const sql = `delete from user_board where board_num='${query}'`
            try {
                result = (await con).execute(sql);
            } catch (err) {
                console.log(err);
            }
        }
        return result;
    }
}
const prodUpdate = {
    modProd : async (req) => {
        console.log(!req.file)
        const sql = "update user_board set board_title=:title, board_img=:changeImg, board_price=:price, board_condition=:condition, board_tradeway=:tradeway, board_pollution=:pollution, board_detail=:detail, board_istrading=:istrading, board_views=:views, board_region=:region, board_regiondetail=:regiondetail, board_category=:category, board_buyerid=:buyerid, board_isbuyerok=:isbuyerok, board_issellerok=:issellerok WHERE board_num=:num";
        let result = 0
        try {
            if (!req.file && req.fileValidation!=0) {
                result = (await con).execute(sql, [req.body.title, req.body.originImg, req.body.price, req.body.condition, req.body.tradeway, req.body.pollution, req.body.detail, req.body.istrading, req.body.views, req.body.region, req.body.regiondetail, req.body.category, req.body.buyerid, req.body.isbuyerok, req.body.issellerok, req.body.num])
            } else {
                result = (await con).execute(sql, [req.body.title, req.file.originalname, req.body.price, req.body.condition, req.body.tradeway, req.body.pollution, req.body.detail, req.body.istrading, req.body.views, req.body.region, req.body.regiondetail, req.body.category, req.body.buyerid, req.body.isbuyerok, req.body.issellerok, req.body.num])
            }
        } catch (err) {
            console.log(err)
        }
        return result;
    }
}

let input = [];

const setSearchData = (type, text) => {
    input.type = type;
    input.text = text;
}
const getSearchData = () => {
    return input
}


module.exports = {
    prodSelect,
    prodDelete,
    prodUpdate
}