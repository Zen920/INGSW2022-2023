// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { ResponsivePie } from "@nivo/pie";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsivePie = ({ data, username, theme }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 100, bottom: 80, left: 90 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsThickness={2}
    arcLabelsSkipAngle={10}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
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
    legends={[]}
  />
);
export default MyResponsivePie;
