import "./styles/index.scss";


document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
    var client_id = 'af5831aacdcc420b9dfc1d647e256975'; // Your client id
    var client_secret = 'fae74cd4122b4ba6bb26bf96479a2c14'; // Your secret

    const api_token = new XMLHttpRequest();
    api_token.send("grant_type=client_credentials")
    api_token.setRequestHeader(Authorization, btoa(client_id:client_secret))
    api_token.open('POST', 'https://accounts.spotify.com/api/token, true)



    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
        if (request.status === 200 && request.readyState === XMLHttpRequest.DONE) {
            const resp = JSON.parse(request.response);          
        }
    };
    response.setRequestHeader(Authorization, fae74cd4122b4ba6bb26bf96479a2c14)
    request.open('GET', `fae74cd4122b4ba6bb26bf96479a2c14z`, true);
    request.send();
})

});


function get_access_token() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://accounts.spotify.com/api/token";
    const request = fetch(proxyurl + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body:
            "grant_type=client_credentials&client_id=af5831aacdcc420b9dfc1d647e256975&client_secret=fae74cd4122b4ba6bb26bf96479a2c14"
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .then(data =>
            fetch(
                proxyurl +
                "https://api.spotify.com/v1/artists/7ENzCHnmJUr20nUjoZ0zZ1/albums",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${data.access_token}`
                    }
                }
            )
        )
        .then(res => res.json())
        .then(data => {
            console.log(data);
            data.items.forEach((item, idx) => {
                albums[idx] = {};
                albums[idx]["name"] = item.name;
                albums[idx]["img_url"] = item.images[0];
                albums[idx]["total_tracks"] = item.total_tracks;
                tracks.push(item.total_tracks);
            });
            console.log(albums);
            console.log(tracks);
        });
}