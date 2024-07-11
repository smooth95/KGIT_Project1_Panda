
$(document).ready(
  function() {
    const query = window.location.search;
    const param = new URLSearchParams(query);
    const board_num = param.get('board_num');

    fetch(`/payment/get_sellerPage/` + board_num)
    .then(res =>  res.json())
    .then(data => {
      
      let profile_img = document.querySelector("#profile_img");
      profile_img.setAttribute("src", "../../../resources/upload/" + data[0].BOARD_IMG);

      let profile_title = document.querySelector("#title");
      profile_title.innerHTML += data[0].BOARD_TITLE;

      let profile_name = document.querySelector("#name");
      profile_name.innerHTML += data[0].INFO_NAME;

      let profile_tel = document.querySelector("#tel");
      profile_tel.innerHTML += data[0].INFO_PHONE;

    });
  
    const button_wrapper = document.querySelector("#button_wrapper");
    button_wrapper.addEventListener("click", (e) => {
      if(e.target.value == '판매완료')
      {
        fetch('/payment/set_seller_ok/' + board_num)
        .then(res => res.json())
        .then(data => {
          
          if(data[0].BOARD_ISBUYEROK === null || data[0].BOARD_ISBUYEROK == 0 )
          {
            alert("구매자가 구매 완료 버튼을 누를 때까지 대기중 입니다!!");

            let intervalId = setInterval(function () { 
              fetch('/payment/get_buyer_ok/' + board_num)
              .then(res => res.json())
              .then( data_chk => {
                
                if(data_chk[0].BOARD_ISBUYEROK !== null)
                {
                  alert("판매가 완료 되었습니다!!!");
                  fetch(`/payment/get_sellerPage/` + board_num)
                  .then(res =>  res.json())
                  .then(data => {
                    console.log(data);
                    tradeSuccess(data[0].BOARD_PRICE, data[0].BOARD_ID, data[0].BOARD_BUYERID)
                  });
                  clearInterval(intervalId);
                  location.href ="/";
                }
              });
              }, 5000);
          }
          else{
            alert("판매 성공!!!!");
            fetch(`/payment/get_sellerPage/` + board_num)
            .then(res =>  res.json())
            .then(data => {
              console.log(data[0].BOARD_BUYERID);
              tradeSuccess(data[0].BOARD_PRICE, data[0].BOARD_ID, data[0].BOARD_BUYERID)
            });
            
          }
        })
      }
      else if(e.target.value == '구매취소')
      {
        fetch('/payment/set_buyer_cancel/' + board_num)
        .then(res => res.json())
        .then(data => {
          alert("구매가 취소되었습니다!!");
          location.href = "/";
        })
      }
    })
  }
);

const tradeSuccess = (price, sellerId, buyerId) => {
  fetch(`/payment/trade_success/` + price + `/` + sellerId + `/` + buyerId)
  .then(res => res.json())
  .then(data => {

  })
};