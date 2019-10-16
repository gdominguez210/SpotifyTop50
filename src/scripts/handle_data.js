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

export const topArtistsIds = data => {
  const artist_ids = data.tracks.items.map(item => item.track.artists[0].id);
  return artist_ids.join(",");
};

export const topArtists = data =>
  data.artists.map(artist => {
    return {
      name: artist.name,
      genres: artist.genres
    };
  });
