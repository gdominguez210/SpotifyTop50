# Spotify Top 50 Artist Data Visualization

## Background and Overview

The goal of this project is to create a visual representation of the current top 50 artists on Spotify, and show a graphical relationship between top artists, and their respective genre of music and a statistical breakdown of the top tracks of a given top artist.

## MVPs

Users will be able to hover over any artist/genre and see a web of connections showing the relationship between artist/genre. Users will be able to click on any given artist to see the top 5 tracks of a given artist, and how popularity those tracks are on a scale from 1-100.

The data visualization will contain the following:

- Bar graph showcasing the top 5 tracks of a given artist.
- Hierarchical Edge Bundle Graph linking each top artist to their respective genre(s).

![](https://i.imgur.com/K0WU8zV.png)

## Architecture and Technologies

### Spotify API

- Used to obtain track/artist information

### D3

- Used to graph data obtained by Spotify

## Implementation Timeline

### Day 1

- Read documentation on D3
- Read documentation on Spotify API
- Test ajax requests to Spotify API endpoints

### Day 2

- Set up frontend wireframe layout for graphs
- Write util functions to grab relevant information from Spotify
- Start working with D3 graphs

### Day 3

- Continue working with D3 graphs
- Get D3 graphs to interpret Spotify data through util functions
