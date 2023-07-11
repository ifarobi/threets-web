import { ApiError, ApiRequest, ApiResponse } from "@/types/api.types";
import jwt from "jsonwebtoken";
import { createRouter } from "next-connect";

const router = createRouter<ApiRequest, ApiResponse>();

router.post(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const user = {
    id: Math.random(),
    firstName,
    lastName,
    email,
  };
  const token = jwt.sign(user, process.env.JWT_SECRET);

  res.status(200).json({
    token,
    user,
  });
});

export default router.handler({
  onError(err, req, res) {
    const error = err as ApiError;
    console.error(error.stack);
    res.status(error.status || 500).json({ message: error.message });
  },
});
