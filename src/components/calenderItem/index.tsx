import React, { useEffect, useState } from "react";
import { Calendar } from "antd";
import styled from "styled-components";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

interface DateItem {
  id: number;
  date: string;
}

const DATE: DateItem[] = [{ id: 0, date: dayjs().format("YYYY-MM-DD") }];

const App = () => {
  const [value, setValue] = useState<Dayjs>(dayjs(DATE[0].date));
  const [diaryInfo, setDiaryInfo] = useState<string[]>([]);

  const isInDateArray = (date: Dayjs) => {
    return DATE.some((d) => dayjs(d.date).isSame(date, "day"));
  };

  const yearAndMonth = dayjs(DATE[0].date).format("YYYY-MM");

  console.log(yearAndMonth);
  useEffect(() => {
    const userInfo = {
      date: yearAndMonth,
      userId: localStorage.getItem("userId"),
    };
    axios
      .post(
        "https://port-0-piction-backend-euegqv2blnrdvf3e.sel5.cloudtype.app/api/diary/calendar",
        userInfo
      )
      .then((res) => {
        console.log("성공");
        setDiaryInfo(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  const fullCellRender = (value: Dayjs) => {
    if (diaryInfo.includes(value.format("YYYY-MM-DD"))) {
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

  const navigate = useNavigate();

  return (
    <Container>
      <Calendar
        value={value}
        onPanelChange={(newValue) => setValue(newValue)}
        fullCellRender={fullCellRender}
        headerRender={({ value }) => (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "2rem",
            }}
          >
            <h1>{`${value.year()}년 ${
              value.month() + 1
            }월 ${value.date()}일`}</h1>
          </div>
        )}
        onSelect={(newValue) => {
          setValue(newValue);
          const formattedDate = newValue.format("YYYY-MM-DD");
          navigate(`/record/diary/${formattedDate}`);
        }}
      />
    </Container>
  );
};

export default App;

const Container = styled.div`
  width: 80%;
  height: 50vh;
  margin: auto;
  padding-top: 8rem;
  .ant-picker-cell-selected .ant-picker-cell-inner {
    background-color: green !important;
  }
`;
