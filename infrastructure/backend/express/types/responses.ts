
type SerializablePrimitive = string | number | boolean | null | Date;
export type JsonValue =
  | SerializablePrimitive
  | JsonValue[]
  | { [key: string]: JsonValue }
  | undefined;

export type SuccessData = JsonValue;

export type UserView = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
};
export type UserStatsView = UserView & {
  accountsCount: number;
  openAccountsCount: number;
  totalBalance: number;
  totalAvailableBalance: number;
};




export type UserResponseData = { user: UserView };

export type UserListResponseData = { users: UserView[] };
export type UserStatsListResponseData = { users: UserStatsView[] };

export type UserRegistrationResponseData = { userId: string };



export type SerializedDueDate = {
  id: string;
  creditId: string;
  dueDate: Date;
  amountDue: number;
  principal: number;
  interest: number;
  insurance: number;
  status: string;
  paidDate?: Date;
  paidAmount?: number;
};

export type SerializedCreditWithDueDates = {
  id: string;
  customerId: string;
  advisorId: string;
  accountId: string;
  amountBorrowed: number;
  annualRate: number;
  insuranceRate: number;
  durationInMonths: number;
  monthlyPayment: number;
  status: string;
  dateGranted: Date;
  totalAmountDue: number;
  totalPaid: number;
  remainingAmount: number;
  dueDates: SerializedDueDate[];
};

export type CreditsWithDueDatesResponseData = {
  credits: SerializedCreditWithDueDates[];
};

export type SerializedCreditsWithDueDatesData = {
  creditWithDueDates: SerializedCreditWithDueDates[];
};

export type DueDatesResponseData = {
  dueDates: SerializedDueDate[];
};

export type ConversationView = {
  id: string;
  subject: string;
  status: string;
  type: string;
  dateOuverture: Date;
  customerId: string | null;
};

export type ConversationParticipantView = {
  id: string;
  firstname: string;
  lastname: string;
  role: string;
  status: string;
  isPrincipalAdvisor?: boolean;
  isActiveParticipant?: boolean;
};

export type MessageView = {
  id: string;
  conversationId: string;
  senderId: string;
  senderRole: string;
  text: string;
  sendDate: Date;
};

export type MessageResponseData = { message: MessageView };

export type MessagesListResponseData = { messages: MessageView[] };



export type ShareDeleteResponseData = Record<string, never>;

export type OrderResponseData = { orderId: string };





export type SuccessPayload<ResponseData = SuccessData> = {
  status: number;
  code: string;
  message?: string;
  data?: ResponseData;
};

export type SuccessOptions<ResponseData = SuccessData> = {
  status?: number;
  code: string;
  message?: string;
  data?: ResponseData;
  headers?: Record<string, string>;
};
