import React from 'react';
import propTypes from 'prop-types';
/* eslint-disable */
import {CreateRetroPopUp} from './CreateRetroPopUp';
/* eslint-enable */
import {history} from '../../../utils/history';

require('./Retros.css');

export class Retros extends React.Component {
  constructor(props) {
    super(props);
    this.state = {creatingRetro: false};
    this.toggleCreatingRetro = this.toggleCreatingRetro.bind(this);
    this.createRetro = this.createRetro.bind(this);
  }

  componentDidMount() {
    this.props.getAllRetros();
  }

  toggleCreatingRetro() {
    this.setState({creatingRetro: !this.state.creatingRetro});
  }

  viewRetro(id) {
    this.props.getPracticesAssessment(id).then(() => {
      if (this.props.practicesAssessment.length === 0) {
        history.push(`/retro-practices-assessment/${id}`);
      } else {
        history.push('/retro/' + id);
      }
    });
  }

  createRetro(retro) {
    this.props.createRetro(retro);
    this.toggleCreatingRetro();
  }

  render() {
    return (
        <div id='retro-container-id' className='retro-container'>
          <button id='retro-button-id'
                  className='retro-button'
                  type='button'
                  onClick={this.toggleCreatingRetro}
          >
            Create Retro
          </button>
          {this.state.creatingRetro &&
          <CreateRetroPopUp
              createRetro={(retro) => this.createRetro(retro)}
              closeCreatePopUp={this.toggleCreatingRetro}
          />
          }
          <div>
            <table id='all-retros-ordered-list'>
              <thead>
              <tr className='retro-table-header'>
                <th> Name</th>
                <th> Created By</th>
                <th> Maximum Vote</th>
              </tr>
              </thead>
              <tbody id='all-retro-table-body-id'
                     className={'retro-table-body'}>
              {
                this.props.retros.map((retro) => (
                    <tr key={`${retro.id}`}
                        id={`retro-row-id-${retro.id}`}
                        onClick={() => this.viewRetro(retro.id)}
                        className={'selectable-row'}>
                      <td className='retro-row'>
                        {retro.name}
                      </td>
                      <td> {retro.createdBy}</td>
                      <td> {retro.maximumVote}</td>
                    </tr>
                ))
              }
              </tbody>
            </table>
          </div>
        </div>
    );
  }
}

Retros.propTypes = {
  retros: propTypes.array,
  practicesAssessment: propTypes.array.isRequired,
  getAllRetros: propTypes.func.isRequired,
  getPracticesAssessment: propTypes.func.isRequired,
  createRetro: propTypes.func.isRequired,
};
