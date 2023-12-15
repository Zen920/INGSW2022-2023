// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from "@nivo/bar";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveBar = ({
  data /* see data tab */,
  username,
  theme,
  legendLabel,
  bottomLabel,
}) => (
  
  <ResponsiveBar
    data={data}
    keys={["dishesprepared"]}
    indexBy="day"
    margin={{ top: 50, right: 30, bottom: 60, left: 60 }}
    padding={0.3}
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={{ scheme: "category10" }}
    theme={{
      textColor: "#333333",
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
            fontSize: 8,
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
          fill: "#333333",
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
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "#38bcb2",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "#eed312",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    borderColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 1,
      tickPadding: 1,
      tickRotation: 90,
      legend: bottomLabel,
      legendPosition: "middle",
      legendOffset: 50,
    }}
    axisLeft={{
      format: (e) => Math.floor(e) === e && e,
      tickSize: 3,
      tickPadding: 5,
      tickRotation: 0,
      legend: legendLabel,
      legendPosition: "middle",
      legendOffset: -40,
    }}
    
    labelSkipWidth={12}
    labelSkipHeight={12}
    /*legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}*/
    role="application"
    ariaLabel={"Dishes prepared by employee " + username}
    barAriaLabel={function (e) {
      return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
    }}
  />
);
export default MyResponsiveBar;
