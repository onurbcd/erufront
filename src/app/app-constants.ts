import { NgxCurrencyConfig, NgxCurrencyInputMode } from 'ngx-currency';

export class AppConstants {
  // MISCELLANEOUS

  public static DEFAULT_LANG = 'en';

  public static DEFAULT_LOCALE = 'pt-PT';

  public static PAGE_SIZE = 20;

  public static PAGE_SIZE_SELECT = 10;

  public static PAGE_SIZE_OPTIONS: number[] = [AppConstants.PAGE_SIZE];

  public static MIN_YEAR = 2013;

  public static POSITIVE_CURRENCY_MASK_CONFIG: NgxCurrencyConfig = {
    align: 'left',
    allowNegative: false,
    allowZero: false,
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: '.',
    nullable: true,
    min: 0.0001,
    max: 999999999999999,
    inputMode: NgxCurrencyInputMode.Financial,
  };

  public static CURRENCY_MASK_CONFIG: NgxCurrencyConfig = {
    align: 'left',
    allowNegative: true,
    allowZero: true,
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: '.',
    nullable: true,
    min: -999999999999999,
    max: 999999999999999,
    inputMode: NgxCurrencyInputMode.Financial,
  };

  public static APP_DAY_FORMAT = {
    parse: {
      dateInput: 'MM/YYYY',
    },
    display: {
      dateInput: 'MM/YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    },
  };

  public static APP_DATE_FORMAT = {
    parse: {
      dateInput: 'YYYY-MM-DD',
    },
    display: {
      dateInput: 'YYYY-MM-DD',
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    },
  };

  public static BALANCE_NAME = 'bogus';

  public static MAX_UPLOAD_SIZE = 10485760;

  // VALIDATORS

  public static LENGTH_3 = 3;

  public static LENGTH_5 = 5;

  public static LENGTH_7 = 7;

  public static LENGTH_50 = 50;

  public static LENGTH_150 = 150;

  public static LENGTH_250 = 250;

  public static LENGTH_2048 = 2048;

  public static URL_PATTERN: RegExp =
    /^(https?|ftp|file):\/\/[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]/;

  public static PATH_PATTERN: RegExp =
    /^[a-z|A-Z|0-9|-]+$/;

  // VAULT - SECRET

  public static VAULT_SECRET_BASE_URL = '/secret';

  // FINANCE

  public static FINANCE_BILL_TYPE_URL = '/bill-type';

  public static FINANCE_BUDGET_URL = '/budget';

  public static FINANCE_CATEGORY_URL = '/category';

  public static FINANCE_DAY_URL = '/day';

  public static FINANCE_INCOME_SOURCE_URL = '/income-source';

  public static FINANCE_SOURCE_URL = '/source';

  public static FINANCE_BALANCE_URL = '/balance';

  // OTHER SERVICES

  public static DOCUMENT_URL = '/document';
}
