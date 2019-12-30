import React from "react";

require('./Tile.css');

export const ActionItemTile = ({assignedTo, description}) => {
  return <div className={'tile u-brown-background-color u-white-font-color'}>
    <div className={'tile__description'}>
      {description}
    </div>
    <div className={'footer'}>
      <div>
        Assigned To:
      </div>
      <div className={'footer__name'}>
        {assignedTo}
      </div>
    </div>
  </div>
};

export const RetroPointTile = ({retroId, retroPointId, votes, description, className, onVoteCast}) => {
  return <div className={`tile u-white-font-color ${className}`}>
    <div className={'tile__description'}>
      {description}
    </div>
    <div className={'footer'}>
      <div className={'footer__vote-text'} onClick={() => onVoteCast(retroId, retroPointId)}>
        Vote
      </div>
      <div className={'footer__votes'}>
        {votes}
      </div>
    </div>
  </div>
};
