import firebase from './firebase.js';

class CourseRepository {
  static getAllCourses() {
    let db = firebase.firestore();

    return new Promise((resolve, reject) => {
      db.collection('courses').get().then(querySnapshot => {
        let courses = [];
        querySnapshot.forEach(doc => {
          courses.push(doc.data());
        });

        resolve(Object.assign([], courses));
      });
    });
  }

  static saveCourse(course) {
    const db = firebase.firestore();
    const ref = db.collection('courses');

    course = Object.assign({}, course); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      if (course.title.length < 1) {
        reject('Title must be at least 1 characters.');
        return;
      }

      if (course.id) {
        ref.doc(course.id).set(course);
      } else {
        course.id = firebase.GUID();
        ref.doc(course.id).set(course);
      }

      resolve(Object.assign({}, course));
    });
  }

  static deleteCourse(courseId) {
    const db = firebase.firestore();
    const ref = db.collection('courses');

    return new Promise((resolve, reject) => {
      ref.doc(courseId).delete().then(() => {
        resolve();
      });
    });
  }
}

export default CourseRepository;
