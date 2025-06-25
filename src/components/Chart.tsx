import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const InvoiceChart = ({
  data,
}: {
  data: { name: string; soldQuantity: number; remainingQuantity: number }[];
}) => {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, bottom: 20, left: 10 }}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => `${value} وحدة`}
            labelFormatter={(label) => `الصنف: ${label}`}
          />
          <Legend verticalAlign="top" />
          <Bar dataKey="soldQuantity" fill="#8884d8" name="الكمية المباعة" />
          <Bar
            dataKey="remainingQuantity"
            fill="#82ca9d"
            name="الكمية المتبقية"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InvoiceChart;
