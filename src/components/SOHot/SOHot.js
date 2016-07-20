import React from 'react';
import { connect } from 'react-redux';

import { isLoaded, load as loadResults } from './Actions';
import SOQuestionsList from '../SOQuestionsList/SOQuestionsList';

class SOHot extends React.Component {
  static propTypes = {
    questions: React.PropTypes.array.isRequired,
    dispatch: React.PropTypes.func.isRequired
  };

  componentWillMount() {
    if (__CLIENT__) {
      const { dispatch } = this.props;
      if (!isLoaded(this.props)) {
        SOHot.fetchData({ }, { dispatch }).then(() => {});
      }
    }
  }

  static fetchData = (params, store) => {
    return Promise.all([
      store.dispatch(loadResults())
    ]);
  };

  render() {
    const { questions } = this.props;
    return (
      <div>
        <h3>Hot on StackOverflow</h3>
        <SOQuestionsList questions={questions} />
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    questions: state.sohot.data.results,
    loading: state.sohot.loading
  }
);

export default connect(mapStateToProps)(SOHot);
