// Source: https://www.linkedin.com/learning/javascript-essential-training-3/object-constructors

// let course01 = {
//   title: "JavaScript Essential Training",
//   instructor: "Morten Rand-Hendriksen",
//   level: 1,
//   published: true,
//   views: 0,
//   updateViews: function () {
//     return ++course.views;
//   },
// };

function Course(title, instructor, level, published, views) {
  this.title = title;
  this.instructor = instructor;
  this.level = level;
  this.published = published;
  this.views = views;
  this.updateViews = function () {
    return ++this.views;
  };
}

course01 = new Course("JS Essentials", "Morten Rand-Hendriksen", 1, true, 0);
course02 = new Course("Another Training", "Another intructor", 1, false, 0);
let courses = [course01, course02];

console.log(course01);
console.log(course01.instructor); // dot notation
console.log(course01["instructor"]); // bracket notation
console.log(course01.views);
course01.updateViews();
console.log(course01.views);
console.log(courses);
