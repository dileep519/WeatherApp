document.getElementById('d4').style.display='none';
var lati,lon;
document.querySelector("#i1").addEventListener('keypress',function(){
if(event.code=='Enter'){
    setTimeout(() => {
        var z=document.querySelector('#i1').value;
        lati=lat;
        lon=long;
        document.getElementById('d4').style.display='block';
     dothis(z);
    },500);
    }
});
function dothis(z){
    var r=z.split(',');
    if(r.length==1){
        z=z.split('-');
    }
    else{
        z=z.split(',');
    }
    var c=z[z.length-1]; 
    z=z[0].split('');
    z[0]=z[0].toUpperCase();
    z=z.join('')
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${lon}&units=Imperial&APPID=40c43215241423a98d101e9aa373f731`).then(res=>{
        return res.json();
    }).then(result=>{
        var req=document.getElementById('d3');
        var  image;
        switch(result.weather[0].main){
            case 'Clear':
                image='url("./src/images/sunny.jpg")';
                break;
            case 'Clouds':
                image='url("./src/images/Cloudy.jpg")';
                break;
            case 'Mist':
            case 'Rain':
            case 'Drizzle':
                image='url("./src/images/rain.jpg")';
                break;
            case 'Thunderstrom':
                image='url("./src/images/lightning.jpg")';
                break;
            case 'snow':
                image='url("./src/images/snow.jpg")';
                break;
            default:
                break;
        }
        req.style.backgroundImage=image;
        document.getElementById('d3').style.display='block';
        document.getElementById('p1').textContent=z;
        document.getElementById('temp1').innerHTML=result.main.temp+'&#176'+'F';
        document.getElementById('typ').innerHTML=result.weather[0].main;
        document.getElementById('im1').src='http://openweathermap.org/img/w/'+result.weather[0].icon+'.png';
        document.getElementById('wind1').innerHTML='Wind at '+Math.floor(result.wind.speed)+' m/s';
        document.getElementById('humid').innerHTML='Humidity levels at '+result.main.humidity;
        
    }).catch(error=>{
        document.getElementById('p1').textContent=z;
        document.getElementById('temp1').innerHTML='';
        document.getElementById('typ').innerHTML='';
        document.getElementById('im1').src='';
        document.getElementById('wind1').innerHTML='Sorry Data Not Available';
        document.getElementById('humid').innerHTML='';
    });
    document.querySelector('#i1').value="";
}