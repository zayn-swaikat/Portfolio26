import {
 LineChart,
 Line,
 XAxis,
 YAxis,
 Tooltip,
 ResponsiveContainer,
 CartesianGrid
} from "recharts";


export default function VisitorChart({data}) {


return (

<div style={{
 height:350
}}>


<ResponsiveContainer>

<LineChart data={data}>


<CartesianGrid
strokeDasharray="3 3"
/>


<XAxis
dataKey="date"
/>


<YAxis />


<Tooltip />


<Line

type="monotone"

dataKey="visits"

strokeWidth={3}

/>


</LineChart>


</ResponsiveContainer>


</div>

);

}