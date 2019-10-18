export const generateDOM = app => {
  const barCharts = document.createElement("section");
  barCharts.className = "barchart-container";
  const artists = document.createElement("section");
  artists.className = "artists";
  const content = document.createElement("div");
  content.className = "content";
  const header = document.createElement("h1");
  header.innerHTML = "Spotify Top 50 Artist Data Visualization";
  const subheader = document.createElement("p");
  subheader.innerHTML =
    "Hover over any element in the chart to see the relationship between artist and genre. <br/> Click on any artist to see a breakdown of their top tracks.";
  app.appendChild(barCharts);
  app.appendChild(artists);
  const loader = document.createElement("div");
  loader.setAttribute("id", "loader");
  artists.appendChild(loader);
  content.appendChild(header);
  content.appendChild(subheader);
  const chart = document.createElement("div");
  chart.className = "chart";
  barCharts.appendChild(content);
  barCharts.appendChild(chart);
  const canvas = document.createElement("canvas");
  canvas.setAttribute("id", "chart");
  chart.appendChild(canvas);
};
