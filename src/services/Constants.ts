
export abstract class Constants_PaymentStatus {
  static readonly PendingForCustomerVerificationAndPayment: string = "1";
  static readonly Paid: string = "2";
  static readonly Pending: string = "3";
}

export abstract class Constants_PolicyStatus {
  static readonly PolicyIssued: string = "23";
  static readonly PendingForUnderwriterApproval: string = "2";
  static readonly BreakIn: string = "3";
  static readonly Rejected: string = "4";
  static readonly WaitingForPayment: string = "5";
}

export abstract class Constants_SubProductType {
  static readonly FourWheeler: string = "1";
  static readonly TwoWheeler: string = "2";
  static readonly GCHI: string = "3";
  static readonly CHI: string = "4";
  static readonly GSG: string = "5";
  static readonly GPA: string = "23"
  static readonly Home :string ="26";
}

export abstract class Constants_ProductType {
  static readonly Health: string = "1";
  static readonly Motor: string = "2";
  static readonly FireAndBurglary: string = "3";
}