import { createNavigationReducer } from 'react-navigation-redux-helpers';
import { stackNavigatorApp } from '../../Containers/Navigator/appNavigatorOpen';

const navReducer = createNavigationReducer(stackNavigatorApp);
export default navReducer;
