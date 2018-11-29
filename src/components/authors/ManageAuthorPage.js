import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authorActions from '../../actions/authorActions.js';
import AuthorForm from './AuthorForm.js';
import toastr from 'toastr';

class ManageAuthorPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      author: Object.assign({}, props.author),
      errors: {},
      loading: false
    };

    this.updateAuthorState = this.updateAuthorState.bind(this);
    this.saveAuthor = this.saveAuthor.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.author.id != nextProps.author.id) {
      this.setState({
        course: Object.assign({}, nextProps.author)
      });
    }
  }

  updateAuthorState(e) {
    let author = this.state.author;
    author[e.target.name] = e.target.value;
    return this.setState({author: Object.assign({}, author)});
  }

  saveAuthor(e) {
    e.preventDefault();
    this.setState({
      loading: true
    });
    this.props.actions.saveAuthor(this.state.author).then(() => {
      this.redirect()
    }).catch(error => {
      toastr.error(error);
      this.setState({ loading: false });
    });
  }

  redirect() {
    this.setState({
      loading: false
    });
    this.context.router.history.push('/authors');
  }

  handleBackClick(e) {
    e.preventDefault();
    this.context.router.history.push('/authors');
  }

  render() {
    return (
      <div>
        <h1 className="font-weight-300">Manage Author</h1>
        <div className="row">
          <div className="col-12 col-sm-8">
            <AuthorForm
              onChange={this.updateAuthorState}
              onBackClick={this.handleBackClick}
              onSave={this.saveAuthor}
              author={this.state.author}
              errors={this.state.errors}
              loading={this.state.loading} />
          </div>
        </div>
      </div>
    );
  }
}

function getAuthorById(authors, id) {
  const author = authors.filter(a => a.id == id);
  if (author.length) return author[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const authorId = ownProps.match.params.id; // from the path /course/:id

  console.log('authorId', authorId);

  let author = {
    id: '',
    firstName: '',
    lastName: ''
  };

  if (authorId && state.authors.length > 0) {
    author = getAuthorById(state.authors, authorId);
  }

  return {
    author: author
  };
}

ManageAuthorPage.contextTypes = {
  router: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);
