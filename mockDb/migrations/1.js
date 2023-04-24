// Create a new collection for history
db.createCollection("history");

// Create a new collection for favourites
db.createCollection("favourites");

// Migrate history and favourites fields to their respective collections
const users = db.users.find().toArray();
for (const user of users) {
  // Migrate history field
  const history = user.history;
  if (history && history.length > 0) {
    const historyDocuments = history
      .map((item) => ({
        user_id: ObjectId(user._id),
        data: item,
      }))
      .reverse();
    db.history.insertMany(historyDocuments);
  }

  // Migrate favourites field
  const favourites = user.favourites;
  if (favourites && favourites.length > 0) {
    const favouritesDocuments = favourites
      .map((item) => ({
        user_id: ObjectId(user._id),
        data: item,
      }))
      .reverse();
    db.favourites.insertMany(favouritesDocuments);
  }
}

db.history.createIndex({ user_id: 1, _id: -1 });
db.favourites.createIndex({ user_id: 1, _id: -1 });

// Remove history and favourites fields from user documents
db.users.updateMany({}, { $unset: { history: "", favourites: "" } });
