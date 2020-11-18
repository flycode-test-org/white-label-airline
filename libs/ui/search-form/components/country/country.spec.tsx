import { queryByText, render } from '@testing-library/react';
import { mockCountry } from '@white-label-airline/services/countries';
import {
  countriesSlice,
  defaultSearchForm,
  FetchStatus,
  initialCountriesState,
} from '@white-label-airline/store';
import { Formik } from 'formik';
import { axe } from 'jest-axe';
import React, { InputHTMLAttributes } from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import '@white-label-airline/services/i18n/i18n.mock';

import Country from './country';

const mockStore = configureStore([]);

describe('Country', () => {
  let store;

  describe('initial state', () => {
    beforeEach(() => {
      store = mockStore({
        countries: initialCountriesState,
      });

      store.dispatch = jest.fn();
    });

    test('should not have accessibility violations', async () => {
      const { container } = render(
        <Provider store={store}>
          <Formik initialValues={defaultSearchForm} onSubmit={console.log}>
            <Country name="country" label="country" />
          </Formik>
        </Provider>
      );

      expect(await axe(container)).toHaveNoViolations();
    });

    test('should dipatch action to get countries', () => {
      render(
        <Provider store={store}>
          <Formik initialValues={defaultSearchForm} onSubmit={console.log}>
            <Country name="country" label="country" />
          </Formik>
        </Provider>
      );

      expect(store.dispatch).toBeCalledWith(
        countriesSlice.actions.getCountries()
      );
    });
  });

  describe('state with success fetch status', () => {
    beforeEach(() => {
      store = mockStore({
        countries: {
          fetchStatus: FetchStatus.Success,
          countries: [mockCountry],
        },
      });

      store.dispatch = jest.fn();
    });

    test('should not dispatch action to get countries', async () => {
      render(
        <Provider store={store}>
          <Formik
            initialValues={{ country: mockCountry }}
            onSubmit={console.log}
          >
            <Country name="country" label="country" />
          </Formik>
        </Provider>
      );

      expect(store.dispatch).not.toBeCalledWith(
        countriesSlice.actions.getCountries()
      );
    });

    test('should set the input value if form initial value is set to be one of the options', async () => {
      const { queryByLabelText } = render(
        <Provider store={store}>
          <Formik
            initialValues={{ country: mockCountry }}
            onSubmit={console.log}
          >
            <Country name="country" label="country" />
          </Formik>
        </Provider>
      );

      expect((queryByLabelText('country') as HTMLInputElement).value).toEqual(
        mockCountry.Name
      );
    });
  });
});
