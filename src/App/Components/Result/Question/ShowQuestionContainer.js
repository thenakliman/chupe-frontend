import {ShowQuestion} from './ShowQuestion';
import {connect} from 'react-redux';
import {setIsEditingQuestion} from '../../../Actions/currentViewActions';
import {updateQuestion} from '../../../Actions/questionActions';

/** Maps state of the ShowQuestion component from store

  @param {object} state of the store
  @return {object} question metadata
*/
function mapStateToProps(state) {
    const currentQuestion = state.questions.questionsData.find(
        (question) => question.id === state.currentView.currentQuestion);
    return {
      id: currentQuestion.id,
      question: currentQuestion.question,
      description: currentQuestion.description,
      assignedTo: currentQuestion.assignedTo,
      owner: currentQuestion.owner,
      isEditing: state.currentView.isEditingQuestion,
      users: state.users.usersData,
      questions: state.questions.questionsData,
    };
};

const mapDispatchToProps = (dispatch) => ({
  setEditingQuestion: (isEditing) => {
      dispatch(setIsEditingQuestion(isEditing));
  },
  updateQuestion: (questions, newQuestion) => {
      dispatch(updateQuestion(questions, newQuestion));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowQuestion);
