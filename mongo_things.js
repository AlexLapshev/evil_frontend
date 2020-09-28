db.user_likes.insertOne(
  {
    _id: 1,
    artists: [
      {
        artist_id: NumberInt(4),
        artist_name: "Every Time I Die",
        releases: [NumberInt(4)],
        artist_cover: "etid.jpg",
      },
      {
        artist_id: NumberInt(1),
        artist_name: "Шлем",
        releases: [NumberInt(1), NumberInt(5)],
        artist_cover: "shlem.jpg"
      }
    ],
    releases: [
      {
        release_id: NumberInt(2),
        artist_id: NumberInt(2),
        release_name: "Крысы",
        release_cover: "karzer.jpg",
        release_year: new Date('2017-03-12'),
        tracks: [NumberInt(7), NumberInt(8)]
      }
    ],
    tracks: [
      {
        track_id: NumberInt(4),
        track_name: "Хекс",
        artist_id: NumberInt(1),
        release_id: NumberInt(1),
      },
      {
        track_id: NumberInt(20),
        track_name: "Just as Real but Not as Brightly Lit",
        artist_id: NumberInt(4),
        release_id: NumberInt(4),
      },
      {
        track_id: NumberInt(10),
        track_name: "Fear and Trembling (feat. Tim Singer of Deadguy)",
        artist_id: NumberInt(4),
        release_id: NumberInt(4),
      }
    ],
    playlists: [
      {
        playlist_id: NumberInt(3),
        playlist_name: "crust",
        playlist_cover: "string",
        tracks: [NumberInt(1), NumberInt(10)],
        public: false
      }
    ]
  }
);
db.createCollection("user_likes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["artists", "releases", "tracks", "playlists"],
      properties: {
        artists: {
          items: {
            bsonType: "object",
            required: ["artist_name", "artist_id", "artist_cover", "releases"],
            properties: {
              artist_name: {
                bsonType: "string"
              },
              artist_id: {
                bsonType: "int"
              },
              artist_cover: {
                bsonType: "string"
              },
              releases: {
                bsonType: "array",
                items: {
                  bsonType: "int"
                }
              }
            }
          }
        },
        releases: {
          items: {
            bsonType: "object",
            required: ["release_name", "release_id", "release_cover", "release_year", "tracks"],
            properties: {
              release_name: {
                bsonType: "string"
              },
              release_id: {
                bsonType: "int"
              },
              release_cover: {
                bsonType: "string"
              },
              release_year: {
                bsonType: "date"
              },
              tracks: {
                bsonType: "array",
                items: {
                  bsonType: "int"
                }
              }
            }
          }
        },
        tracks: {
          items: {
            bsonType: "object",
            required: ["track_name", "track_id", "artist_id", "release_id"],
            properties: {
              track_name: {
                bsonType: "string"
              },
              track_id: {
                bsonType: "int"
              },
              release_id: {
                bsonType: "int"
              },
              artist_id: {
                bsonType: "int"
              },
            }
          }
        },
        playlists: {
          items: {
            bsonType: "object",
            required: ["playlist_name", "playlist_id", "tracks", "playlist_cover", "public"],
            properties: {
              playlist_name: {
                bsonType: "string"
              },
              playlist_id: {
                bsonType: "int"
              },
              playlist_cover: {
                bsonType: "string"
              },
              public: {
                bsonType: "bool"
              },
              tracks: {
                bsonType: "array",
                items: {
                  bsonType: "int"
                }
              }
            }
          }
        },
      }
    }
  }
})




db.user_likes.insertOne(
  {
    _id: 1,
    artists: [


    ],
    releases: [

    ],
    playlists: [

    ],
    tracks: [

    ]
  }
)




























db.user_likes.insertOne(
  {
    _id: 1,
    artists: [
      {
        artist_id: 1,
        artist_name: "Шлем",
        releases: [1, 5]
      },
      {
        artist_id: 4,
        artist_name: "Every Time I Die",
        releases: [4]
      }
    ],
    releases: [
      {
        release_id: 2,
        release_name: "Крысы",
        tracks: [7,8]
      },
    ],
    playlists: [
      {
        playlist_id: 3,
        playlist_name: "crust",
        tracks: [1,10]
      }
    ],
    tracks: [
      {
        track_id: 4,
        track_name: "Хекс",
        artist_id: 1,
        release_id: 1,
      },
      {
        track_id: 20,
        track_name: "Just as Real but Not as Brightly Lit",
        artist_id: 4,
        release_id: 4,
      },
      {
        track_id: 10,
        track_name: "Fear and Trembling (feat. Tim Singer of Deadguy)",
        artist_id: 4,
        release_id: 4,
      }
    ]
  }
)

