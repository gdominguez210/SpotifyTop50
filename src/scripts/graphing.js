import * as d3 from "d3";
import Chart from "chart.js";
export const barChart = data => {
  debugger;
  const w = 630;
  const y = 350;
  const dataLength = data.length;
  const maxValue = d3.max(data, d => +d);
  const yAxisLength = 350;
  const xAxisLength = 600;
  const yScale = d3
    .scaleLinear()
    .domain([0, maxValue])
    .range([0, yAxisLength]);
  const svg = d3
    .select(".chart")
    .html("")
    .append("svg")
    .attr("width", w)
    .attr("height", y);
  debugger;
  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * (xAxisLength / dataLength) + 30)
    .attr("y", d => y - yScale(d) - 20)
    .attr("width", xAxisLength / dataLength - 3)
    .attr("height", d => yScale(d))
    .attr("fill", d => {
      if (d >= 8) {
        return `hsl(157, 55%, 52%)`;
      } else if (d < 8 && d >= 5) {
        return `hsl(157, 55%, 62%)`;
      } else if (d < 5 && d >= 3) {
        return `hsl(157, 55%, 72%)`;
      } else if (d < 3) {
        return `hsl(157, 55%, 82%)`;
      }
    });
  svg
    .append("line")
    .attr("x1", 20)
    .attr("y1", 0)
    .attr("x2", 20)
    .attr("y2", yAxisLength - 18)
    .attr("stroke-width", 4)
    .attr("stroke", "#333333");
  svg
    .append("line")
    .attr("x1", 20)
    .attr("y1", yAxisLength - 20)
    .attr("x2", xAxisLength + 30)
    .attr("y2", yAxisLength - 20)
    .attr("stroke-width", 4)
    .attr("stroke", "#333333");

  svg
    .append("text")
    .attr("class", "vertical_label")
    .attr("text-anchor", "end")
    .text("Number of Tracks")
    .attr("transform", "translate(15,15) rotate(-90)");

  svg
    .append("text")
    .attr("class", "horizontal_label")
    .attr("text-anchor", "middle")
    .text("Albums");
};
export const barChart2 = (data, chart) => {
  const ctx = document.getElementById("chart");
  data = data.sort((a, b) => (a.popularity < b.popularity ? 1 : -1));
  debugger;
  let labels = [];
  let values = [];
  data.forEach(el => {
    let name = el.name;
    let sliceable = name.indexOf("(");
    if (sliceable !== -1) {
      name = name.slice(0, sliceable);
    }
    labels.push(name);
    values.push(el.popularity);
  });
  debugger;

  values = values.slice(0, 6);
  labels = labels.slice(0, 5);
  debugger;
  if (chart) {
    debugger;
    chart.data.labels = labels;
    chart.datasets.data = values;
  } else {
    debugger;
    chart = new Chart(ctx, {
      type: "horizontalBar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Popularity",
            data: values,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                suggestedMax: 100
              },
              afterFit: function(scaleInstance) {
                scaleInstance.width = 250; // sets the width to 100px
              }
            }
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Popularity"
              },
              ticks: {
                beginAtZero: true,
                suggestedMax: 100
              }
            }
          ]
        },
        title: {
          display: true,
          text: `Top Tracks for ${data[0].artist}`,
          fontSize: "24",
          fontFamily: "Lato",
          fontColor: "rgba(244, 244, 243, 0.75)"
        },
        legend: {
          display: false
        }
      }
    });
  }

  return chart;
};
