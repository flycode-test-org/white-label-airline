import { render } from '@testing-library/react';
import { mockSearchForm } from '@white-label-airline/models/search-form';
import {
  initialQuotesState,
  quotesSlice,
} from '@white-label-airline/store/quotes';
import { searchFormDataTransform } from '@white-label-airline/store/search-form';
import { axe } from 'jest-axe';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { RoutesPath } from '../../models/routes-path.enum';

import QuotesPage from './quotes-page';

const mockStore = configureStore([]);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockReturnValue({ pathanme: RoutesPath.Outbound }),
}));

describe('QuotesPage', () => {
  let store;

  describe('initial state', () => {
    beforeEach(() => {
      store = mockStore({
        quotes: initialQuotesState,
        searchForm: mockSearchForm,
      });

      store.dispatch = jest.fn();
    });

    it('should not have accessibility violations', async () => {
      const { container } = render(
        <Provider store={store}>
          <QuotesPage />
        </Provider>
      );

      expect(await axe(container)).toHaveNoViolations();
    });

    it('should dispatch action to load quotes', () => {
      render(
        <Provider store={store}>
          <QuotesPage />
        </Provider>
      );

      expect(store.dispatch).toBeCalledWith(
        quotesSlice.actions.getQuotes(
          searchFormDataTransform.transfromSearchFormValueToGetQuotesPayload(
            mockSearchForm,
            false
          )
        )
      );
    });
  });
});
