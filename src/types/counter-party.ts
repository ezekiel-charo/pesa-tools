export interface CounterParty {
  /**
   * Paybill, till or phone number
   */
  counterPartyNumber: string;

  /**
   * Business, recipient or sender name
   */
  counterPartyName: string;

  /**
   * Paybill account number
   */
  accountNumber?: string;
}
