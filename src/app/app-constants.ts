export class AppConstants {
  // MISCELLANEOUS

  public static DEFAULT_LANG = 'en';

  public static PAGE_SIZE = 20;

  public static PAGE_SIZE_OPTIONS: number[] = [AppConstants.PAGE_SIZE];

  public static MIN_YEAR = 2013;

  // VALIDATORS

  public static LENGTH_3 = 3;

  public static LENGTH_5 = 5;

  public static LENGTH_7 = 7;

  public static LENGTH_50 = 50;

  public static LENGTH_250 = 250;

  public static LENGTH_2048 = 2048;

  public static URL_PATTERN: RegExp =
    /^(https?|ftp|file):\/\/[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]/;

  // VAULT - SECRET

  public static VAULT_SECRET_BASE_URL = 'secret/';

  // FINANCE

  public static FINANCE_BILL_TYPE_URL = 'bill-type/';

  public static FINANCE_BUDGET_URL = 'budget/';
}
