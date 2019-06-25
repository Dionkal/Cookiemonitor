function getCookies() {
    // var cookieList = document.cookie;
    var cookieList = cookies.getALL(null)
    console.log("Cookie List:\n")
    console.log(cookieList);
}