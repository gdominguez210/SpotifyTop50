import * as d3 from "d3";
export const barChart = data => {
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
    .select("section")
    .append("svg")
    .attr("width", w)
    .attr("height", y);

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
        return `hsl(202, 100%, 22%)`;
      } else if (d < 8 && d >= 5) {
        return `hsl(202, 100%, 44%)`;
      } else if (d < 5 && d >= 3) {
        return `hsl(202, 100%, 66%)`;
      } else if (d < 3) {
        return `hsl(202, 100%, 78%)`;
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

export const list = (artistNames, artistGenres) => {
  const artists = d3.select(".artists").append("ul");
  const genres = d3.select(".artists").append("ul");

  const artistList = artists
    .selectAll("li")
    .data(artistNames)
    .enter()
    .append("li")
    .text((d, i) => `${i + 1} ${d}`);

  const genreList = genres
    .selectAll("li")
    .data(artistGenres)
    .enter()
    .append("li")
    .text(
      (d, i) =>
        `${d
          .split(" ")
          .map(el => {
            if (el !== "") {
              return el[0].toUpperCase() + el.slice(1);
            } else {
              return "";
            }
          })
          .join(" ")}`
    );
};
