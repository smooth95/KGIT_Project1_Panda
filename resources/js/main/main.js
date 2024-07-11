//<link href="/static/css/main/main_css.css" rel="stylesheet"></link>
let count = 1;
let board_wrapper = document.querySelector(".board_wrapper");
let check = true
let count_req = 1;

window.addEventListener('scroll', () => {

  if(window.innerHeight + window.scrollY >= document.body.offsetHeight && check){

    check = false;

    fetch(`/get_listView/` + count_req)
    .then(res =>  res.json())
    .then(data => {

      let count = 0;
      
      data.list.forEach( d => {
        count++;
        if(count % 5 == 0)
        {
          // 최상위 부모 생성
          let board_list = document.createElement("div");
          board_list.classList.add("board_list", "board_child_img_last");
          board_list.setAttribute("data-value", d.BOARD_NUM);
          
          // img 태그 생성 및 속성 추가
          let img = document.createElement("img");
          img.setAttribute("src", d.BOARD_IMG);
          img.classList.add("child_img");
          img.setAttribute("src", "../../../resources/upload/" + d.BOARD_IMG);

          // img 태그 자식 추가
          board_list.appendChild(img);

          // 차상위 부모 생성
          let div_second_parent = document.createElement("div");

          // 제목 생성
          let p_title = document.createElement("p");
          p_title.classList.add("board_title");
          p_title.innerText = d.BOARD_TITLE;

          // 제목 차상위 부모에 넣기
          div_second_parent.appendChild(p_title);

          // 가격과 날짜 부모 생성
          let div_parent_of_price_date = document.createElement("div");
          div_parent_of_price_date.classList.add("board_bottom_wrapper");

          // 가격들의 부모 생성
          let div_parent_of_price = document.createElement("div");
          
          // 가격 생성
          let span_price = document.createElement("span");
          // 원 생성
          let span_won = document.createElement("span");

          span_price.classList.add("board_price");
          span_price.innerText = d.BOARD_PRICE;
          span_won.classList.add("board_won");
          span_won.innerText = '원';

          // 가격들의 부모에 넣기
          div_parent_of_price.appendChild(span_price);
          div_parent_of_price.appendChild(span_won);

          // 날짜의 부모 생성
          let div_parent_of_date = document.createElement("div");

          // 날짜 생성
          let span_date = document.createElement("span");
          span_date.classList.add("board_date");
          
          if(d.BOARD_CREATETIME == '오늘')
          {
            span_date.innerText = d.BOARD_CREATETIME;
          }
          else{
            span_date.innerText = d.BOARD_CREATETIME + '일전';
          }

          // 날짜의 부모에 날짜 넣기
          div_parent_of_date.appendChild(span_date);

          // 가격의 부모를 가격과 날짜의 부모에 넣기
          div_parent_of_price_date.appendChild(div_parent_of_price);

          // 날짜의 부모를 가격과 날자의 부모에 넣기
          div_parent_of_price_date.appendChild(div_parent_of_date);


          // 차상위 부모에 가격과 날짜의 부모 넣기
          div_second_parent.appendChild(div_parent_of_price_date);

          // 거래 방법 부모 생성
          let div_parent_of_tradWay = document.createElement("div");
          div_parent_of_tradWay.classList.add("board_trade_way_wrapper", d.BOARD_TRADEWAY);

          // 택배 거래 생성
          let div_parent_of_tak = document.createElement("div");
          // 직 거래 생성
          let div_parent_of_giek = document.createElement("div");

          if(d.BOARD_TRADEWAY == 0)
          {
            div_parent_of_tak.classList.add("board_trade", "tradeWay0", "green");
            div_parent_of_giek.classList.add("board_trade", "tradeWay1", "red");
          }
          else if(d.BOARD_TRADEWAY == 1)
          {
            div_parent_of_tak.classList.add("board_trade", "tradeWay0", "red");
            div_parent_of_giek.classList.add("board_trade", "tradeWay1", "green");
          }
          else
          {
            div_parent_of_tak.classList.add("board_trade", "tradeWay0", "green");
            div_parent_of_giek.classList.add("board_trade", "tradeWay1", "green");
          }

          // 택배 거래 p 태그 생성
          let p_tak = document.createElement("p");
          p_tak.classList.add("tradeWay_P");
          p_tak.innerText = "택배";

          // 직 거래 p 태그 생성
          let p_giek = document.createElement("p");
          p_giek.classList.add("tradeWay_P");
          p_giek.innerText = "직거래";

          // 각각의 p 부모에 넣기
          div_parent_of_tak.appendChild(p_tak);
          div_parent_of_giek.appendChild(p_giek);

          // 택배, 직거래 부모에 넣기
          div_parent_of_tradWay.appendChild(div_parent_of_tak);
          div_parent_of_tradWay.appendChild(div_parent_of_giek);
          
          // 차상위 부모에 거래 방법 넣기
          div_second_parent.appendChild(div_parent_of_tradWay);

          // 최상위 부모에 차상위 부모 넣기
          board_list.appendChild(div_second_parent);

          // 최상위 부모 게시판에 넣기
          board_wrapper.appendChild(board_list);
        }
        else
        {
          // 최상위 부모 생성
          let board_list = document.createElement("div");
          board_list.classList.add("board_list", "board_child_img");
          board_list.setAttribute("data-value", d.BOARD_NUM);

          // img 태그 생성 및 속성 추가
          let img = document.createElement("img");
          img.setAttribute("src", d.BOARD_IMG);
          img.classList.add("child_img");
          img.setAttribute("src", "../../../resources/upload/" + d.BOARD_IMG);

          // img 태그 자식 추가
          board_list.appendChild(img);

          // 차상위 부모 생성
          let div_second_parent = document.createElement("div");

          // 제목 생성
          let p_title = document.createElement("p");
          p_title.classList.add("board_title");
          p_title.innerText = d.BOARD_TITLE;

          // 제목 차상위 부모에 넣기
          div_second_parent.appendChild(p_title);

          // 가격과 날짜 부모 생성
          let div_parent_of_price_date = document.createElement("div");
          div_parent_of_price_date.classList.add("board_bottom_wrapper");

          // 가격들의 부모 생성
          let div_parent_of_price = document.createElement("div");
          
          // 가격 생성
          let span_price = document.createElement("span");
          // 원 생성
          let span_won = document.createElement("span");

          span_price.classList.add("board_price");
          span_price.innerText = d.BOARD_PRICE;
          span_won.classList.add("board_won");
          span_won.innerText = '원';

          // 가격들의 부모에 넣기
          div_parent_of_price.appendChild(span_price);
          div_parent_of_price.appendChild(span_won);

          // 날짜의 부모 생성
          let div_parent_of_date = document.createElement("div");

          // 날짜 생성
          let span_date = document.createElement("span");
          span_date.classList.add("board_date");

          if(d.BOARD_CREATETIME == '오늘')
          {
            span_date.innerText = d.BOARD_CREATETIME;
          }
          else{
            span_date.innerText = d.BOARD_CREATETIME + '일전';
          }

          // 날짜의 부모에 날짜 넣기
          div_parent_of_date.appendChild(span_date);

          // 가격의 부모를 가격과 날짜의 부모에 넣기
          div_parent_of_price_date.appendChild(div_parent_of_price);

          // 날짜의 부모를 가격과 날자의 부모에 넣기
          div_parent_of_price_date.appendChild(div_parent_of_date);


          // 차상위 부모에 가격과 날짜의 부모 넣기
          div_second_parent.appendChild(div_parent_of_price_date);

          // 거래 방법 부모 생성
          let div_parent_of_tradWay = document.createElement("div");
          div_parent_of_tradWay.classList.add("board_trade_way_wrapper", d.BOARD_TRADEWAY);

          // 택배 거래 생성
          let div_parent_of_tak = document.createElement("div");
          // 직 거래 생성
          let div_parent_of_giek = document.createElement("div");

          if(d.BOARD_TRADEWAY == 0)
          {
            div_parent_of_tak.classList.add("board_trade", "tradeWay0", "green");
            div_parent_of_giek.classList.add("board_trade", "tradeWay1", "red");
          }
          else if(d.BOARD_TRADEWAY == 1)
          {
            div_parent_of_tak.classList.add("board_trade", "tradeWay0", "red");
            div_parent_of_giek.classList.add("board_trade", "tradeWay1", "green");
          }
          else
          {
            div_parent_of_tak.classList.add("board_trade", "tradeWay0", "green");
            div_parent_of_giek.classList.add("board_trade", "tradeWay1", "green");
          }

         // 택배 거래 p 태그 생성
         let p_tak = document.createElement("p");
         p_tak.classList.add("tradeWay_P");
         p_tak.innerText = "택배";

         // 직 거래 p 태그 생성
         let p_giek = document.createElement("p");
         p_giek.classList.add("tradeWay_P");
         p_giek.innerText = "직거래";

         // 각각의 p 부모에 넣기
         div_parent_of_tak.appendChild(p_tak);
         div_parent_of_giek.appendChild(p_giek);

          // 택배, 직거래 부모에 넣기
          div_parent_of_tradWay.appendChild(div_parent_of_tak);
          div_parent_of_tradWay.appendChild(div_parent_of_giek);
          
          // 차상위 부모에 거래 방법 넣기
          div_second_parent.appendChild(div_parent_of_tradWay);

          // 최상위 부모에 차상위 부모 넣기
          board_list.appendChild(div_second_parent);

          // 최상위 부모 게시판에 넣기
          board_wrapper.appendChild(board_list);
        }
      })
      count_req++;
      check = true;
    })
  }
});



