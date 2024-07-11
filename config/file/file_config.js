const multer = require('multer');
const stg = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, './resources/upload');//다른사람 ./public/image
  },
  filename: (req, file, cd) => {
    cd(null, file.originalname);
  },

  //cd(null, Date.now() + '-' + file.originalname);

});
const f_filter = (req, file, cd) => {
  const type = file.mimetype.split('/');
  if (type[0] == 'image') {
    cd(null, true);
  } else {
    req.fileValidation = '이미지만 저장하세요';
    cd(null, false);
  }
};
const upload = multer({ storage: stg, fileFilter: f_filter });
module.exports = upload;
