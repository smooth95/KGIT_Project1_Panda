
const readURL = (input) => {
    console.log( input )
    console.log( input.files[0] )
    const file = input.files[0];
    if( file != "" ){
        let reader = new FileReader();
        reader.readAsDataURL( file )
        reader.onload = (e) => {
            document.getElementById("img").src = e.target.result;
            console.log(document.getElementById("img").src)
        }
    }
}

/*
const readURL = (input) => {
    console.log(input);
    if (input.files && input.files[0]) {
        const file = input.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            console.log(e.target.result);
            document.getElementById("img").src = e.target.result;
        }
    } else {
        console.log("파일이 선택되지 않았습니다.");
    }
}
*/