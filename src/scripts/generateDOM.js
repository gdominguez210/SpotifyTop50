export const generateDOM = app => {
  const barCharts = document.createElement("section");
  barCharts.className = "barchart-container";
  const artists = document.createElement("section");
  artists.className = "artists";
  app.appendChild(barCharts);
  app.appendChild(artists);
};
