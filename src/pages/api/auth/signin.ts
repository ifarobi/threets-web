import { ApiError, ApiRequest, ApiResponse } from "@/types/api.types";
import jwt from "jsonwebtoken";
import { createRouter } from "next-connect";

import usersMock from "@/mocks/users";

const router = createRouter<ApiRequest, ApiResponse>();

router.post(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = usersMock.find((user) => user.email === email);

    if (!user) {
      throw { status: 400, message: "User not found" };
    }

    if (user.password !== password) {
      throw { status: 400, message: "Wrong password" };
    }

    const { id, email: userEmail, firstName, lastName } = user;
    const token = jwt.sign(
      { id, email: userEmail, firstName, lastName },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (e) {
    const error = e as ApiError;
    res.status(error.status || 500).json({
      message: error.message || "Internal server error",
    });
  }
});

export default router.handler({
  onError(err, req, res) {
    const error = err as ApiError;
    console.error(error.stack);
    res.status(error.status || 500).json({ message: error.message });
  },
});
