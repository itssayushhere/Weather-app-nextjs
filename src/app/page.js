"use client";
import WeatherDisplay from "@/components/WeatherDisplay";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import ReactLoading from "react-loading";
import { Dropdown, Space } from "antd";
import { getLocation } from "@/utils/location";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [units, setUnits] = useState("metric");
  const [unittypes, setUnittypes] = useState("°C,km");
  const [error, setError] = useState("");
  const [fetchedunits, setFetchunits] = useState("");

  const handlePopup = () => (
    <div className="p-1 bg-white flex rounded-lg gap-1">
      <button
        onClick={() => {
          setUnits("metric");
          setDropdownVisible(false);
          setUnittypes("°C,km");
        }}
        className={`bg-black text-white font-medium p-1 px-2 rounded-md ${
          units === "metric" && " bg-gray-800"
        }`}
      >
        Metric(°C,km)
      </button>
      <button
        onClick={() => {
          setUnits("uk");
          setDropdownVisible(false);
          setUnittypes("°C,mi");
        }}
        className={`bg-black text-white font-medium p-1 px-2 rounded-md ${
          units === "uk" && " bg-gray-800"
        }`}
      >
        UK(°C,miles)
      </button>
      <button
        onClick={() => {
          setUnits("us");
          setDropdownVisible(false);
          setUnittypes("°F,mi");
        }}
        className={`bg-black text-white font-medium p-1 px-2 rounded-md ${
          units === "us" && " bg-gray-800"
        }`}
      >
        US(°F,miles)
      </button>
    </div>
  );

  const getCurrentLocation = async () => {
    setLoading(true);
    try {
      const locationData = await getLocation();
      const currentLocation = locationData.locationName;
      fetchData(currentLocation);
    } catch (error) {
      setError(`Error: ${error.message}`);
      setLoading(false);
    }
  };

  const fetchData = async (location) => {
    if (!location) return;

    setLoading(true);
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
      location
    )}?unitGroup=${units}&iconSet=icons2&include=current%2Cdays%2Chours%2Calerts&key=${
      process.env.NEXT_PUBLIC_API_KEY
    }&contentType=json`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const result = await response.json();
        setData(result);
        setFetchunits(units === "metric" || units === "uk" ? "°C" : "°F");
      } else {
        setError(`Error: ${response.statusText}`);
      }
    } catch (error) {
      setError(`Fetch error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(location);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center w-full">
        <ReactLoading type="bars" color="white" />
      </div>
    );
  }
  if(error){
    return (
      <div className="flex min-h-screen items-center justify-center w-full gap-2">
        <div className="bg-red-700 text-lg p-2 rounded-lg">{error}</div>
        <button className="bg-red-700 text-lg p-2 rounded-lg mt-3">Reload</button>
      </div>
    )
  }

  return (
    <main className="p-4">
      <div className="w-full">
        <form
          className="p-3 flex items-center justify-between px-5 bg-neutral-950 gap-3 pt-4 border-b border-opacity-30 border-white "
          onSubmit={handleSubmit}
        >
          <div className="flex w-full border pr-4 rounded-full p-2 border-white border-opacity-45">
            <input
              type="text"
              placeholder="Search location...."
              className="p-2 px-5 w-full bg-transparent focus:outline-none"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              aria-label="Location search"
            />
            <button type="submit" className="text-2xl" aria-label="Search">
              <CiSearch />
            </button>
          </div>
          <Dropdown
            trigger={["click"]}
            open={dropdownVisible}
            onOpenChange={(flag) => setDropdownVisible(flag)}
            dropdownRender={handlePopup}
            className="sm:text-md text-sm"
          >
            <button onClick={(e) => e.preventDefault()} aria-label="Settings">
              <Space>{unittypes}</Space>
            </button>
          </Dropdown>
        </form>
        <div className={`flex items-center gap-2 ${data ? "justify-between": " justify-center"} sm:flex-row flex-col mt-3 w-full mx-auto`}>
          <div className="flex items-center gap-2">
            <FaLocationDot className="text-xl text-red-600" />
            <h1 className="flex-1 text-lg text-center text-gray-100 font-medium font-mono ">
              {data ? (
                data.resolvedAddress
              ) : (
                <button
                  className="p-2 bg-neutral-800 rounded-xl"
                  onClick={getCurrentLocation}
                >
                  Select Your Current Location
                </button>
              )}
            </h1>
          </div>
          {data && (
            <div className="flex gap-2 text-xs sm:text-sm text-gray-500">
              <h1>Latitude: {data.latitude}</h1>
              <h1>Longitude: {data.longitude}</h1>
            </div>
          )}
        </div>
      </div>
      {data && (
        <div>
          <WeatherDisplay data={data} unit={fetchedunits} />
        </div>
      )}
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </main>
  );
}
