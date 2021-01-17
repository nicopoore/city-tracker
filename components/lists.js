const bare = {
  categories: {
    "Visited": {
      color: "#ff0000",
      cities: [0, 2]
    },
    "To visit": {
      color: "#0000ff",
      cities: [1]
    },
    "Favourites": {
      color: "#ffff00",
      cities: []
    }
  },
  cities: [
    {
      uniqueID: 0, // ExampleID, would be provided by database
      name: "Buenos Aires",
      country: "Argentina",
      continent: "America",
      coordinates: [-34.6037, -58.3816]
    },
    {
      uniqueID: 1, // ExampleID, would be provided by database
      name: "Sao Paulo",
      country: "Brazil",
      continent: "America",
      coordinates: [-34.6037, -58.3816]
    },
    {
      uniqueID: 2, // ExampleID, would be provided by database
      name: "New York",
      country: "United States of America",
      continent: "America",
      coordinates: [34.6037, -58.3816]
    }
  ]
}

const nested = {
  categories: {
    "Visited": {
      color: "#ff0000",
      continents: {
        Africa: {},
        America: {
          "Argentina": {
            "Buenos Aires": [-34.6037, -58.3816]
          },
          "United States of America": {
            "New York": [34.6037, -58.3816]
          }
        },
        Asia: {},
        Europe: {},
        Oceania: {}
      }
    },
    "To visit": {
      color: "#0000ff",
      continents: {
        Africa: {},
        America: {
          "Brazil": {
            "Sao Paulo": [-34.6037, -58.3816]
          }
        },
        Asia: {},
        Europe: {},
        Oceania: {}
      }
    },
    "Favourites": {
      color: "#ffff00",
      continents: {
        Africa: {},
        America: {},
        Asia: {},
        Europe: {},
        Oceania: {}
      }
    }
  }
}

