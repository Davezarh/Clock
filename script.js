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
    document.querySelector(".Date__button").addEventListener ("click", () => { navigator.geolocation.getCurrentPosition(position => {
    let latitude = position.coords.latitude;
    let longtiude = position.coords.longitude;
        fetch(`https://eu1.locationiq.com/v1/reverse.php?key=pk.5d92a33884eeadee31093ffee72e312b&lat=${latitude}&lon=${longtiude}&format=json`)
            .then(response => {
                if(!response.ok){
                  throw new Error(response.status)
                } 
                return response.json()
                })
            .then(data => {  
                const {country_code,state,suburb,county,address29,road,...userAddres} = data.address;   
                    document.querySelector(".Date__button").addEventListener("click", () => {
                    document.querySelector(".Date__Location").innerText =  
                    (`Twoja lokalizacja:
                    Miasto: ${userAddres.city || userAddres.hamlet}
                    Ulica: ${userAddres.city_district || userAddres.neighbourhood }
                    Kraj: ${userAddres.country} 
                    `)},
                    console.log(data),
                )}
            )
            .catch(error => {                                                                     
                console.error(error)
                document.querySelector(".Date__button").addEventListener("click", () => {                                                        
                document.querySelector(".Date__Location").innerText = (`Oops... Coś poszło nie tak \ud83e\udd2f Sprawdź, czy masz połaczenie z internetem`)})
                })
    })}) 
}
getLocation() 
showTime();
showDate();
