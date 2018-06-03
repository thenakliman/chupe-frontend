import {ShowQuestion} from './ShowQuestion';
import {connect} from 'react-redux';
import {setIsEditingQuestion} from '../../../Actions/currentViewActions';

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
    };
};

const mapDispatchToProps = (dispatch) => ({
  setEditingQuestion: () => {
      dispatch(setIsEditingQuestion(true));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowQuestion);
