import React, { ForwardedRef, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import "chartjs-adapter-moment";
import { MutableRefObject } from "react";
import { ChartTypeRegistry } from "chart.js"; // Import Chart from 'chart.js'
import { Line } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  TimeScale,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  TimeScale
);

// Define the API endpoints
const WORLDWIDE_URL = "https://disease.sh/v3/covid-19/all";
const COUNTRIES_URL = "https://disease.sh/v3/covid-19/countries";
const GRAPH_DATA_URL =
  "https://disease.sh/v3/covid-19/historical/all?lastdays=all";

const ChartsMap: React.FC = () => {
  // Use React Query to fetch data from the API endpoints
  const worldwideData = useQuery("worldwide", fetchWorldwideData);
  const countriesData = useQuery("countries", fetchCountriesData);
  const graphData = useQuery("graphData", fetchGraphData);

  const lineChartRef = useRef<Chart<"line", unknown[], string> | null>(null);

  // Implement the fetch functions
  async function fetchWorldwideData() {
    const response = await fetch(WORLDWIDE_URL);
    return response.json();
  }

  async function fetchCountriesData() {
    const response = await fetch(COUNTRIES_URL);
    console.log(response.url);
    return response.json();
  }

  async function fetchGraphData() {
    const response = await fetch(GRAPH_DATA_URL);
    return response.json();
  }

  useEffect(() => {
    // Cleanup function when the component unmounts
    return () => {
      if (lineChartRef.current) {
        // Access the underlying chart instance and destroy it
        const chartInstance = lineChartRef.current;
        if (chartInstance && chartInstance.destroy) {
          chartInstance.destroy();
        }
      }
    };
  }, []);

  if (
    worldwideData.isLoading ||
    countriesData.isLoading ||
    graphData.isLoading
  ) {
    return <div>Loading...</div>;
  }

  if (worldwideData.isError || countriesData.isError || graphData.isError) {
    return <div>Error fetching data</div>;
  }

  // Data for the line graph (using graphData)
  const lineGraphData = {
    labels: Object.keys(graphData.data.cases),
    datasets: [
      {
        label: "Cases",
        data: Object.values(graphData.data.cases),
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  // Options for the line graph
  const lineGraphOptions: ChartOptions<"line"> = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          parser: "MM/DD/YYYY",
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  interface Country {
    country: string;
    countryInfo: {
      lat: number;
      long: number;
    };
    cases: number;
    recovered: number; // Add recovered property
    deaths: number;
  }

  return (
    <div className="chart">
      <h1
        style={{
          marginLeft: "-10px",
          marginTop: "0px",
          backgroundColor: "#007bff",
          color: "white",
          padding: "10px 0",
          textAlign: "center",
          position: "fixed",
          width: "100%",
          top: "0",
          zIndex: "2", // Corrected "z-index"
        }}
      >
        ChartsMap
      </h1>

      {/* Chart container */}
      <div
        id="uniqueChartContainerId1"
        style={{
          height: "400px",
          width: "1700px",
          marginLeft: "300px",
          marginTop: "60px",
          marginBottom: "30px",
        }}
      >
        <canvas
          id="uniqueChartContainerId"
          height={200}
          width={200}
          style={{
            display: "block",
            boxSizing: "border-box",
            marginLeft: "300px",
            marginRight: "500px",
            height: "10px",
            width: "300px",
          }}
        ></canvas>

        <Line
          data={lineGraphData}
          options={lineGraphOptions}
          ref={lineChartRef}
        />
      </div>

      {/* Map with Markers */}
      <MapContainer
        center={[0, 0]}
        zoom={1}
        style={{
          height: "300px",
          width: "1080px",
          marginLeft: "250px",
            
        }}
        attributionControl={false} // Disable the default attribution control
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {countriesData.data.map((country: Country) => (
          <Marker
            key={country.country}
            position={[country.countryInfo.lat, country.countryInfo.long]}
          >
            {/* ... */}
            <Popup>
              <div className="custom-popup">
                <h3>{country.country}</h3>
                <p>Total Cases: {country.cases}</p>
                <p>Total Recovered: {country.recovered}</p>
                <p>Total Deaths: {country.deaths}</p>
              </div>
            </Popup>
            {/* ... */}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ChartsMap;
