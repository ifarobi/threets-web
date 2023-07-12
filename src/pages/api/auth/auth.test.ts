import authMeApi from "./me";
import authSignInApi from "./signin";
import authSignUpApi from "./signup";
import authSignOutApi from "./signout";

import userMock from "../../../mocks/users";
import jwt from "jsonwebtoken";
import { createMockRequest } from "@/utils/test-utils";

jest.doMock("jsonwebtoken", () => ({
  sign: jest.fn().mockReturnValue("mocked-token"),
}));

describe("auth related apis", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...OLD_ENV,
      JWT_SECRET: "mocked-secret",
    };
  });

  describe("[GET] /api/auth/me", () => {
    it("should return 200 OK when user is authenticated", async () => {
      const user = userMock[0];
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        process.env.JWT_SECRET
      );

      const { req, res, next } = createMockRequest({
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      await authMeApi(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });

  describe("[POST] /api/auth/signin", () => {
    it("should return 200 OK when user is authenticated", async () => {
      const user = userMock[0];

      const { req, res, next } = createMockRequest({
        method: "POST",
        body: {
          email: user.email,
          password: user.password,
        },
      });

      await authSignInApi(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });

  describe("[POST] /api/auth/signup", () => {
    it("should return 200 OK when user is authenticated and returned it's user's data", async () => {
      const { req, res, next } = createMockRequest({
        method: "POST",
        body: {
          email: "test@gmail.com",
          firstName: "test",
          lastName: "test",
        },
      });

      await authSignUpApi(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        token: expect.any(String),
        user: {
          id: expect.any(Number),
          firstName: "test",
          lastName: "test",
          email: "test@gmail.com",
        },
      });
    });
  });

  describe("[POST] /api/auth/signout", () => {
    it("should return 200 OK when user is authenticated", async () => {
      const { req, res, next } = createMockRequest({
        method: "POST",
      });

      await authSignOutApi(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
      });
    });
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });
});
