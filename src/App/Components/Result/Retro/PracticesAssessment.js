import React from 'react';
import propTypes from 'prop-types';
import {history} from '../../../utils/history';

require('./PracticesAssessment.css');

export class PracticesAssessment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {assessments: []};
    this.onPracticeAssessmentChange = this.onPracticeAssessmentChange.bind(this);
    this.doesFollow = this.doesFollow.bind(this);
    this.savePracticesAssessment = this.savePracticesAssessment.bind(this);
  }

  componentWillMount() {
    this.props.fetchPractices();
  }

  savePracticesAssessment() {
    this.props.savePracticeAssessment(this.props.match.params.id, this.state.assessments)
        .then(() => history.push(`/retro/${this.props.match.params.id}`));
  }

  onPracticeAssessmentChange(id, answer) {
    const assessmentPosition = this.state.assessments.findIndex((assessment) => assessment.bestPracticeId === id);
    const assessments = [...this.state.assessments];
    assessments[assessmentPosition].answer = answer;
    this.setState({assessments: assessments});
  }

  doesFollow(id) {
    let assessments = this.state.assessments;
    if (assessments.length === 0) {
      assessments = this.props.practices.map(
          (assessment) => ({bestPracticeId: assessment.id, answer: true}));
      this.setState({assessments: assessments});
    }

    return assessments.find((assessment) => assessment.bestPracticeId === id).answer;
  }

  render() {
    return <div className={'practices'}>
      <div className={'practices__heading'}>
        Best Practices
      </div>
      {this.props.practices.map((practice, index) => (
          <div key={index} className='description'>
            <div className={'description__text'}>{practice.description}</div>
            <div className={'description__btns'}>
              <label className={'description__label'}>
                <input className={'description__btn'}
                       id={`yes-${index}`}
                       type={'checkbox'}
                       name={'applicable'}
                       onChange={() => this.onPracticeAssessmentChange(practice.id, true)}
                       checked={this.doesFollow(practice.id)}/>
                Yes
              </label>
              <label className={'description__label'}>
                <input className={'description__btn'}
                       id={`no-${index}`}
                       type={'checkbox'}
                       name={'applicable'}
                       onChange={() => this.onPracticeAssessmentChange(practice.id, false)}
                       checked={!this.doesFollow(practice.id)}/>
                No
              </label>
            </div>
          </div>
      ))}
      <button className={'button--small u-margin-top-small'}
              onClick={this.savePracticesAssessment}>
        Save
      </button>
    </div>;
  }
}

PracticesAssessment.propTypes = {
  practices: propTypes.array.isRequired,
  fetchPractices: propTypes.func.isRequired,
  savePracticeAssessment: propTypes.func.isRequired,
};
