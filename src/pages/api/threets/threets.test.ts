import threetsGetAll from "./index";
import threetsDeleteThreet from "./delete";
import threetsPost from "./post";
import threetsUpdate from "./update";

import mockedThreets from "../../../mocks/threets";
import mockedUsers from "../../../mocks/users";
import { createMockRequest } from "@/utils/test-utils";

import jwt from "jsonwebtoken";

jest.doMock("jsonwebtoken", () => {
  sign: jest.fn().mockReturnValue("mocked-token");
});

describe("threets related apis", () => {
  const OLD_ENV = process.env;
  const user = mockedUsers[0];

  let token: string;

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...OLD_ENV,
      JWT_SECRET: "mocked-secret",
    };

    token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      process.env.JWT_SECRET
    );
  });

  describe("[GET] /api/threets", () => {
    it("should return 200 OK and return list of threets", async () => {
      const { req, res, next } = createMockRequest({
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      await threetsGetAll(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });

  describe("[POST] /api/threets/post", () => {
    it("should return 201 OK and return created threet", async () => {
      const threets = mockedThreets[0];
      const { req, res } = createMockRequest({
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: {
          content: threets.content,
          user: threets.user,
        },
      });

      await threetsPost(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        content: threets.content,
        user: threets.user,
        id: expect.any(Number),
        created_at: expect.any(String),
      });
    });
  });

  describe("[PATCH] /api/threets/update", () => {
    it("should return 200 OK and return updated threet", async () => {
      const threets = mockedThreets[0];
      const { req, res } = createMockRequest({
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: {
          id: threets.id,
          content: "updated content",
        },
      });

      await threetsUpdate(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        content: "updated content",
        user: threets.user,
        id: threets.id,
        created_at: threets.created_at,
      });
    });

    it("should return 404 Not Found when threet is not found", async () => {
      const { req, res } = createMockRequest({
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: {
          id: 999,
          content: "updated content",
        },
      });

      await threetsUpdate(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });

  describe("[DELETE] /api/threets/delete", () => {
    it("should return 200 OK and return deleted threet", async () => {
      const threets = mockedThreets[0];
      const { req, res } = createMockRequest({
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: {
          id: threets.id,
        },
      });

      await threetsDeleteThreet(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        id: threets.id,
      });
    });

    it("should return 404 Not Found when threet is not found", async () => {
      const { req, res } = createMockRequest({
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: {
          id: 999,
        },
      });

      await threetsDeleteThreet(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });
});
