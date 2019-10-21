import "./styles/index.scss";
import * as d3 from "d3";
import { ClientID, ClientSecret } from "../api_keys";
import SpotifyEndPointHelper from "./scripts/spotify_util";
import {
  albumData,
  topTracks,
  topArtists,
  topArtistsIds,
  topArtistsWithIds
} from "./scripts/handle_data";
import { barChart, barChart2 } from "./scripts/graphing";
import { edgeBundle } from "./scripts/edge_bundle";
import { generateDOM } from "./scripts/generateDOM";
document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  generateDOM(app);
  let artistsWithIds = null;
  const top_playlist = SpotifyEndPointHelper(
    "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF",
    ClientID,
    ClientSecret
  ).then(data => {
    artistsWithIds = topArtistsWithIds(data);
    localStorage.setItem("artistsWithIds", JSON.stringify(artistsWithIds));
    SpotifyEndPointHelper(
      `https://api.spotify.com/v1/artists?ids=${topArtistsIds(data)}`,
      ClientID,
      ClientSecret
    ).then(data => {
      data;
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
        genresObjs.push({ name: genre, type: "genre" });
      });
      const topArtistData = genresObjs.concat(artistObjs);
      const loader = document.getElementById("loader");
      loader.parentNode.removeChild(loader);
      edgeBundle(topArtistData);
    });
  });
});
