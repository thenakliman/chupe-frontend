import {ShowQuestion} from './ShowQuestion';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    id: state.currentView.currentQuestion,
    question: state.questions.questionsData[state.currentView.currentQuestion].question,
    description: state.questions.questionsData[state.currentView.currentQuestion].description,
    assignedTo: state.questions.questionsData[state.currentView.currentQuestion].assignedTo,
    owner: state.questions.questionsData[state.currentView.currentQuestion].owner,
})

export default connect(mapStateToProps)(ShowQuestion);