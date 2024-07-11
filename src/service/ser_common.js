const getMessage = (msg, url) => {
  return `<script>
        alert('${msg}');
        location.href="${url}";
    </script>`;
};

const timeModify = (prodcutM) => {
  prodcutM = prodcutM.map((data) => {
    data.SAVE_DATE = data.SAVE_DATE.toLocaleString();
    return data;
  });
  return prodcutM;
};

module.exports = { getMessage ,timeModify};
