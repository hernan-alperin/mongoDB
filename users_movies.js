// random movie seen selection
db.users.drop(); db.movies.drop();

var n=100 // users
var m=1000 // movies
var l=10000 // events

for (i=1; i<=n; i++) db.users.insert({'i':i, 'movies':[]})
for (j=1; j<=m; j++) db.movies.insert({'j':j, 'users'':[]})

for (k=1; k<=l; k++) {
  var random_user = db.users.findOne({i:Math.floor(Math.random()*db.users.count())+1})._id
  var random_movie = db.movies.findOne({j:Math.floor(Math.random()*db.movies.count())+1})._id

  var seen = db.users.findOne(random_user).movies; seen.push(random_movie)
  db.users.update({_id:random_user}, {$set:{'movies':seen}})
  var audience = db.movies.findOne(random_movie).users; audience.push(random_user)
  db.movies.update({_id:random_movie}, {$set:{'users':audience}})
  
  db.users_movies.insert({'k':k, 'user':random_user, 'movie':random_movie})
}

// sort criteria
function id_sort(i,j) {return i.id-j.id};

// create the co-occurrence matrix
for (movie_i=1; movie_i<=m; movie_i++)
  for (movie_j=1; movie_j<=m; movie_j++) {
    var s_ij=0;
    var users_i=db.users_movies.find({'movie':movie_i}).toArray();
    var users_j=db.users_movies.find({'movie':movie_j}).toArray();
    users_i.sort(id_sort); users_j.sort(id_sort); 
    while (users_i.length && users_j.length) {
      var user_i=users_i.shift(), user_j=users_j.shift();
      while (user_i.id < user_j.id) user_i=users_i.shift();
      while (user_i.id > user_j.id) user_j=users_j.shift();
      if (user_i.id == user_j.id) s_ij++;
    }
    db.coocurrence.insert({'movie_i':movie_i, 'movie_j':movie_j, 's_ij':s_ij});
  }
