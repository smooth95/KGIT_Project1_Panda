const router = require('express').Router();
const infoCtrl = require('../../controller/info/info_controller');
const upload = require('../../../config/file/file_config');

router.get('/profile', infoCtrl.info_views.profile);
router.get('/productM', infoCtrl.info_views.productM);
router.get('/history', infoCtrl.info_views.history);
router.get('/inquiry', infoCtrl.info_views.inquiry);
router.get('/upload', infoCtrl.info_views.upload);
router.get('/inquiry_form', infoCtrl.info_views.inquiryForm);
router.get('/infoModify_form', infoCtrl.info_views.modifyForm);
router.post('/modify',upload.single('image_file_name'),
  infoCtrl.info_process.modify
);
router.get('/delete', infoCtrl.info_process.delete);
router.get('/content/:count/:board_num', infoCtrl.info_views.content);

router.post('/upload', upload.single('image_file_name'), function (req, res) {
  res.send('파일 업로드 완료');
});

router.post('/inquiryF',upload.single('image_file_name'),
  infoCtrl.info_process.inquiryF
);

module.exports = router;
