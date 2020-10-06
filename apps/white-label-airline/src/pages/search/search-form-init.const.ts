import {
  SearchFormInterface,
  TripTypeEnum,
} from '@white-label-airline/ui/search-form';

export const initSearchForm: SearchFormInterface = {
  country: { Code: 'CN', Name: 'China' },
  tripType: TripTypeEnum.RoundTrip,
  currency: {
    Code: 'CNY',
    DecimalDigits: 2,
    DecimalSeparator: '.',
    RoundingCoefficient: 0,
    SpaceBetweenAmountAndSymbol: false,
    Symbol: '¥',
    SymbolOnLeft: true,
    ThousandsSeparator: ',',
  },
  from: null,
  departDate: new Date(),
  to: null,
  returnDate: null,
};
