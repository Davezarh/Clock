const showTime = () => {
    const newDate = new Date();
    let hour = newDate.getHours();
    let minutes = newDate.getMinutes();
    let seconds = newDate.getSeconds();
    let time = `${hour}:${minutes}:${seconds}`
    setInterval(showTime,1000)
    const timer = document.querySelector(".clock").innerText = time
}
const showDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    const dayNumeric = date.getDate()
    const today = `${dayNumeric}.${month}.${year}`
    const data = document.querySelector(".date").innerText = today

}
showTime();
showDate();