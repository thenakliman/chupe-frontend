import {ShowQuestion} from './ShowQuestion';
import {connect} from 'react-redux';

/** Maps state of the ShowQuestion component from store

  @param {object} state of the store
  @return {object} question metadata
*/
function mapStateToProps(state) {
    const currentQuestionId = state.currentView.currentQuestion;
    const currentQuestion = state.questions.questionsData[currentQuestionId];
    return {
      id: currentQuestionId,
      question: currentQuestion.question,
      description: currentQuestion.description,
      assignedTo: currentQuestion.assignedTo,
      owner: currentQuestion.owner,
    };
};

export default connect(mapStateToProps)(ShowQuestion);
