export interface IUserState {
  email: string;
  contactId: string | null;
  userFirstName: string | null;
  userLastName: string | null;
  isFetchingUser: boolean;
  isAuthenticated: boolean;

  isOTPCodeSended: boolean;
}
