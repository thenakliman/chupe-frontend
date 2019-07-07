import {connect} from 'react-redux';
import {ActionItem} from './ActionItem';

import {getActionItems} from '../../../Actions/actionItemActions';

export const mapStateToProps = (state) => ({
  actionItems: state.actionItems,
});

export const mapDispatchToProps = (dispatch) => ({
  getActionItems: () => dispatch(getActionItems()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionItem);
