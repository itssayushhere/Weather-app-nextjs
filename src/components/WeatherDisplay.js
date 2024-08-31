import React, { useMemo } from "react";
import icons from "./Icons";
import { formatDate } from "@/utils/formatdate";

const WeatherDisplay = ({ data }) => {
  const { currentConditions, days } = data;
  const currentHours = days[0];
  const next10days = days.slice(1, 11);

  const datetimeEpoch = currentConditions?.datetimeEpoch;
  const date = datetimeEpoch
    ? new Date(datetimeEpoch * 1000).toLocaleString().split(",")
    : ["", ""];

  const IconComponent = useMemo(() => icons[currentConditions?.icon], [currentConditions?.icon]);

  const MultiIcon = ({ name, ...props }) => {
    const Icon = icons[name];
    return Icon ? <Icon {...props} /> : null;
  };

  return (
    <div>
      <div className="bg-white/20 rounded-xl mt-2 p-2">
        <div className="bg-black/20 font-bold rounded-xl text-center text-white/30 font-mono mb-2">
          {formatDate(date[0])} (Today) at {date[1]}
        </div>
        <div className="flex sm:flex-row flex-col gap-2">
          <div className="flex flex-col items-center border shadow-xs shadow-white md:w-[800px] sm:w-fit w-full p-4 px-14 text-center justify-center rounded-xl border-white border-opacity-30 bg-black">
            <div className="items-center flex flex-col justify-center">
              <div className="bg-white p-2 rounded-full">
                {IconComponent ? (
                  <IconComponent className="w-20 h-20" alt="Weather Icon" />
                ) : (
                  <p>Loading icon...</p>
                )}
              </div>
              <div className="flex text-9xl gap-0 text-white/85">
                <h1>{currentConditions.temp.toFixed()}</h1>
                <h1 className="text-xl">°C</h1>
              </div>
            </div>
            <div className="items-center flex flex-col justify-center">
              <div className="flex text-sm text-wrap opacity-55">
                <h1>Feels like: {currentConditions.feelslike.toFixed()}</h1>
                <h1 className="text-xs">°C</h1>
              </div>
              <h1 className="text-white/85">{currentConditions.conditions}</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 border shadow-xs shadow-white w-full p-4 rounded-xl border-white border-opacity-30 bg-black text-white/85">
            <div className="flex flex-col items-center text-center">
              <h1>💧{currentConditions.precip} mm/h</h1>
              <h1>Precipitation</h1>
            </div>
            <div className="flex flex-col items-center text-center">
              <h1>🍃{currentConditions.windspeed} mph</h1>
              <h1>Wind</h1>
            </div>
            <div className="flex flex-col items-center text-center">
              <h1>🌡️💧{currentConditions.humidity}%</h1>
              <h1>Humidity</h1>
            </div>
            <div className="flex flex-col items-center text-center">
              <h1>👓{currentConditions.uvindex}</h1>
              <h1>UV Index</h1>
            </div>
            <div className="flex flex-col items-center text-center">
              <h1>☁️{currentConditions.cloudcover}%</h1>
              <h1>Cloud Cover</h1>
            </div>
            <div className="flex flex-col items-center text-center">
              <h1>👁️{currentConditions.visibility}</h1>
              <h1>Visibility</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <h1 className="bg-black text-center w-fit px-10 m-2 text-lg">Hourly Forecast</h1>
          <div className="p-3 flex flex-row overflow-x-scroll gap-3 hidden-scrollbar rounded-lg">
            {currentHours?.hours.map((items, index) => (
              <div
                key={index}
                className="border text-center border-white/40 rounded-xl p-3 flex flex-col items-center bg-black justify-center gap-1"
              >
                <div>{items.datetime === currentConditions.datetime ? "Now" : items.datetime}</div>
                <div className="bg-white p-2 rounded-full">
                  <MultiIcon name={items.icon} className="w-20 h-20" alt="Weather Icon" />
                </div>
                <h1 className="flex">
                  {items.temp}
                  <span className="text-xs">°C</span>
                </h1>
                <h1 className="whitespace-nowrap">{items.precip} mm/h </h1>
                <h1>{items.windspeed}🍃</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-2 bg-white/20 mt-3 rounded-xl">
        <div className="bg-black/20 font-bold rounded-xl text-center text-white/30 font-mono mb-2">
          Next 10 days forecast
        </div>
        <div className="p-3 flex flex-row overflow-x-scroll gap-3 hidden-scrollbar rounded-lg">
          {next10days.map((items, index) => (
            <div
              key={index}
              className="border text-center border-white/40 rounded-xl p-3 flex flex-col items-center bg-black justify-center gap-1"
            >
              <div className="whitespace-nowrap py-2">{formatDate(items.datetime)}</div>
              <div className="bg-white p-2 rounded-full">
                <MultiIcon name={items.icon} className="w-20 h-20" alt="Weather Icon" />
              </div>
              <h1 className="flex">
                {items.temp}
                <span className="text-xs">°C</span>
              </h1>
              <h1 className="whitespace-nowrap">{items.precip} mm/h </h1>
              <h1>{items.windspeed}🍃</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
