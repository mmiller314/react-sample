import firebase from './firebase.js';

class AuthorRepository {
  static getAllAuthors() {
    let db = firebase.firestore();

    return new Promise((resolve, reject) => {
      db.collection('authors').get().then(querySnapshot => {
        let authors = [];
        querySnapshot.forEach(doc => {
          authors.push(doc.data());
        });

        resolve(Object.assign([], authors));
      });
    });
  }

  static saveAuthor(author) {
    const db = firebase.firestore();
    const ref = db.collection('authors');

    author = Object.assign({}, author); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      if (author.firstName.length < 1) {
        reject('First Name must be at least 1 characters.');
        return;
      }

      if (author.id) {
        ref.doc(author.id).set(author);
      } else {
        author.id = author.firstName + ' ' + author.lastName;
        ref.doc(author.id).set(author);
      }

      resolve(Object.assign({}, author));
    });
  }

  static deleteAuthor(authorId) {
    const db = firebase.firestore();
    const ref = db.collection('authors');

    return new Promise((resolve, reject) => {
      ref.doc(authorId).delete().then(() => {
        resolve();
      });
    });
  }
}

export default AuthorRepository;
