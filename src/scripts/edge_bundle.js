import SpotifyEndPointHelper from "./spotify_util";
import { ClientID, ClientSecret } from "../../api_keys";
import { barChart, barChart2 } from "./graphing";
import { albumData, topTracks } from "./handle_data";

export const edgeBundle = data => {
  var diameter = 720,
    radius = diameter / 2,
    innerRadius = radius - 120;

  var cluster = d3
    .cluster()
    .separation(function(a, b) {
      return a.parent == b.parent ? 1 : 5;
    })
    .size([360, innerRadius]);

  var line = d3
    .radialLine()
    .curve(d3.curveBundle.beta(0.85))
    .radius(function(d) {
      return d.y;
    })
    .angle(function(d) {
      return (d.x / 180) * Math.PI;
    });

  var svg = d3
    .select(".artists")
    .append("svg")
    .attr("class", "edge-bundle")
    .attr("width", 860)
    .attr("height", 860)
    .append("g")
    .attr(
      "transform",
      "translate(" + (radius + 70) + "," + (radius + 70) + ")"
    );

  var link = svg.append("g").selectAll(".link"),
    node = svg.append("g").selectAll(".node");

  // d3.json(""flare.json"", function(error, classes) {
  //   if (error) throw error;

  var root = packageHierarchy(data).sum(function(d) {
    return d.size;
  });

  cluster(root);

  link = link
    .data(packageImports(root.leaves()))
    .enter()
    .append("path")
    .each(function(d) {
      (d.source = d[0]), (d.target = d[d.length - 1]);
    })
    .attr("class", "link")
    .attr("d", line);

  node = node
    .data(root.leaves())
    .enter()
    .append("text")
    .attr("class", "node")
    .attr("dy", "0.31em")
    .attr("transform", function(d) {
      return (
        "rotate(" +
        (d.x - 90) +
        ")translate(" +
        (d.y + 18) +
        ",0)" +
        (d.x < 180 ? "" : "rotate(180)")
      );
    })
    .attr("text-anchor", function(d) {
      return d.x < 180 ? "start" : "end";
    })
    .text(function(d) {
      return d.data.key;
    })
    .on("mouseover", mouseovered)
    .on("mouseout", mouseouted)
    .on("click", clicked);

  function clicked(d) {
    if (d.data.type !== "genre") {
      let artistsWithIds = JSON.parse(localStorage.getItem("artistsWithIds"));
      const artistId = artistsWithIds.find(el => {
        if (el.name === d.data.name) {
          console.log(el.id);
          return el.id;
        }
      });
      debugger;
      const tracks_amount = SpotifyEndPointHelper(
        `https://api.spotify.com/v1/artists/${artistId.id}/top-tracks?country=US`,
        ClientID,
        ClientSecret
      )
        .then(data => {
          return topTracks(data);
        })
        .then(data => {
          debugger;
          barChart2(data);
        });
    }
  }
  function mouseovered(d) {
    node.each(function(n) {
      n.target = n.source = false;
    });

    link
      .classed("link--target", function(l) {
        if (l.target === d) return (l.source.source = true);
      })
      .classed("link--source", function(l) {
        if (l.source === d) return (l.target.target = true);
      })
      .filter(function(l) {
        return l.target === d || l.source === d;
      })
      .raise();

    node
      .classed("node--target", function(n) {
        return n.target;
      })
      .classed("node--source", function(n) {
        return n.source;
      });
  }

  function mouseouted(d) {
    link.classed("link--target", false).classed("link--source", false);

    node.classed("node--target", false).classed("node--source", false);
  }

  // Lazily construct the package hierarchy from class names.
  function packageHierarchy(classes) {
    var map = {};

    function find(name, data) {
      var node = map[name],
        i;
      if (!node) {
        node = map[name] = data || { name: name, children: [] };
        if (name.length) {
          node.parent = find(name.substring(0, (i = name.lastIndexOf("."))));
          node.parent.children.push(node);
          node.key = name.substring(i + 1);
        }
      }
      return node;
    }
    debugger;

    classes.forEach(function(d) {
      find(d.name, d);
    });

    return d3.hierarchy(map[""]);
  }

  // Return a list of imports for the given array of nodes.
  function packageImports(nodes) {
    var map = {},
      imports = [];

    // Compute a map from name to node.
    nodes.forEach(function(d) {
      map[d.data.name] = d;
    });

    // For each import, construct a link from the source to target node.
    nodes.forEach(function(d) {
      if (d.data.imports)
        d.data.imports.forEach(function(i) {
          imports.push(map[d.data.name].path(map[i]));
        });
    });

    return imports;
  }
};
