import {ShowQuestion} from './ShowQuestion';
import {connect} from 'react-redux';

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
    };
};

export default connect(mapStateToProps)(ShowQuestion);
