import { ResponsiveBar } from "@nivo/bar";

const fontStyles = {
  fontSize: 12,
  fontFamily: "Quicksand, sans-serif",
  fontWeight: "bold",
};

const responsiveBarTheme = {
  text: fontStyles,
  labels: {
    text: fontStyles,
  },
  axis: {
    legend: {
      text: fontStyles,
    },
    ticks: {
      text: {
        fontFamily: fontStyles.fontFamily,
        fontSize: 10,
      },
    },
  },
};

const ResponsiveBarChart = ({
  selectedCategory,
  selectedSubCategory,
  data
}) => {
  const legendYName = selectedCategory
    ? selectedSubCategory
      ? selectedCategory.label + ", " + selectedSubCategory.label
      : "Value"
    : "Value";

  const tickRotation = data.length > 20 ? -85 : -45;
  const axisBottom = data.length < 30 ? {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: tickRotation,
    legend: legendYName,
    legendPosition: "middle",
    legendOffset: 70,
  } : null;

  return (
    <ResponsiveBar
      data={data}
      keys={["value"]}
      indexBy="day"
      margin={{ top: 10, right: 10, bottom: 100, left: 50 }}
      minValue={0}
      padding={0.1}
      axisTop={null}
      axisRight={null}
      colors={{ scheme: "paired" }}
      theme={responsiveBarTheme}
      borderWidth={0.2}
      borderRadius={5}
      axisBottom={axisBottom}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: legendYName,
        legendPosition: "middle",
        legendOffset: -40,
      }}
    />
  );
};

export default ResponsiveBarChart;
