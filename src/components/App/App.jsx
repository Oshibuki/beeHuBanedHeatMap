import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "materialize-css/dist/css/materialize.min.css";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import M from "materialize-css";
import "./App.css";
import BanDateForm from "../BanDateForm/BanDateForm";
import Info from "../Info/Info";
import { getData, storeData } from "../../helpers/localStorage";
import { getDateString } from "../../helpers/date";

const App = () => {
  const initialState = () => getData("data") || [];
  const [state, setState] = useState(initialState);
  const [data, setData] = useState([]);
  const tmp1 = new Date(),
    tmp2 = new Date();
  tmp1.setMonth(tmp1.getMonth() + 1);
  tmp1.setDate(0);
  const rangeEnd = getDateString(tmp1);
  tmp2.setMonth(tmp1.getMonth() - 11);
  tmp2.setDate(1);
  const rangeStart = getDateString(tmp2);

  useEffect(() => {
    M.AutoInit();
    setState(getData("data"));
    setData(generateDataFromState(state));
  }, []);

  useEffect(() => {
    storeData("data", state);
  }, [state]);

  const generateDataFromState = (state) => {
    const result = [];
    state.forEach((log) => {
      const startDate = new Date(log.startDate);
      for (let i = 0; i < log.length; i++) {
        result.push({
          date: getDateString(startDate),
          count: 1
        });
        startDate.setDate(startDate.getDate() + 1);
      }
    });
    return result;
  };

  const handleChange = (val) => {
    console.log(val.date);
    const startDate = new Date(val.date);
    let newVal = [
      ...state,
      { id: uuidv4(), startDate: getDateString(startDate), length: val.length }
    ];
    setState(newVal);

    const result = [];
    for (let i = 0; i < val.length; i++) {
      result.push({
        date: getDateString(startDate),
        count: 1
      });
      startDate.setDate(startDate.getDate() + 1);
    }
    setData([...data, ...result]);
  };

  const handleDelete = (id) => {
    let newState = state.filter((i) => {
      return i.id !== id;
    });
    setState(newState);
  };

  return (
    <div className="container">
      <div className="row center">
        <h1 className="white-text">逼乎口球大赛冠军</h1>
      </div>
      <div className="row">
        <div className="col m12 s12">
          <CalendarHeatmap
            startDate={rangeStart}
            endDate={rangeEnd}
            values={data}
          />
          <BanDateForm change={handleChange} />
          <div>
            <div className="row center">
              <h4 className="white-text">口球日志</h4>
            </div>
            <div className="data-container row">
              {state.length > 0 ? (
                <>
                  {state.map((info) => (
                    <Info
                      key={info.id}
                      id={info.id}
                      startDate={info.startDate}
                      length={Number(info.length)}
                      deleteCard={handleDelete}
                    />
                  ))}
                </>
              ) : (
                <div className="center white-text">No log found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
