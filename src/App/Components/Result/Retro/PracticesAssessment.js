import React from 'react'
import propTypes from 'prop-types'

require('./PracticesAssessment.scss');

export class PracticesAssessment extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchPractices()
  }

  render() {
    return <div class='practices'>
      <table>
        <tbody>
        {this.props.practices.map((practice, index) => (
            <tr>
              <td>
                <div key={index}>
                  {practice.description}
                </div>
              </td>
              <td>
                <span>Yes</span>
                <span>No</span>
              </td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>
  }
}

PracticesAssessment.propTypes = {
  practices: propTypes.array.isRequired,
  fetchPractices: propTypes.func.isRequired
};
