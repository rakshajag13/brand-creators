import { getToken } from ".";

export const requestHandler = async <R>(
  method: string,
  url: string,
  body?: any
): Promise<{
  sucsess: boolean;
  status: number;
  data: R;
  error?: Error;
  message?: string;
}> => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(`http://localhost:4000${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Request failed");
    }

    return {
      sucsess: true,
      status: response.status,
      data: (await response.json()) as R,
      error: undefined,
      message: "Request successful",
    };
  } catch (error) {
    return {
      sucsess: false,
      status: 500,
      data: {} as R,
      error: error as Error,
      message: "Request failed",
    };
  }
};
