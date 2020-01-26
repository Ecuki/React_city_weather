import React from "react";

const Result = props => {
  const {
    date,
    city,
    sunrise,
    sunset,
    temp,
    pressure,
    wind,
    err
  } = props.weather;
  let content = null;

  if (!err && city) {
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
    const dayTime = new Date((sunset - sunrise) * 1000)
      .toISOString()
      .slice(11, -5);
    content = (
      <>
        <p>
          Wyszukiwanie dla <strong>{city}</strong>
        </p>
        <p>Dane dla dnia i godziny: {date}</p>
        <p>
          Aktualna temperatura: {temp} {/*&#176;*/}°C
        </p>
        <p>Ciśnienie atmosferyczne: {pressure} hPa</p>
        <p>Prędkość wiatru: {wind} m/s</p>
        <p>Wschód słońca: {sunriseTime}</p>
        <p>Zachód słońca: {sunsetTime}</p>
        <p>Długość dnia: {dayTime} h</p>
      </>
    );
  }
  return (
    <div className="result">{err ? `Nie mamy w bazie ${city}` : content}</div>
  );
};
export default Result;
