import { AreaChart, Area, ResponsiveContainer, Tooltip, YAxis } from "recharts";

const CrashChart = ({ data, height = 400 }) => {
  //console.log(data);
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart
        width={500}
        height={height}
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <YAxis
          unit="x"
          axisLine={{ stroke: "white", strokeWidth: 3 }}
          tick={{ fill: "white" }}
          tickLine={{ stroke: "white", strokeWidth: 3 }}
        />
        {/*<XAxis />*/}
        <Area
          type="monotone"
          dataKey="multiplier"
          stroke="#ffffff"
          strokeWidth="6"
          fill="#7ba4b0"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CrashChart;
