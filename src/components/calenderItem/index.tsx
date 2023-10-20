import React, { useEffect, useState } from "react";
import { Calendar } from "antd";
import styled from "styled-components";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { error } from "console";

interface DateItem {
  id: number;
  date: string;
}

interface DiaryItem {
  subject: string;
  contents: string;
  date: string;
  emotions: string;
  imageURL: string;
  userId: string;
}

const DATE: DateItem[] = [{ id: 0, date: dayjs().format("YYYY-MM-DD") }];

const App = () => {
  const [value, setValue] = useState<Dayjs>(dayjs(DATE[0].date));
  const [diaryInfo, setDiaryInfo] = useState<DiaryItem[]>([]);

  const isInDateArray = (date: Dayjs) => {
    return DATE.some((d) => dayjs(d.date).isSame(date, "day"));
  };

  useEffect(() => {
    const yearAndMonth = value.format("YYYY-MM");

    console.log("yearAndMonth", yearAndMonth);
    const userId = localStorage.getItem("userId");

    axios
      .get(
        `https://port-0-piction-backend-euegqv2blnrdvf3e.sel5.cloudtype.app/api/diary/calendar?date=${yearAndMonth}&userId=${userId}`
      )
      .then((res) => {
        console.log("성공");
        setDiaryInfo(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [value]);

  const fullCellRender = (value: Dayjs) => {
    const dates = diaryInfo.map((item) =>
      dayjs(item.date).format("YYYY-MM-DD")
    );

    if (dates.includes(value.format("YYYY-MM-DD"))) {
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
          const formattedDate = newValue.format("YYYY-MM-DD");
          const dates = diaryInfo.map((item) =>
            dayjs(item.date).format("YYYY-MM-DD")
          );

          if (dates.includes(formattedDate)) {
            setValue(newValue);
            navigate(`/record/diary/${formattedDate}`);
          } else {
            console.log(`${formattedDate}는 diaryInfo에 없습니다.`);
          }
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
`;
