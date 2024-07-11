const { symlink, rmSync } = require('fs');
const memberDAO = require('../../database/info/info_database');
const common = require('../ser_common');
const { userInfo } = require('os');

const infoInsert = {
  inquiryF: async (body, file, fileValidation) => {
    if (fileValidation) {
      msg = fileValidation;
      url = '/info/inquiry_form';
      return common.getMessage(msg, url);
    }
    if (file !== undefined) {
      body.origin_file_name = file.originalname;
    } else {
      body.origin_file_name = 'nan';
    }
    if (result.rowsAffected === 1) {
      msg = '등록되었습니다!';
      url = '/info/inquiry';
    } else {
      msg = '문제발생!';
      url = '/info/inquiry_form';
    }
    return common.getMessage(msg, url);
  },
};

const infoUpdate = {
  modify: async (body, file) => {
    if (file !== undefined) {
      body.image_file_name = file.originalname;
    }
    let result = 0;
    try {
      result = await memberDAO.infoUpdate.modify(body);
    } catch (err) {
      console.log(err);
      msg = '수정중 오류가 발생했습니다.';
      url = '/info/infoModify_form?info_id=' + body.id;
    }
    let msg, url;
    let message = {};
    if (result !== 0) {
      msg = '수정 완료되었습니다.';
      url = '/info/productM/';
    } else {
      msg = '문제가 발생했습니다.';
      url = '/info/infoModify_form?info_id=' + body.id;
    }
    message.msg = common.getMessage(msg, url);
    return message;
  },
  delete: async (query) => {
    let result = 0;
    try {
      result = await memberDAO.infoUpdate.delete(query);
    } catch (err) {
      console.log(err);
      msg = '탈퇴중 오류가 발생했습니다.';
      url = `/info/infoModify_form?info_id='${query.info_id}'`;
    }
    let msg, url;
    let message = {};
    if (result !== 0) {
      msg = '탈퇴가 완료되었습니다.';
      url = '/login/'; 
    } else {
      msg = '문제가 발생했습니다.';
      url = `/info/infoModify_form?info_id='${query.info_id}'`;
    }
    message.msg = common.getMessage(msg, url);
    return message;
  },
};

const infoRead = {
  getProfile: async (userId) => {
    const result = await memberDAO.infoRead.getProfile(userId);
    return result.rows;
  },
  getBoard: async (userId) => {

    const result = await memberDAO.infoRead.getBoard(userId);
    return result.rows;

  },
  content: async (count, board_num, userId,boardInfo) => {
    pageUpdate.upHit(count, board_num, userId);
    const data = await memberDAO.infoRead.content(count, board_num, userId,boardInfo);
    return data.rows[0];
  },
  productM: async (start, userId) => {
      // 사용자의 정보를 기반으로 총 컨텐츠 수 가져오기
    const totalCounter = await memberDAO.infoRead.totalContent(userId);
    start = start && start > 1 ? Number(start) : 1;
     // 페이지 수 계산
    const page = pageOperation(start, totalCounter);
    // 해당 페이지에 해당하는 상품 목록 가져오기
    const productM = await memberDAO.infoRead.productM(userId, page.startNum, page.endNum); 
    data = {};
    data.totalPage = page.totPage;
    data.start = start;
    data.productM = productM;
    return data;
  },
  history: async (start,userId) => {
    const totalCounter = await memberDAO.infoRead.totalContent(userId);
    start = start && start > 1 ? Number(start) : 1;
    const page = pageOperation(start, totalCounter);
    const history = await memberDAO.infoRead.history(userId, page.startNum, page.endNum);
    data = {};
    data.totalPage = page.totPage;
    data.start = start;
    data.history = history;
    return data;
  },
};

const pageUpdate = {
  upHit: (count, board_num) => {
    memberDAO.infoUpdate.upHit(count, board_num);
  },
};

const pageOperation = (start, totalCounter) => {
  let page = {};
  const pageNum = 5; 
  const num = totalCounter % pageNum == 0 ? 0 : 1;

  page.totPage = parseInt(totalCounter / pageNum) + num;

  page.startNum = (start - 1) * pageNum + 1;
  page.endNum = start * pageNum;
  return page;
};

module.exports = {
  infoInsert,
  infoRead,
  infoUpdate,
  pageUpdate,
  pageOperation
};
