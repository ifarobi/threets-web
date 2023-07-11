import authApiMiddleware from "@/middlewares/api/auth.middleware";
import { ApiError, ApiRequest, ApiResponse } from "@/types/api.types";
import { createRouter } from "next-connect";

const router = createRouter<ApiRequest, ApiResponse>();

router.use(authApiMiddleware);

router.get(async (req, res) => {
  res.status(200).json({
    ...req.user,
  });
});

export default router.handler({
  onError(err, req, res) {
    const error = err as ApiError;
    console.error(error.stack);
    res.status(error.status || 500).json({ message: error.message });
  },
});
