import {ShowQuestion} from './ShowQuestion';
import {connect} from 'react-redux';
import {updateQuestion} from '../../../Actions/questionActions';
import {getAnswers} from '../../../Actions/answerActions';

/** Maps state of the ShowQuestion component from store

  @param {object} state of the store
  @return {object} question metadata
*/
export function mapStateToProps(state) {
    return {
      users: state.users,
      questions: state.questions,
      answers: state.answers,
    };
};

export const mapDispatchToProps = (dispatch) => ({
  updateQuestion: (questions, newQuestion) =>
      dispatch(updateQuestion(questions, newQuestion)),

  getAnswers: (questionId) => dispatch(getAnswers(questionId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowQuestion);
