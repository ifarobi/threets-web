import { NextApiRequest, NextApiResponse } from "next";

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};

export type Threet = {
  id: number;
  user: number;
  content: string;
  created_at: string;
};

export interface ApiRequest extends NextApiRequest {
  user: User | undefined;
}

export interface ApiResponse extends NextApiResponse {}

export interface ApiError extends Error {
  status: number;
  message: string;
}
