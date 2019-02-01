import { createNavigationReducer } from 'react-navigation-redux-helpers';
import { drawerAppNavigator } from '../../Containers/Navigator';

const navReducer = createNavigationReducer(drawerAppNavigator);
export default navReducer;
