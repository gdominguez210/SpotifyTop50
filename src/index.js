import "./styles/index.scss";
import * as d3 from "d3";
import { ClientID, ClientSecret } from "../api_keys";
import SpotifyEndPointHelper from "./scripts/spotify_util";
import { albumData, topArtists, topArtistsIds } from "./scripts/handle_data";
import { barChart, list } from "./scripts/graphing";
import { edgeBundle } from "./scripts/edge_bundle";
import { generateDOM } from "./scripts/generateDOM";
document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  generateDOM(app);

  // const tracks_amount = SpotifyEndPointHelper(
  //   "https://api.spotify.com/v1/artists/7ENzCHnmJUr20nUjoZ0zZ1/albums",
  //   ClientID,
  //   ClientSecret
  // )
  //   .then(data => albumData(data))
  //   .then(data => {
  //     const tracks = data.tracks;
  //     barChart(tracks);
  //   });
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
      const genresObjs = [];
      const artistObjs = [];
      for (let i = 0; i < topArtistsandGenres.length; i++) {
        for (let key in topArtistsandGenres[i]) {
          if (key === "name") {
            artistObjs.push(topArtistsandGenres[i]);
          } else {
            topArtistsandGenres[i][key].forEach(genre => {
              if (artistGenres.indexOf(genre) === -1) {
                artistGenres.push(genre);
              }
            });
          }
        }
      }

      artistGenres.forEach(genre => {
        genresObjs.push({ name: genre });
      });
      // console.log(artistNames);
      // console.log(artistGenres);
      // console.log(genresObjs);
      // console.log(artistObjs);
      // list(artistNames, artistGenres);

      const topArtistData = genresObjs.concat(artistObjs);
      // console.log(topArtistData);
      edgeBundle(topArtistData);
    });
  });
  const dummyData = [
    {
      name: "rap"
      // imports: ["pub2"]
    },
    {
      name: "drake",
      imports: ["rap"]
    },
    {
      name: "kendrick lamar",
      imports: ["rap"]
    },
    {
      name: "wu-tang",
      imports: ["rap"]
    }
  ];
  // const graph = document.createElement("section");
  // app.appendChild(graph);
  // graph.innerHTML = chart(data);

  window.SpotifyEndPointHelper = SpotifyEndPointHelper;
  window.ClientID = ClientID;
  // window.data = data;
  window.ClientSecret = ClientSecret;
  window.d3 = d3;
  window.albumData = albumData;
});
