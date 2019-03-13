import { createNavigationReducer } from 'react-navigation-redux-helpers';
import { rootStack } from '../../Containers/Navigator';

const navReducer = createNavigationReducer(rootStack);
export default navReducer;
