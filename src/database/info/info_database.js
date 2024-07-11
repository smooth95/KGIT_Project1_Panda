//const con =require("../common_dao")

const oracledb = require('oracledb');
const dbConfig = require('../../../config/database/db_config');
const { query } = require('express');
//const { realpathSync } = require('fs');
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

const infoUpdate = {
  modify: async (body) => {
    let con = await oracledb.getConnection(dbConfig);
    const sql = `update user_info set info_name=:info_name, info_pw=:info_pw, info_region=:info_region,
            info_phone=:info_phone, info_img=:info_img where info_id=:info_id`;
    let result;
    try {
      result = await (
        await con
      ).execute(sql, {
        info_name: body.name,
        info_pw: body.pw,
        info_region: body.addr,
        info_phone: body.phone,
        info_img: body.image_file_name,
        info_id: body.id,
      });
    } catch (err) {
      console.log(err);
    }
    return result;
  },
  delete: async (query) => {
    let result;
    try {
      let con = await oracledb.getConnection(dbConfig);
      const sql = `delete from user_info where info_id='${query.info_id}'`;
      result = await (await con).execute(sql);
    } catch (err) {
      console.log(err);
    }
    return result;
  },
  upHit: async (count, board_num) => {
    const con = await oracledb.getConnection(dbConfig);
    const sql = `update user_board set board_views=board_views+1 where board_num='${board_num}'`;
    await con.execute(sql);
  },
};

const infoRead = {
  getProfile: async (userId) => {
    let con = await oracledb.getConnection(dbConfig);
    const sql = `select * from user_info where info_id = '${userId}'`;
    let result;
    try {
      result = await con.execute(sql);
    } catch (err) {
      console.log(err);
    }
    return result;
  },
  getBoard: async (userId) => {
    let con = await oracledb.getConnection(dbConfig);
    const sql = `select * from(select rownum rn, A.* from(select * from user_info where info_id = '${userId}' order by info_id desc)A)
    where rn between 1 and 8`; 
    let result;
    try {
      result = await (await con).execute(sql);
    } catch (err) {
      console.log(err);
    }
    return result;
  },
  content: async (count, board_num, body,boardInfo) => {
    let con = await oracledb.getConnection(dbConfig);
    const sql = `select * from user_board where board_id='${body}'`;
    const data = await con.execute(sql);
    return data;
  },
  productM: async (userId, start, end) => {
    const con = await oracledb.getConnection(dbConfig);
    const sql = `select * from(select rownum rn, A.* from(select * from user_board where board_id='${userId}' order by board_num desc)A)
    where rn between ${start} and ${end}`;
    let productM;
    try {
      const result = await (await con).execute(sql);
      productM = result.rows; 
    } catch (err) {
      console.log(err);
    }
    return productM;
  },
  history: async (userId, start, end) => {
    const con = await oracledb.getConnection(dbConfig);
    const sql = `select * from(select rownum rn, A.* from(select * from user_board where board_id='${userId}' order by board_num desc)A)
    where rn between ${start} and ${end}`;
    let history
    try{
      const result = await (await con).execute(sql);
      history= result.rows;
    }catch(err){
      console.log(err)
    }
    return history;
  },
  totalContent: async (userId) => {
    const con = await oracledb.getConnection(dbConfig);
      // 해당 사용자의 컨텐츠 수 가져오기
    const sql = `select count(*) from user_board where board_id ='${userId}'`;
    const totalContent = await (await con).execute(sql);
    return totalContent.rows[0]['COUNT(*)'];
  },
};

module.exports = {
  infoRead,
  infoUpdate,
};
