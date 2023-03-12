import { Authentication } from "./reducer";
import { createAction } from "@reduxjs/toolkit";

export const setRequestToken = createAction<string>('AUTH/SET_REQUEST_TOKEN');
export const setAuthentication = createAction<Authentication>('AUTH/SET_AUTHENTICATION')