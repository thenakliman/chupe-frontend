import {ShowQuestion} from './ShowQuestion';
import {connect} from 'react-redux';
import {updateQuestion} from '../../../Actions/questionActions';

/** Maps state of the ShowQuestion component from store

  @param {object} state of the store
  @return {object} question metadata
*/
export function mapStateToProps(state) {
    return {
      users: state.users.usersData,
      questions: state.questions.questionsData,
    };
};

export const mapDispatchToProps = (dispatch) => ({
  updateQuestion: (questions, newQuestion) => {
      dispatch(updateQuestion(questions, newQuestion));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowQuestion);
