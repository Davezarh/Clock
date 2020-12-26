let showTime = () => {
    let newDate = new Date();
    let hour = newDate.getHours();
    let minutes = newDate.getMinutes();
    let seconds = newDate.getSeconds();
    let period = "AM";

    if(hour == 0 ){
        hour = 12;
    }else if(hour >= 12){
        hour = hour - 12;
        period = "PM";
    }
    hour = hour < 10 ? "0" + hour : hour; 
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds

    const time = `${hour}:${minutes}:${seconds}:${period}`;
    setInterval(showTime,1000)
    document.querySelector(".Date__Clock").innerText = time
}
const showDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const dayNumeric = date.getDate();
    const today = `${dayNumeric}.${month}.${year}`
    document.querySelector(".Date").innerText = today
}
const getLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
        let latitude = position.coords.latitude;
        let longtiude = position.coords.longitude;
    })
}

showTime();
showDate();
