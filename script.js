const baseUrl = "https://66780c740bd45250561d5340.mockapi.io/api/v1/data"

const mapData = data => data.map(({_id, ...rest}) => ({id: _id, ...rest}))

const getDataList = () => fetch(baseUrl).then(responce => responce.json()).then(mapData)

getDataList().then((responce) => setBanners(responce))

function setBanners(data) {
    document.getElementById("activities_banner").innerHTML = data[0]["data"]
    document.getElementById("header_banner_left").innerHTML = data[1]["data"]
    document.getElementById("header_banner_right").innerHTML = data[2]["data"]
}

window.onload = function () {
    //if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    //    document.querySelector("body").innerHTML = "<h1>This site is not available on your device, sorry</h1>"
    //}
}