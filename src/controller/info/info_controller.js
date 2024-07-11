const { query } = require('express');
const service = require('../../service/info/info_service');
const common = require('../../service/ser_common');
const config = require('../../../config/cookie/config');

const cookieConfig = config.cookieConfig;

const info_views = {
  profile: async (req, res) => {
    const userId = req.cookies.user_id;
    const profile = await service.infoRead.getProfile(userId);
    res.render('info/profile', { profile });
  },
  productM: async (req, res) => {
    const userId = req.cookies.user_id;
    const profile = await service.infoRead.getProfile(userId);
    const boardInfo = await service.infoRead.getBoard(userId);
    const data = await service.infoRead.productM(req.query.start,userId ); 
    res.render('info/productM', {
      profile,
      userId,
      boardInfo,
      productM: data.productM,
      start: data.start,
      totalPage: data.totalPage,
    });
  },
  history: async (req, res) => {
    const userId = req.cookies.user_id;
    const profile = await service.infoRead.getProfile(userId);
    const boardInfo = await service.infoRead.getBoard(userId);
    const data = await service.infoRead.history(req.query.start,userId);
    res.render('info/history', {
      profile,
      userId,
      boardInfo,
      history: data.history,
      start: data.start,
      totalPage: data.totalPage,
    });
  },
  inquiry: async (req, res) => {
    const userId = req.cookies.user_id;
    const profile = await service.infoRead.getProfile(userId);
    const boardInfo = await service.infoRead.getBoard(userId);
    res.render('info/inquiry', { profile, userId, boardInfo });
  },
  upload: (req, res) => {
    res.render('info/upload');
  },
  inquiryForm: (req, res) => {
    res.render('info/inquiry_form');
  },
  modifyForm: async (req, res) => {
    const userId = req.cookies.user_id;
    const profile = await service.infoRead.getProfile(userId); 
    res.render('info/infoModify_form', { profile, userId });
  },
  content: async (req, res) => {
    let count = req.params.count;
    let board_num = req.params.board_num;
    const userId = req.cookies.user_id;

    const boardInfo = await service.infoRead.getBoard(userId);
    const data = await service.infoRead.content(count, board_num, userId,boardInfo);

    res.render('info/content', { data });
  },
};

const info_process = {
  modify: async (req, res) => {
    const deleteFile = req.body.image_file_name; 
    const message = await service.infoUpdate.modify(req.body, req.file);
    if (req.file !== undefined && message.result === 1) {
      this.file_process.delete(deleteFile);
    }
    res.send(message.msg);
  },
  delete: async (req, res) => {
    const message = await service.infoUpdate.delete(req.query);
    res.send(message.msg);
  },
  inquiryF: async (req, res) => {
    const msg = await service.infoInsert.inquiryF(
      req.body,
      req.file,
      req.fileValidation
    );
    res.send(msg);
  },
};

const fs = require('fs');
const { user } = require('../../../config/database/db_config');
file_process = {
  delete: (imgName) => {
    if (imgName !== 'nan') {
      try {
        fs.unlinkSync(`./upload_file/${imgName}`);
      } catch (err) {
        console.log(err);
      }
    }
  },

  download: (req, res) => {
    const filePath = `./upload_file/${req.params.imgName}`;
    res.download(filePath);
  },
};

module.exports = { info_views, info_process, file_process };
