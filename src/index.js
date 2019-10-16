import "./styles/index.scss";
import * as d3 from "d3";
import { ClientID, ClientSecret } from "../api_keys";
import SpotifyEndPointHelper from "./scripts/spotify_util";
import { albumData, topArtists, topArtistsIds } from "./scripts/handle_data";
import { barChart, list } from "./scripts/graphing";
import { generateDOM } from "./scripts/generateDOM";
document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  generateDOM(app);

  const tracks_amount = SpotifyEndPointHelper(
    "https://api.spotify.com/v1/artists/7ENzCHnmJUr20nUjoZ0zZ1/albums",
    ClientID,
    ClientSecret
  )
    .then(data => albumData(data))
    .then(data => {
      const tracks = data.tracks;
      barChart(tracks);
    });
  const top_playlist = SpotifyEndPointHelper(
    "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF",
    ClientID,
    ClientSecret
  ).then(data => {
    SpotifyEndPointHelper(
      `https://api.spotify.com/v1/artists?ids=${topArtistsIds(data)}`,
      ClientID,
      ClientSecret
    ).then(data => {
      const topArtistsandGenres = topArtists(data);
      const artistNames = [];
      const artistGenres = [];
      for (let i = 0; i < topArtistsandGenres.length; i++) {
        for (let key in topArtistsandGenres[i]) {
          debugger;
          if (key === "name") {
            artistNames.push(topArtistsandGenres[i][key]);
          } else {
            artistGenres.push(topArtistsandGenres[i][key].join(", "));
          }
        }
      }
      console.log(artistNames);
      console.log(artistGenres);
      debugger;
      list(artistNames, artistGenres);
    });
  });

  var data = [
    {
      name: "iit.mumbai.pub1",
      imports: ["iit.chennai.pub3"]
    },
    {
      name: "iit.delhi.pub2",
      imports: ["iit.mumbai.pub1"]
    },
    {
      name: "iit.chennai.pub3",
      imports: ["iit.delhi.pub2"]
    }
  ];
  const chart = data => {
    const root = d3.tree(
      d3
        .hierarchy(data)
        .sort(
          (a, b) =>
            a.height - b.height || a.data.name.localeCompare(b.data.name)
        )
    );

    const map = new Map(root.leaves().map(d => [id(d), d]));

    const context = DOM.context2d(width, width - 40);
    context.canvas.style.display = "block";
    context.canvas.style.maxWidth = "100%";
    context.canvas.style.margin = "auto";
    context.translate(width / 2, width / 2);
    line.context(context);

    for (const leaf of root.leaves()) {
      context.save();
      context.rotate(leaf.x - Math.PI / 2);
      context.translate(leaf.y, 0);
      if (leaf.x >= Math.PI) {
        context.textAlign = "right";
        context.rotate(Math.PI);
        context.translate(-3, 0);
      } else {
        context.textAlign = "left";
        context.translate(3, 0);
      }
      context.fillText(leaf.data.name, 0, 3);
      context.restore();
    }

    context.globalCompositeOperation = "multiply";
    context.strokeStyle = "lightsteelblue";
    for (const leaf of root.leaves()) {
      for (const i of leaf.data.imports) {
        context.beginPath();
        line(leaf.path(map.get(i)));
        context.stroke();
      }
    }

    return context.canvas;
  };

  // const graph = document.createElement("section");
  // app.appendChild(graph);
  // graph.innerHTML = chart(data);

  window.SpotifyEndPointHelper = SpotifyEndPointHelper;
  window.ClientID = ClientID;
  window.data = data;
  window.chart = chart;
  window.ClientSecret = ClientSecret;
  window.d3 = d3;
  window.albumData = albumData;
});
