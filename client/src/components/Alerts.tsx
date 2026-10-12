import React, { useState } from 'react';

interface DisasterReport {
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  title: string;
  summary: string;
  suggestions: string[];
}

const Alerts: React.FC = () => {
  const [locationInput, setLocationInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<DisasterReport | null>(null);

const handleFetchDisasterData = async (lat: number, lon: number, locationName: string) => {
    setLoading(true);
    try {
      
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&past_days=3&hourly=temperature_2m,wind_speed_10m,relative_humidity_2m,rain,soil_moisture_0_to_1cm`
      );
      const weatherData = await res.json();

      
      const aiResponse = await fetch('http://localhost:8000/api/analyze-disaster', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locationName, weatherData })
      });

      if (!aiResponse.ok) throw new Error('Failed to fetch AI analysis');

      const aiJson: DisasterReport = await aiResponse.json();
      setReport(aiJson);
      setLoading(false);

    } catch (err) {
      console.error('Error fetching data:', err);
      setLoading(false);
      alert('Error connecting to backend server. Make sure your Express server is running!');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!locationInput) return;
    setLoading(true);

    try {
      
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationInput)}&count=1`);
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        alert('Location not found. Please try a different city name.');
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];
      await handleFetchDisasterData(latitude, longitude, `${name}, ${country}`);
    } catch (error) {
      console.error('Geocoding error:', error);
      setLoading(false);
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        handleFetchDisasterData(latitude, longitude, 'Your Current Location');
      },
      (error) => {
        console.error(error);
        setLoading(false);
        alert('Unable to retrieve your location.');
      }
    );
  };

  return (
    <div className="relative min-h-screen bg-[#020806] text-white font-sans overflow-x-hidden selection:bg-teal-500/30 p-6 md:p-12">
     
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[550px] h-[550px] bg-red-950/15 rounded-full blur-[140px] animate-[pulse_8s_infinite_alternate]" />
        <div className="absolute bottom-[5%] right-[-5%] w-[600px] h-[600px] bg-teal-950/20 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">AI Disaster & Risk Monitor</h1>
          <p className="text-zinc-400 text-sm md:text-base">
            Enter your location or share your coordinates to get real-time hazard analysis and AI safety suggestions.
          </p>
        </header>

        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            placeholder="Enter city, region, or zip code..."
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            className="flex-1 bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-teal-500 transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-teal-600 hover:bg-teal-500 text-white font-medium px-6 py-3 rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Analyzing...' : 'Analyze Risk'}
          </button>
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={loading}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium px-4 py-3 rounded-xl transition-colors border border-zinc-700/50 cursor-pointer text-sm whitespace-nowrap"
          >
            Use GPS
          </button>
        </form>

      
        {report && (
          <div className="bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md rounded-2xl p-6 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{report.title}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${
                report.riskLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                report.riskLevel === 'MODERATE' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                'bg-teal-500/20 text-teal-400 border border-teal-500/30'
              }`}>
                {report.riskLevel} RISK
              </span>
            </div>

            <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6">
              {report.summary}
            </p>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-teal-400 mb-3">
              AI Action Suggestions
            </h3>
            <ul className="space-y-2.5">
              {report.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-3 text-zinc-300 text-sm bg-zinc-900/90 p-3.5 rounded-xl border border-zinc-800/50">
                  <span className="flex-shrink-0 w-5 h-5 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;