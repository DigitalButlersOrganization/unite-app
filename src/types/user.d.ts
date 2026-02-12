export interface IUserState {
  email: string;
  userFirstName: string | null;
  userLastName: string | null;
  isFetchingUser: boolean;
  isAuthenticated: boolean;

  isOTPCodeSended: boolean;
}
