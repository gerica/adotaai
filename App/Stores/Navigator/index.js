import { createNavigationReducer } from 'react-navigation-redux-helpers';
import { drawerAppNavigator } from '../../Containers/Navigator/appNavigatorOpen';

const navReducer = createNavigationReducer(drawerAppNavigator);
export default navReducer;
