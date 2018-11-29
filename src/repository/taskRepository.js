import firebase from './firebase.js';
import projectRepository from './projectRepository.js';

class TaskRepository {
  static getAllTasks() {
    let db = firebase.firestore();

    return new Promise((resolve, reject) => {
      projectRepository.getAllProjects().then(projects => {
        let promiseArr = [];

        let tasks = [];
        for (let i = 0; i < projects.length; i++) {
          let p = db.collection('projects').doc(projects[i].id).collection('tasks').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              tasks.push(doc.data());
            });
          });
          promiseArr.push(p);
        }

        Promise.all(promiseArr).then((values) => {
          resolve(Object.assign([], tasks));
        });
      });

    });
  }
  static getTasksByProjectId(projectId) {
    let db = firebase.firestore();

    return new Promise((resolve, reject) => {
      db.collection(projectId + '/tasks').get().then(querySnapshot => {
        let tasks = [];
        querySnapshot.forEach(doc => {
          tasks.push(doc.data());
        });

        resolve(Object.assign([], tasks));
      });
    });
  }

  static saveTask(projectId, task) {
    const db = firebase.firestore();
    const ref = db.collection('projects').doc(projectId).collection('tasks');

    task = Object.assign({}, task); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      if (task.name.length < 1) {
        reject('Task name must be at least 1 characters.');
        return;
      }

      if (task.id) {
        ref.doc(task.id).set(task);
      } else {
        task.id = firebase.GUID();
        ref.doc(task.id).set(task);
      }

      resolve(Object.assign({}, task));
    });
  }

  static deleteTask(projectId, taskId) {
    const db = firebase.firestore();
    const ref = db.collection('projects').doc(projectId).collection('tasks');

    return new Promise((resolve, reject) => {
      ref.doc(taskId).delete().then(() => {
        resolve();
      });
    });
  }
}

export default TaskRepository;
