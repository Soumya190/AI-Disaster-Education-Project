import React, {useEffect } from 'react';

const Alerts: React.FC = () => {

  useEffect(()=>{
    const fetchData = async()=>{
      const testLat = 22.5726; 
      const testLon = 88.3639;
      
      try{
        const data = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${testLat}&longitude=${testLon}&past_days=7&hourly=temperature_2m,wind_speed_10m,relative_humidity_2m,rain,soil_moisture_0_to_1cm,soil_moisture_1_to_3cm,soil_moisture_3_to_9cm,evapotranspiration`);
        const jsonData =await data.json();
        console.log(jsonData);
      }
      catch(err:any){
        if(err.response){
          console.log(err.response.data);
        }
        else{
          console.error("Error fetching weather data:",err);
        }
      }
    }

    fetchData();
  },[]);

  return (
    <div className="relative min-h-screen bg-[#020806] text-white font-sans overflow-x-hidden selection:bg-teal-500/30">
      
    
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[550px] h-[550px] bg-red-950/15 rounded-full blur-[140px] animate-[pulse_8s_infinite_alternate]" />
        <div className="absolute bottom-[5%] right-[-5%] w-[600px] h-[600px] bg-teal-950/20 rounded-full blur-[130px]" />
      </div>

      
    </div>
  );
};

export default Alerts;