function SpotifyEndPointHelper(url, ClientID, ClientSecret) {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const access_url = "https://accounts.spotify.com/api/token";

  return fetch(proxyurl + access_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `grant_type=client_credentials&client_id=${ClientID}&client_secret=${ClientSecret}`
  })
    .then(res => res.json())
    .then(data =>
      fetch(proxyurl + url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.access_token}`
        }
      })
    )
    .then(res => res.json());
}

export default SpotifyEndPointHelper;
