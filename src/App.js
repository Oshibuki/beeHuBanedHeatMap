import React, { useState, useEffect } from "react";
import "materialize-css/dist/css/materialize.min.css";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { getData, storeData } from "./helpers/localstorage";

import "./styles.css";

export default function App() {
  const initialState = getData("data") || [];
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  useEffect(() => {
    storeData("data", state);
    const date = state.map((obj) => obj.date);
    const bmi = state.map((obj) => obj.bmi);
    let newData = { date, bmi };
    setData(newData);
  }, [state]);

  return (
    <div className="container">
      <div className="row">
        <h1 className="center-align">知乎口球日历图</h1>
      </div>
      <CalendarHeatmap
        startDate={new Date("2020-01-01")}
        endDate={new Date("2020-12-23")}
        values={[
          { date: "2020-01-01", count: 1 },
          { date: "2016-01-22", count: 1 },
          { date: "2020-01-30", count: 1 }
          // ...and so on
        ]}
      />
      <h4 className="center-align">让禁言来的更猛烈些吧！</h4>
    </div>
  );
}
