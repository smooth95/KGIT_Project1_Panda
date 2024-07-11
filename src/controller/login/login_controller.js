const service = require("../../service/login/login_service");
const config = require("../../../config/cookie/config");

const cookieConfig = config.cookieConfig;

const view = {
  getLogin: (req, res) => {
    res.render("login/login");
  }
};

const set = {
  setRegister: async (req, res) => {
    const register = await service.set.setRegister(req.body);

    console.log(register);
    if (register == 1) {
      res.send(`<script>
        alert("회원가입 성공!!");
        location.href = "/login";
      </script>`);
    } else {
      res.send(`<script>
        alert("이미 가입된 사용자 입니다!!");
        location.href = "/login";
      </script>`);
    }
  }
}


const get = {

  getLogin : async (req, res) => {

    const result = await service.get.getLogin(req.body);


    if(result.rows.length >= 1)
      {
        const userCookie = req.signedCookies.myCookie;
        res.cookie("user_id", result.rows[0].INFO_ID, cookieConfig);
        res.cookie("user_name", result.rows[0].INFO_NAME, cookieConfig);
        res.cookie("user_admin", result.rows[0].INFO_ADMIN, cookieConfig);


      res.send(`<script>
            location.href = "/";
          </script>`);


    }
  }
}

module.exports = {
  view,
  set,
  get
};