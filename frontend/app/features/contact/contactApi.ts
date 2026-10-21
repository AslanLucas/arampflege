import { api } from "../../store/api";

export type ContactRequestBody = {
  name: string;
  phone: string;
  email: string;
  topic: string;
  message: string;
  consent: boolean;
  formToken: string;
  website: string;
};

export const contactApi = api.injectEndpoints({
  endpoints: (build) => ({
    createContactRequest: build.mutation<null, ContactRequestBody>({
      query: (body) => ({ url: "contact-requests", method: "POST", body }),
    }),
  }),
});

export const { useCreateContactRequestMutation } = contactApi;
