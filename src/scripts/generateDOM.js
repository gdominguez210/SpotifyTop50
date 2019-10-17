export const generateDOM = app => {
  const barCharts = document.createElement("section");
  barCharts.className = "barchart-container";
  const artists = document.createElement("section");
  artists.className = "artists";
  const header = document.createElement("h1");
  header.innerHTML = "Spotify Top 50 Artist Data Visualization";
  const subheader = document.createElement("p");
  subheader.innerHTML =
    "Hover over any element in the chart to see the relationship between artist and genre.";
  app.appendChild(barCharts);
  app.appendChild(artists);
  barCharts.appendChild(header);
  barCharts.appendChild(subheader);
};
