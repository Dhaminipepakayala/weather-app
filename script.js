const loc=document.getElementById('location');
const cntry=document.getElementById('country');
const iconimg=document.getElementById('weather-icon');
const desc=document.getElementById('des');
const temperature=document.getElementById('temperature');
const fahtemp=document.getElementById('fahtemp');
const rise=document.getElementById('rise');
const set=document.getElementById('set');
const feels=document.getElementById('feels');
const humid=document.getElementById('humid');
const pres=document.getElementById('pres');
const windspeed=document.getElementById('windspeed');

//addEventListener(attach event handlers to specified html elements)
//load(when page is loaded)
window.addEventListener('load',() => {
let latitude;
let longitude;
//navigator.geolocation returns geolocation object that gives access to location of device user
if(navigator.geolocation)//checks if object available or not
{
    navigator.geolocation.getCurrentPosition((position)=>{
        
        latitude=position.coords.latitude;//storing latitude value into a variable from position
        longitude=position.coords.longitude;//stores longitude value
        //getting data lat for latitude lon for longitude units=metric is for celsius
       const url=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7e4bc992182416cb8ccfa991f26f9f41&units=metric`;
        
                    fetch(url)
      .then((response)=>response.json())
      .then((data)=>{
        
        const {temp,feels_like,pressure,humidity}=data.main;
        const {country,sunset,sunrise}=data.sys;
        const place=data.name;
        const {description,icon}=data.weather[0];
        const iconurl=`http://openweathermap.org/img/wn/${icon}@2x.png`;
        const fahrenheit=Math.round((temp*9)+5/32);
        const sr=new Date(sunrise * 1000);//converting into GMT time
        const ss=new Date(sunset * 1000);
        const {speed}=data.wind;
             loc.textContent=`${place}`;
            const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });
         cntry.textContent=','+regionNamesInEnglish.of(`${country}`);
             iconimg.src=iconurl;
            desc.textContent=`${description}`;
            temperature.textContent=`${temp}`+'°C';
             fahtemp.textContent=`${fahrenheit}`+'°F';
             rise.textContent='Sunrise:'+`${sr.toLocaleDateString()}`+" "+`${sr.toLocaleTimeString()}`;
             set.textContent='Sunset:'+`${ss.toLocaleDateString()}`+" "+`${ss.toLocaleTimeString()}`;
             feels.textContent='feels_like '+`${feels_like}`+'°C';
             pres.textContent='pressure '+`${pressure}`+'mb';
             humid.textContent='humidity '+`${humidity}`+'%';
             windspeed.textContent='windspeed '+`${speed}`+'km/hr';
      });
    });
  }
});

  




function search(){
   const city=document.getElementById('city').value;
   console.log(city);
   if(city.length==0)
   msg.textContent='Please enter city name';
  else{
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7e4bc992182416cb8ccfa991f26f9f41&units=metric`;
  console.log(url);
  fetch(url)
  .then((response)=>response.json())
  .then((data)=>{
    
    if(data.message)
       msg.textContent='City not found Unable to fetch data';
    //  alert('city not found unable to fetch data');
    else{
      msg.textContent=' ';
    const {temp,feels_like,pressure,humidity}=data.main;
    const {country,sunset,sunrise}=data.sys;
    const place=data.name;
    const {description,icon}=data.weather[0];
    const iconurl=`http://openweathermap.org/img/wn/${icon}@2x.png`;
    const fahrenheit=Math.round((temp*9)+5/32);
    const sr=new Date(sunrise * 1000);//converting into GMT time
    const ss=new Date(sunset * 1000);
    const {speed}=data.wind;
         loc.textContent=`${place}`;
         const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });
         cntry.textContent=','+regionNamesInEnglish.of(`${country}`);
         iconimg.src=iconurl;
        desc.textContent=`${description}`;
        temperature.textContent=`${temp}`+'°C';
         fahtemp.textContent=`${fahrenheit}`+'°F';
         rise.textContent='Sunrise:'+`${sr.toLocaleDateString()}`+" "+`${sr.toLocaleTimeString()}`;
         set.textContent='Sunset:'+`${ss.toLocaleDateString()}`+" "+`${ss.toLocaleTimeString()}`;
         feels.textContent='feels_like '+`${feels_like}`+'°C';
         pres.textContent='pressure '+`${pressure}`+'mb';
         humid.textContent='humidity '+`${humidity}`+'%';
         windspeed.textContent='windspeed '+`${speed}`+'km/hr';}
  });
  }
   }
