import firebase from './firebase.js';

class ProjectRepository {
  static getAllProjects() {
    let db = firebase.firestore();

    return new Promise((resolve, reject) => {
      db.collection('projects').get().then(querySnapshot => {
        let projects = [];
        let promiseArr = [];
        querySnapshot.forEach(doc => {
          let obj = doc.data();
          obj.tasks = [];
          let p = db.collection('projects').doc(doc.id).collection('tasks').get().then(subQuery => {
            if (subQuery.docs.length > 0) {
              subQuery.forEach(task => {
                obj.tasks.push(task.data());
              });
            }
          });
          promiseArr.push(p);
          projects.push(obj);
        });

        Promise.all(promiseArr).then(values => {
          resolve(Object.assign([], projects));
        });
      });
    });
  }

  static saveProject(project) {
    const db = firebase.firestore();
    const ref = db.collection('projects');

    project = Object.assign({}, project); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      if (project.name.length < 1) {
        reject('Name must be at least 1 characters.');
        return;
      }

      if (project.id) {
        ref.doc(project.id).set(project);
      } else {
        project.id = firebase.GUID();
        project.tasks = [];
        ref.doc(project.id).set(project);
      }

      resolve(Object.assign({}, project));
    });
  }

  static deleteProject(projectId) {
    const db = firebase.firestore();
    const ref = db.collection('projects');

    return new Promise((resolve, reject) => {
      ref.doc(projectId).delete().then(() => {
        resolve();
      });
    });
  }
}

export default ProjectRepository;
