import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable';
import loading from './loading'
import App from '../components/App';
const routerList: any[] = [
  {
    component: () => import('../components/Home'),
    path: '/'
  },
  {
    component: () => import('../components/Home'),
    path: '/home'
  },
  {
    component: () => import('../components/Say'),
    path: '/say'
  },
]
const RootMap = () => (
    <Router>
      <App>
        <Switch>
          {routerList.map(item => (
                  <Route
                    key={item.path}
                    exact={true}
                    path={item.path}
                    component={
                      Loadable({
                        loader: item.component,
                        loading
                    }
                    )}
                  />
            ))
          }
        </Switch>
      </App>
    </Router>
)


export default RootMap;



