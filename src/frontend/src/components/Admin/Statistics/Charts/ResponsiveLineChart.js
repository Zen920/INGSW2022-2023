// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from "@nivo/line";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = ({
  data /* see data tab */,
  theme,
  lineLabel,
  bottomLabel,
}) => (
  <ResponsiveLine
    curve="monotoneX"
    data={data}
    margin={{ top: 50, right: 30, bottom: 60, left: 60 }}
    xScale={{ type: "time", format: "%Y-%m-%d", precision: "day", useUTC: false }}
    xFormat="time:%Y-%m-%d"
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: false,
      reverse: false,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: bottomLabel,
      legendOffset: 36,
      legendPosition: "middle",
      format: "%d-%m",
      tickValues: 'every 1 days'
    }}
    axisLeft={{
      format: (e) => Math.floor(e) === e && e,
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: lineLabel,
      legendOffset: -40,
      legendPosition: "middle",
    }}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    theme={{
      textColor: theme.palette.mode === "light" ? "#000000" : "#FFFFFF",
      fontSize: 11,
      axis: {
        domain: {
          line: {
            stroke: "#777777",
            strokeWidth: 1,
          },
        },
        legend: {
          text: {
            fontSize: 12,
            fill: theme.palette.mode === "light" ? "#000000" : "#FFFFFF",
          },
        },
        ticks: {
          line: {
            stroke: "#777777",
            strokeWidth: 1,
          },
          text: {
            fontSize: 11,
            fill: theme.palette.mode === "light" ? "#000000" : "#FFFFFF",
          },
        },
      },
      grid: {
        line: {
          stroke: "#dddddd",
          strokeWidth: 1,
        },
      },
      legends: {
        title: {
          text: {
            fontSize: 11,
            fill: theme.palette.mode === "light" ? "#000000" : "#FFFFFF",
          },
        },
        text: {
          fontSize: 11,
          fill: theme.palette.mode === "light" ? "#000000" : "#FFFFFF",
        },
        ticks: {
          line: {},
          text: {
            fontSize: 10,
            fill: theme.palette.mode === "light" ? "#000000" : "#FFFFFF",
          },
        },
      },
      annotations: {
        text: {
          fontSize: 13,
          fill: theme.palette.mode === "light" ? "#000000" : "#FFFFFF",
          outlineWidth: 2,
          outlineColor: "#ffffff",
          outlineOpacity: 1,
        },
        link: {
          stroke: "#000000",
          strokeWidth: 1,
          outlineWidth: 2,
          outlineColor: "#ffffff",
          outlineOpacity: 1,
        },
        outline: {
          stroke: "#000000",
          strokeWidth: 2,
          outlineWidth: 2,
          fill: "red",
          outlineOpacity: 1,
        },
        symbol: {
          outlineWidth: 2,
          fill: theme.palette.mode === "light" ? "#000000" : "#FFFFFF",
          outlineOpacity: 1,
        },
      },
      tooltip: {
        container: {
          background:
            theme.palette.mode === "light"
              ? "#FFFFFF"
              : theme.palette.primary.main,
          color: theme.palette.mode === "light" ? "#000000" : "#FFFFFF",
          fontSize: 12,
        },
        basic: {},
        chip: {},
        table: {},
        tableCell: {},
        tableCellValue: {},
      },
    }}
    legends={[
      {
        anchor: "top",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: -45,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

export default MyResponsiveLine;