const board = document.querySelector(".board_wrapper");

board.addEventListener("click", (e) => {

  let parent = e.target;

  if(e.target.classList.item(0) == 'board_wrapper')
    return ;

  for(let i = 0; i < 5; i++)
  {
    if(parent.parentElement.classList.item(0) != 'board_list')
    {
      parent = parent.parentElement;
    }
    else if(parent.parentElement.classList.item(0) == 'board_list')
    {

      fetch(`/get_boardId/` + parent.parentElement.getAttribute('data-value'))
      .then(res =>  res.json())
      .then(data => {
        console.log(data.result);
        board_id = data.BOARD_ID;
        
        if(data.result.BOARD_BUYERID == null && data.result.BOARD_ID != data.user_id)
        {
          fetch(`/set_buyer/` + parent.parentElement.getAttribute('data-value'))
          .then(res =>  res.json())
          .then(data => {
          });
          location.href = "/payment/buyerPage?board_num=" + parent.parentElement.getAttribute('data-value');  
        }
        else if(data.result.BOARD_ID == data.user_id)
        {
          location.href = "/payment/sellerPage?board_num=" + parent.parentElement.getAttribute('data-value');  
        }
        else if(data.result.BOARD_BUYERID == data.user_id)
        {
          location.href = "/payment/buyerPage?board_num=" + parent.parentElement.getAttribute('data-value');  
        }
        else if(data.result.BOARD_BUYERID != null && data.result.BOARD_ID != data.user_id)
        {
          alert("이미 거래중인 게시글 입니다!!");
          location.href = "/"; 
        }
      });
      break;
    }
  }
});