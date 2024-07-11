const router = require("express").Router();
const paymentCtrl = require("../../controller/payment/payment_controller");

router.get("/point", paymentCtrl.view.getPoint);
router.get("/buyerPage", paymentCtrl.view.getBuyer);
router.get("/sellerPage", paymentCtrl.view.getSeller)

router.get("/get_buyerPage/:board_num", paymentCtrl.getData.getBuyerPage);
router.get("/set_buyer_ok/:board_num", paymentCtrl.setData.setBuyerOk);
router.get("/get_seller_ok/:board_num", paymentCtrl.getData.getSellerOk);
router.get("/set_buyer_cancel/:board_num", paymentCtrl.setData.setBuyerCancel);

router.get("/get_sellerPage/:board_num", paymentCtrl.getData.getSellerPage);
router.get("/set_seller_ok/:board_num", paymentCtrl.setData.setSellerOk);
router.get("/get_buyer_ok/:board_num", paymentCtrl.getData.getBuyerOk);
router.get("/trade_success/:price/:sellerId/:buyerId", paymentCtrl.setData.setTradeSuccess);
router.get("/set_point/:price", paymentCtrl.setData.setPoint);
router.get("/get_userInfo", paymentCtrl.getData.getUserInfo);

module.exports = router;