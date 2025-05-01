"use client";

import { TrendingUp } from "lucide-react";
import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    PolarAngleAxis,
    RadialBar,
    RadialBarChart,
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

// Score between 0-100
const atsScore = 77;

// const chartData = [
//     { name: "score", value: atsScore, fill: "var(--color-score)" },
// ];

// const chartConfig = {
//     value: {
//         label: "ATS Score",
//     },
//     score: {
//         label: "Score",
//         color: "hsl(270, 100%, 60%)",
//     },
// };

export default function Component() {
    const { theme } = useContext(ThemeContext);

    const chartData = [
        { name: "score", value: atsScore, fill: "var(--color-score)" },
    ];

    const chartConfig = {
        value: {
            label: "ATS Score",
        },
        score: {
            label: "Score",
            color: (theme === 'light') ? "hsl(270, 100%, 60%)" : "rgba(0,191,255,0.8)",
        },
    };

    return (
        <Card className={(theme === 'light') ? "flex flex-col" : "flex flex-col border-white border-2"}>
            <CardHeader className="items-center pb-0">
                <CardTitle>ATS Score</CardTitle>
                <CardDescription>Gemini 2.0 Flash!</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadialBarChart
                        data={chartData}
                        startAngle={90}
                        endAngle={-270}
                        innerRadius={80}
                        outerRadius={110}
                        barSize={15}
                        cx="50%"
                        cy="50%"
                    >
                        <PolarGrid
                            gridType="circle"
                            radialLines={false}
                            stroke="none"
                            className="first:fill-muted last:fill-background"
                            polarRadius={[86, 74]}
                        />
                        <PolarAngleAxis
                            type="number"
                            domain={[0, 100]}
                            angleAxisId={0}
                            tick={false}
                        />
                        <RadialBar
                            dataKey="value"
                            background={{ fill: "hsl(var(--muted))" }}
                            cornerRadius={10}
                            fill="hsl(270, 100%, 60%)"
                        />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-4xl font-bold"
                                                >
                                                    {atsScore}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    ATS Score
                                                </tspan>
                                            </text>
                                        );
                                    }
                                    return null;
                                }}
                            />
                        </PolarRadiusAxis>
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Strive for a high ATS Score<TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Score range: 0-100
                </div>
            </CardFooter>
        </Card>
    );
}
