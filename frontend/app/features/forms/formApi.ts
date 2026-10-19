import { api } from "../../store/api";

type FormTokenResponse = {
  token: string;
};

export const formApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFormToken: build.query<FormTokenResponse, undefined>({
      query: () => "form-tokens",
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetFormTokenQuery } = formApi;
