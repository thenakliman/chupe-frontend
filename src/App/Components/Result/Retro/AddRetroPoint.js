import React from 'react';
import propTypes from 'prop-types';

require('./AddRetroPoint.css');

export class AddRetroPoint extends React.Component {
    constructor(props) {
      super(props);
      this.state = {description: ''};
      this.handleRetroDescription = this.handleRetroDescription.bind(this);
      this.createRetroPoint = this.createRetroPoint.bind(this);
    }

    handleRetroDescription(description) {
      this.setState({description: description});
    }

    createRetroPoint() {
      this.props.createRetroPoint(this.state.description);
      this.setState({description: ''});
    }

    render() {
      return (
      <div className='retro-pop-up-container'>
        <div id='add-retro-point-container-id'
             className='add-retro-point-container'>
                <input className={'add-retro-point-creation-input'}
                       id={'add-retro-point-description'}
                       onChange={(event) =>
                          this.handleRetroDescription(event.target.value)}
                       value={this.state.description}
                />
                <div className='add-retro-point-buttons-container'>
                    <button id='add-retro-point-button-id'
                      className='add-retro-point-button'
                      type='button'
                      onClick={this.createRetroPoint}
                    >
                      Add Retro Point
                    </button>
                    <button id='cancel-add-retro-point-button-id'
                      className='add-retro-point-button'
                      onClick={this.props.closeAddRetroPointPopUp}
                      type='button'
                    >
                      Cancel
                    </button>
                </div>
        </div>
      </div>);
    }
}

AddRetroPoint.propTypes = {
  closeAddRetroPointPopUp: propTypes.func.isRequired,
  createRetroPoint: propTypes.func.isRequired,
};
