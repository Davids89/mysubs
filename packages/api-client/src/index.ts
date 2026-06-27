import {
  authResponseSchema,
  type AuthResponse,
  type LoginUserRequest,
  type RegisterUserRequest,
} from "@mysubs/shared-types";

type ApiClientOptions = {
  baseUrl: string;
  fetcher?: typeof fetch;
};

type RequestOptions = {
  body: unknown;
  path: string;
};

export type AuthApiClient = {
  login(request: LoginUserRequest): Promise<AuthResponse>;
  register(request: RegisterUserRequest): Promise<AuthResponse>;
};

export const createAuthApiClient = ({
  baseUrl,
  fetcher = fetch,
}: ApiClientOptions): AuthApiClient => ({
  login: (request) =>
    postJson({ body: request, fetcher, path: "/auth/login", baseUrl }),
  register: (request) =>
    postJson({ body: request, fetcher, path: "/auth/register", baseUrl }),
});

const postJson = async ({
  baseUrl,
  body,
  fetcher,
  path,
}: RequestOptions & Required<ApiClientOptions>): Promise<AuthResponse> => {
  const response = await fetcher(`${baseUrl}${path}`, {
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(getApiErrorMessage(payload));
  }

  return authResponseSchema.parse(payload);
};

const getApiErrorMessage = (payload: unknown): string => {
  if (isApiError(payload)) {
    return payload.message;
  }

  return "Unexpected API error";
};

const isApiError = (payload: unknown): payload is { message: string } =>
  typeof payload === "object" &&
  payload !== null &&
  "message" in payload &&
  typeof payload.message === "string";
