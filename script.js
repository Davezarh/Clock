const newDate = new Date();

const options = {
    weekday:"long",
    year:"numeric",
    hour:"numeric",
    minute:"numeric",
    second:"numeric",
    day:"numeric",
    month:"long",
}
const dateLocale = newDate.toLocaleDateString(undefined,(options));
const clock = document.querySelector(".clock");

const setHours = setInterval(()=>{clock.innerText=(`${dateLocale}`)},1000)

