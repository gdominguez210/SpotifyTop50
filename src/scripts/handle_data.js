export const albumData = data => {
  const albums = {};
  const tracks = [];
  data.items.forEach((item, idx) => {
    albums[idx] = {};
    albums[idx]["name"] = item.name;
    albums[idx]["img_url"] = item.images[0];
    albums[idx]["total_tracks"] = item.total_tracks;
    tracks.push(item.total_tracks);
  });
  console.log(albums);
  console.log(tracks);
  return { albums, tracks };
};

export const topTracks = data => {
  const tracks = [];
  const trackList = Object.values(data.tracks);
   ;

  trackList.forEach((item, idx) => {
    tracks.push({
      name: item.name,
      popularity: item.popularity,
      artist: item.artists[0].name
    });
  });
  console.log(tracks);
  return tracks;
};

export const topArtistsWithIds = data => {
  const output = {};
  data.tracks.items.forEach((item, idx) => {
    output[idx] = {
      id: item.track.artists[0].id,
      name: item.track.artists[0].name
    };
  });
  return Object.values(output);
};

export const topArtistsIds = data => {
  const artist_ids = data.tracks.items.map(item => item.track.artists[0].id);
  return artist_ids.join(",");
};

export const topArtists = data =>
  data.artists.map(artist => {
    return {
      name: artist.name,
      imports: artist.genres
    };
  });
