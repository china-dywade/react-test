import reducer from '../reducer';
import { createStore } from 'redux';
let store: any = createStore( reducer );
export default store;