import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Route } from 'react-router-dom';
import * as authorActions from '../../actions/authorActions.js';
import AuthorList from './AuthorList.js';
import LoadingDots from '../common/LoadingDots.js';
import toastr from 'toastr';

class AuthorsPage extends React.Component {

  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  handleDelete(author) {
    this.props.actions.deleteAuthor(author.id).then(() => {
      toastr.error('Deleted ' + author.firstName + ' ' + author.lastName);
    }).catch(error => {
      toastr.error(error);
    });
  }

  redirect() {
    this.context.router.history.push('/author');
  }

  render() {
    return (
      <div>
        <div className="clearfix">
          <div className="float-left">
            <h1 className="font-weight-300">Resources{this.props.loading && <LoadingDots interval={100} dots={3} />}</h1>
          </div>
          <div className="float-right">
            <input type="submit"
                   value="Add Author"
                   className="btn btn-primary"
                   onClick={this.redirect} />
          </div>
        </div>

        <AuthorList authors={this.props.authors} handleDelete={this.handleDelete} />
      </div>
    );
  }
}

AuthorsPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    authors: state.authors,
    loading: state.ajaxCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
