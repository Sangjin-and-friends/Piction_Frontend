import React, { useState } from "react";
import { Calendar } from "antd";
import styled from "styled-components";
import dayjs, { Dayjs } from "dayjs";

interface DateItem {
  id: number;
  date: string;
}

const DATE: DateItem[] = [
  { id: 0, date: "2017-01-25" },
  { id: 1, date: "2017-01-26" },
  { id: 2, date: "2017-01-27" },
];

const App = () => {
  const [value, setValue] = useState<Dayjs>(dayjs(DATE[0].date));

  const isInDateArray = (date: Dayjs) => {
    return DATE.some((d) => dayjs(d.date).isSame(date, "day"));
  };

  const fullCellRender = (value: Dayjs) => {
    if (isInDateArray(value)) {
      return (
        <div
          className="ant-picker-cell-inner"
          style={{
            backgroundColor: "green",
            width: "90px",
            height: "90px",
            padding: "10px",
            color: "white",
          }}
        >
          {value.date()}
        </div>
      );
    } else {
      return (
        <div
          className="ant-picker-cell-inner"
          style={{ width: "90px", height: "90px", padding: "10px" }}
        >
          {value.date()}
        </div>
      );
    }
  };

  return (
    <Container>
      <Calendar
        value={value}
        onPanelChange={(newValue) => setValue(newValue)}
        fullCellRender={fullCellRender}
        onSelect={(newValue) => setValue(newValue)}
      />
    </Container>
  );
};

export default App;

const Container = styled.div`
  width: 80%;
  height: 50vh;
  margin: 0 auto;
  padding-top: 8rem;
  .ant-picker-cell-selected .ant-picker-cell-inner {
    background-color: #0052ff !important;
  }
`;
