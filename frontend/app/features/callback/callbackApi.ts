import { api } from "../../store/api";

export type PreferredTime = "morning" | "afternoon" | "anytime";

export type CallbackRequestBody = {
  name: string;
  phone: string;
  location: string;
  preferredTime: PreferredTime | "";
  consent: boolean;
  formToken: string;
  website: string;
};

export const callbackApi = api.injectEndpoints({
  endpoints: (build) => ({
    createCallbackRequest: build.mutation<null, CallbackRequestBody>({
      query: (body) => ({ url: "callback-requests", method: "POST", body }),
    }),
  }),
});

export const { useCreateCallbackRequestMutation } = callbackApi;
