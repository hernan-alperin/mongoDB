/* 12 questions that define Work Style. will take values in [-2, -1, 0, 1, 2]
  'set up operate and repair machines':5,
  'study the causes of a condition and develop a new medicine':4,
  'write stories or play a musical instrument':3,
  'teach a class to children or people with disabilities':2,
  'manage a store to increase the sales of a new product':1,
  'keep detailed inventory records on a computer program':2,
  'set goals that are challenging to attain':3,
  'plan out my work with minimal supervision from my manager':2,
  'give instructions to others and have them look up to me':4,
  'go out of my way to help co-workers':5,
  'have supervisors to train me and help me manage my work':3,
  'do something different every day': 2
*/

var n=50; // profiles
for (var p=0; p<n; p++) {
  var learner_profile={};
  for (var q=1; q<=12; q++) {
    learner_profile['q'+q]=Math.floor(Math.random()*5)-2;
  }
  db.learners_profiles.insert(learner_profile);
}

var m=20; // jobs
for (var j=0; j<m; j++) {
  var job_require={};
  for (var q=1; q<=12; q++) {
    job_require['q'+q]=Math.floor(Math.random()*5)-2;
  }
  db.jobs_requirements.insert(job_require);
}

function score(candidate_i,job_j) {
  var s=0;
  for (var q=1; q<=12; q++) s+=candidate_i['q'+q]*job_j['q'+q];
  return s;
}

var job_pos=db.jobs_requirements.findOne();
var candidates=db.learners_profiles.find().toArray();
var ranking=[]
for (i in candidates) {
  var s=score(candidates[i],job_pos);
  ranking.push({candidate:candidates[i]._id, score:s});
}
ranking.sort(function (i,j) {return j.score-i.score});
for (i in ranking) print(ranking[i].candidate, ranking[i].score);


