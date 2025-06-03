export type FindAllResultsType<T> = {
  data: T[];
  total: number;
  page: number;
  lastPage: number;
};
