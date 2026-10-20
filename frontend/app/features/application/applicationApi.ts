import { api } from "../../store/api";

export const applicationApi = api.injectEndpoints({
  endpoints: (build) => ({
    // multipart/form-data so the resume can be uploaded with the other fields
    createApplication: build.mutation<null, FormData>({
      query: (body) => ({ url: "applications", method: "POST", body }),
    }),
  }),
});

export const { useCreateApplicationMutation } = applicationApi;
