let showTime = () => {
    let newDate = new Date();
    let hour = newDate.getHours();
    let minutes = newDate.getMinutes();
    let seconds = newDate.getSeconds();
    
    hour = hour < 10 ? "0" + hour : hour; 
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds

    const time = `${hour}:${minutes}:${seconds}`;
    setInterval(showTime,1000)
    document.querySelector(".section__Clock").innerText = time
}
const showDate = () => {
    const date = new Date();
    const newDate =  date.toLocaleDateString(undefined,{weekday:"long", month:"long", day:"numeric",year:"numeric"})
    document.querySelector(".section__Date").innerText = newDate
}

const getLocation = () => {  
    const button = document.querySelector(".button");
    const location = document.querySelector(".section__Location");

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    const errorCallBack = (error) => {
            switch(error.code){
                case error.PERMISSION_DENIED:
                    location.innerText = ("Nie pozwoliłeś na pobranie twojej lokalizacji 😢")
                    button.remove()
                break; 
                case error.POSITION_UNAVAILABLE:
                    location.innerText = ("Nie mogę uzyskać informacji o twojej lokalizacji, przykro mi 😢") 
                    button.remove()    
                break; 
                }
        }

    const successCallBack = (position) => {
        const latitude = position.coords.latitude;
        const longtiude = position.coords.longitude;

        fetch(`https://eu1.locationiq.com/v1/reverse.php?key=pk.5d92a33884eeadee31093ffee72e312b&lat=${latitude}&lon=${longtiude}&format=json`)
            .then(response => {
                if(!response.ok){
                throw new Error(response.status)
                } 
             return response.json()
            })
                .then(data => {  
                    const {country_code,state,suburb,county,address29,...userAddres} = data.address;   
                    location.innerText =  
                    (`${userAddres.city || userAddres.hamlet}, ul ${userAddres.city_district || userAddres.neighbourhood || userAddres.road }, ${userAddres.country}`)
                    button.remove()
                 })
                    .catch(error => {                                                                  
                         console.error(error)                                                     
                         location.innerText = (`Oops... Coś poszło nie tak \ud83e\udd2f Sprawdź, czy masz połaczenie z internetem`)
                         button.remove()
                    })
        }

    button.addEventListener ("click", () => {navigator.geolocation.getCurrentPosition(successCallBack,errorCallBack,options)})
} 

getLocation() 
showTime();
showDate();
 