import authApiMiddleware from "@/middlewares/api/auth.middleware";
import { ApiError, ApiRequest, ApiResponse } from "@/types/api.types";
import { createRouter } from "next-connect";
import threetMocks from "@/mocks/threets";

const router = createRouter<ApiRequest, ApiResponse>();

router.use(authApiMiddleware);

router.delete(async (req, res) => {
  try {
    const { id } = req.body;

    res.status(200).json({ id });
  } catch (e) {
    res.status(500).json({
      message: "Internal server error",
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
