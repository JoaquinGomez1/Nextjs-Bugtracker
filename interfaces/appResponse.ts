export default interface AppResponse<T = void> {
  message: string;
  status: string;
  ok?: boolean;
  data?: T;
}
