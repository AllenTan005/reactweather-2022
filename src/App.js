
// import './App.css';
import searchIcon from './assets/search-icon.svg'
import Sun from './assets/sun.svg'
import rain from './assets/rain.svg'
import cloudy from './assets/cloudy.svg'
import pressure from './assets/pressure-blue.svg'
import wind from './assets/wind-blue.svg'
import themometer from './assets/termometer-blue.svg'
import humidity from './assets/humidity-blue.svg'
import clearBg from './assets/clear-bg.svg'
import cloudsBg from './assets/clouds-bg.svg'
import rainBg from './assets/Rainbg.svg'
import axios from "axios";
import {useState, useEffect, useRef} from 'react'


function App() {
 const [weatherDataState, setWeatherDataState] = useState({})
 const [mainImg, setMainImg] = useState(Sun)
 const weatherData = useRef({})
 const tempRef = useRef(0)
 const weatherRef = useRef({})
 const sysRef = useRef({})
 const windRef = useRef({})
 const [query, setQuery] = useState('Taipei')


useEffect(  ()  =>{
   weatherApi()

},[])

  const weatherApi  = async () => {
  await  axios
    .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=49c4f1c768d6bef31b74afc5737bce0b`
    )
    .then((res) => {
        console.log("weather", res.data);
        weatherData.current = res.data
        // let parsedData = res.data
        setWeatherDataState(res.data)
        tempRef.current = weatherData.current.main
        weatherRef.current = weatherData.current.weather[0]
        sysRef.current = weatherData.current.sys
        windRef.current  = weatherData.current.wind
        console.log('weatherData',weatherData);
        // console.log('weatherDataState',weatherDataState);
    })
    .catch((error) => {
        // handle error
        console.log(error);
    });
   
  }
  let mainWeatherImg = null

  if(weatherRef.current.main === 'Clear'){
    mainWeatherImg = Sun
  }else if(weatherRef.current.main === 'Clouds'){
    mainWeatherImg = cloudy
  }else if(weatherRef.current.main === 'Rain' || weatherRef.current.main === 'Thunderstorm'){
    mainWeatherImg = rain
  }

  const temperature = tempRef.current.temp
   
  console.log('temperature',Math.round(temperature))

  return (
    <div className="App bg-gradient-to-r from-[#70AFEA] to-[#a4ccf000] h-[100vh] ">
      {/* // <div
 
      // style={{
      //   backgroundImage:"url(" + {rainBg} + ")",
       
      //   backgroundPosition: 'center',
      //   backgroundSize: 'cover',
      //   backgroundRepeat: 'no-repeat'
      // }}> */}
   {/* seacrh bar */}
   <div className="flex justify-center pt-[2rem] items-center">
    <div className="h-[38px] w-[40%] flex justify-center">
      <input
       type="text" 
      className="rounded-md w-[100%] indent-[5px] "
      onChange={(e) => setQuery(e.target.value)}
      value={query}
       />
      </div>
      <div className="flex ml-3 ">
        <button className="bg-[#fff] rounded-sm h-[38px] p-3" onClick={weatherApi}><img src={searchIcon}  alt=""/></button>
      </div>
   </div>

  <div className='flex px-10 py-8'>
      <div className='bg-white shadow-sm rounded-lg w-[100%]  p-5'>
      <h1 className='font-bold text-2xl '>Current Weather</h1>
      <p className='text-xl font-bold text-center'>{weatherData.current.name}&nbsp; &nbsp;  {sysRef.current.country}</p>
      <div className='flex mt-5 items-center'>
    
        <div className='w-[50%]'>
         
          <div className='flex'>
            <div className='w-[100%] flex flex-col justify-center items-center '>
               <img src={mainWeatherImg} className='mt-5 w-[18%]' alt='' />
               <p className='mt-5 text-[32px]'>{weatherRef.current.main}</p>
            </div>
        
          </div>
          {/* <p>{weatherData.current.main.pressure}</p> */}
        </div>
          <div className='w-[50%] pl-10 flex flex-col justify-center'>
                <p className='text-center text-[40px]'>{Math.round(tempRef.current.temp)} &#8451;.</p> 
                <p className='text-center  text-[40px]'>{weatherRef.current.description}</p>
                <p className='text-center  text-[40px]'>{Math.round(tempRef.current.temp_min)}&#8451;/{Math.round(tempRef.current.temp_max)}&#8451;</p>
          </div>
        </div>
      </div>

  </div>
  <div className='flex  px-10 py-8'>
    <div className='w-[25%] pr-2 pl-2'>
        <div className='bg-white rounded-[1rem] h-[190px]  px-8 py-5 flex flex-col justify-center items-center '>
            <img src={themometer} className='w-[15%]' alt='' />
            <p>Feel Like's</p>
            <p>{Math.round(tempRef.current.feels_like)}&#8451;</p>
        </div>
    </div>
    <div className='w-[25%] pl-2 pr-2'>
        <div className='bg-white rounded-[1rem] h-[190px]   px-8 py-5 flex flex-col justify-center items-center '>
            <img src={humidity} className='w-[15%]' alt='' />
            <p>humidity</p>
            <p>{tempRef.current.humidity}%</p>
        </div>
    </div>
    <div className='w-[25%] pl-2 pr-2'>
        <div className='bg-white rounded-[1rem]  h-[190px]  px-8 py-5 flex flex-col justify-center items-center '>
            <img src={wind} alt='' />
            <p>Wind</p>
            <p>{windRef.current.speed}kph</p>
        </div>
    </div>
    <div className='w-[25%] pl-2 pr-2'>
        <div className='bg-white rounded-[1rem] h-[190px]  px-8 py-5 flex flex-col justify-center items-center '>
            <img src={pressure}  alt='' />
            <p>Pressure</p>
            <p>{tempRef.current.pressure}hpa</p>
        </div>
    </div>
  </div>


    </div>
  );
}

export default App;
