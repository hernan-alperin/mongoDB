// random movie seen selection
db.users.drop(); db.movies.drop();

var n=100 // users
var m=1000 // movies
var l=10000 // events

for (i=1; i<=n; i++) db.users.insert({'i':i, movies:[]})
for (j=1; j<=m; j++) db.movies.insert({'j':j, users:[]})

for (k=1; k<=l; k++) {
  var random_user = db.users.findOne({i:Math.floor(Math.random()*db.users.count())+1})._id
  var random_movie = db.movies.findOne({j:Math.floor(Math.random()*db.movies.count())+1})._id

  var seen = db.users.findOne(random_user).movies; seen.push(random_movie)
  db.users.update({_id:random_user}, {$set:{movies:seen}})
  var audience = db.movies.findOne(random_movie).users; audience.push(random_user)
  db.movies.update({_id:random_movie}, {$set:{users:audience}})
  
  db.co_occurrence.insert({'k':k, user:random_user, movie:random_movie})
}

//db.users.findOne(random_user)
