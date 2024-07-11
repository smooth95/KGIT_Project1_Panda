
module.exports = (app)=>{
  const cookieParser = require("cookie-parser");
  const paymentRouter = require("./src/routers/payment/payment_routers");
  const mainRouter = require("./src/routers/main/main_routers");
  const loginRouter = require("./src/routers/login/login_routers");
  const adminRouter = require("./src/routers/admin/router")(app)
  const commonRouter = require("./src/routers/common/common_routers")
  const infoRouter = require('./src/routers/info/info_router');


  app.use( cookieParser() );
  app.use("/payment", paymentRouter );
  app.use("/", mainRouter );
  app.use("/login", loginRouter );
  app.use("/admin", adminRouter);
  app.use("/common", commonRouter);
  app.use('/info', infoRouter);
  
  const router = require("express").Router();
  
  // router.get('/info', (req, res) => {
  //   res.render('profile');
  // });


  return router;
}
