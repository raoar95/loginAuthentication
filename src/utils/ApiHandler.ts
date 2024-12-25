import { ApiError } from "./ErrorHandler";
import { ITokens } from "../state/context/AuthProviderContext";

/* const */
import { SERVER_URL } from "../constant/constant";

/** interface */
export interface IFetchHandler {
  endpoint: string;
  method: string;
  payload?: any;
  token?: ITokens;
}

//=================================== fetchHandler start =======================================

const fetchHandler = async ({
  endpoint,
  method,
  payload,
  token,
}: IFetchHandler): Promise<any> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    // "x-platform": "Development",
  };

  // Add Authorization token if exists
  if (token) {
    headers["Authorization"] = `Bearer ${token.refreshToken}`;
  }

  return await fetch(`${SERVER_URL}${endpoint}`, {
    method,
    body: payload ? JSON.stringify(payload) : undefined,
    headers,
    // credentials: "include",     // For Sending cookies
  });
};

//=================================== fetchHandler end =======================================

//=================================== responseHandler start =======================================

const responseHandler = async (res: Response): Promise<any> => {
  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(res.status, `${data.errorMessage}`, data);
  }

  console.log("Response Data: ", data);

  return data;
};

//=================================== responseHandler end =======================================

export { responseHandler, fetchHandler };
