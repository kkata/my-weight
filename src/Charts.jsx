import React, { useState, useEffect } from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  /* ReferenceLine,*/ Brush,
} from "recharts";

// Config variables
const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
const SHEET_ID = process.env.REACT_APP_SHEET_ID;
const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY;

const decoded = atob(PRIVATE_KEY);

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

export const Charts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect");

    let cleanedUp = false;

    const getSpreadsheetData = async () => {
      await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: decoded,
      });
      await doc.loadInfo();

      const sheet = doc.sheetsById[SHEET_ID];
      const rows = await sheet.getRows();

      if (!cleanedUp) {
        // unmount後にデータの読み込みが完了した場合はデータを設定しない
        // Objectをコピーする。
        setData((prevState) => {
          return [...prevState, ...rows];
        });
        setLoading(false);
      }
    };
    getSpreadsheetData();
    return () => {
      cleanedUp = true;
    }; //　戻り値の関数がunmount時点で実行される
  }, [setData]);

  if (loading || data === undefined) {
    console.log("Loadingの表示");
    return <div>Loading...</div>;
  } else {
    console.log("グラフの表示");
    return (
      <div>
        <LineChart
          width={1100}
          height={250}
          data={data}
          syncId="anyId"
          margin={{
            top: 30,
            right: 0,
            left: 30,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            type="number"
            domain={["dataMin - 1", "dataMax + 1"]}
            unit="kg"
          />
          <Tooltip />
          <Legend />
          {/* <ReferenceLine y={90} label="Max" stroke="red" /> */}
          <Line
            connectNulls
            type="monotone"
            dataKey="体重"
            unit="kg"
            stroke="#8884d8"
            dot={false}
            activeDot={{ r: 8 }}
          />
          <Brush />
        </LineChart>
        <LineChart
          width={1100}
          height={250}
          data={data}
          syncId="anyId"
          margin={{
            top: 30,
            right: 0,
            left: 30,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            type="number"
            domain={["dataMin - 1", "dataMax + 1"]}
            unit="%"
          />
          <Tooltip />
          <Legend />
          {/* <ReferenceLine y={90} label="Max" stroke="red" /> */}
          <Line
            connectNulls
            type="monotone"
            dataKey="体脂肪率"
            unit="%"
            stroke="#82ca9d"
            dot={false}
            activeDot={{ r: 8 }}
          />
        </LineChart>
        <LineChart
          width={1100}
          height={250}
          data={data}
          syncId="anyId"
          margin={{
            top: 30,
            right: 0,
            left: 30,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            type="number"
            domain={["dataMin - 1", "dataMax + 1"]}
            unit="kg"
          />
          <Tooltip />
          <Legend />
          <Line
            connectNulls
            type="monotone"
            dataKey="筋肉量"
            unit="kg"
            stroke="#34ebeb"
            dot={false}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    );
  }
};

export default Charts;
