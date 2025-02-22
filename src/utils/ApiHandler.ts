import { ApiError } from "./ErrorHandler";
import { ITokens } from "../context/authProvider.context";

/* constant */
import { SERVER_URL } from "../constant/constant";

/** interface */
export interface IFetchHandler {
  endpoint: string;
  method: string;
  payload?: any;
  token?: ITokens;
}

//=================================== fetchHandler start =======================================

const fetchHandler = ({
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
  // if (token) {
  //   headers["Authorization"] = `Bearer ${token.refreshToken}`;
  // }

  return fetch(`${SERVER_URL}${endpoint}`, {
    method,
    body: payload ? JSON.stringify(payload) : undefined,
    headers,
    credentials: "include",
  });
};

//=================================== fetchHandler end =======================================

//=================================== responseHandler start =======================================

const responseHandler = async (res: Response): Promise<any> => {
  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(data.success, data.statusCode, data.errorMessage);
  }

  console.log("Response Data: ", data);

  return data;
};

//=================================== responseHandler end =======================================

export { responseHandler, fetchHandler };
