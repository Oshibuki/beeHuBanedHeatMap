import React, { useState } from "react";
import PropTypes from "prop-types";

import { DatePicker } from "react-materialize";
import "../App/App.css";

const BanDateForm = ({ change }) => {
  const initalDate = null,
    initalLength = 0;
  const [date, setDate] = useState(initalDate);
  const [length, setLength] = useState(initalLength);

  const handleLengthChange = (e) => {
    setLength(parseInt(e.target.value, 10));
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleSubmit = () => {
    console.log(date, length);
    change({ date, length });
    setLength(initalLength);
  };

  return (
    <>
      <div className="row">
        <div className="col m6 s12">
          <label htmlFor="startDatePicker">起始日期</label>
          <DatePicker
            id="startDatePicker"
            s={12}
            options={{
              autoClose: false,
              container: null,
              defaultDate: date,
              disableDayFn: null,
              disableWeekends: false,
              events: [],
              firstDay: 0,
              format: "mmm dd, yyyy",
              isRTL: false,
              maxDate: null,
              minDate: null,
              onClose: null,
              onSelect: handleDateChange,
              onDraw: null,
              onOpen: null,
              parse: null,
              setDefaultDate: true,
              showClearBtn: false,
              showDaysInNextAndPreviousMonths: false,
              showMonthAfterYear: false,
              yearRange: 1
            }}
            onChange={handleDateChange}
          />
        </div>

        <div className="col m6 s12">
          <label htmlFor="dayLengthSelect" id="dayLengthLable">
            套餐时长
          </label>
          <div className="input-field">
            <select
              id="dayLengthSelect"
              value={length}
              onChange={handleLengthChange}
            >
              <option disabled value="">
                Choose your option
              </option>
              <option value="1">1天小黑屋</option>
              <option value="3">3天禁闭</option>
              <option value="7">7天徒刑</option>
              <option value="15">15天口球</option>
              <option value="999">直接炸号</option>
            </select>
          </div>{" "}
        </div>
      </div>
      <div className="center">
        <button
          id="submit-btn"
          className="submit-btn z-depth-3"
          type="button"
          disabled={length === 0}
          onClick={handleSubmit}
        >
          打入天牢
        </button>
      </div>
    </>
  );
};

BanDateForm.propTypes = {
  change: PropTypes.func.isRequired
};

export default BanDateForm;
