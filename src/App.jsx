import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Router, Route, Redirect, HashRouter } from 'react-router-dom';
import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not</p>;
const RoutedApp = () => (
  <HashRouter>
    <div>
      <Switch>
        <Route path="/issues/:id" component={IssueEdit} />
        <Route path="/issues" component={IssueList} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </div>
  </HashRouter>
);

ReactDOM.render(<RoutedApp />, contentNode);

if (module.hot) {
  module.hot.accept();
}
