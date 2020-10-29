import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { RoutesPath } from './models/routes-path.enum';
import { WhiteLabelRoutesProps } from './white-label-routes.props';
import SearchPage from './components/search-page/search-page';
import QuotesPage from './components/quotes-page/quotes-page';
import SelectedQuotesPage from './components/selected-quotes-page/selected-quotes-page';

export const WhiteLabelRoutes: React.FunctionComponent<WhiteLabelRoutesProps> = ({
  initSearchForm,
  history,
}: WhiteLabelRoutesProps) => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path={RoutesPath.Outbound}>
          <QuotesPage />
        </Route>
        <Route path={RoutesPath.Inbound}>
          <QuotesPage />
        </Route>
        <Route path={RoutesPath.Booking}>
          <SelectedQuotesPage />
        </Route>
        <Route path={RoutesPath.Search}>
          <SearchPage initSearchForm={initSearchForm} />
        </Route>
        <Redirect from="/" to={RoutesPath.Search} />
        <Route render={() => <Redirect to={RoutesPath.Search} />} />
      </Switch>
    </ConnectedRouter>
  );
};

export default WhiteLabelRoutes;
