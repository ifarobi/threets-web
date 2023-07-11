import { ApiError, ApiRequest, ApiResponse } from "@/types/api.types";
import { createRouter } from "next-connect";
import threetsMock from "@/mocks/threets";

const router = createRouter<ApiRequest, ApiResponse>();

router.get(async (req, res) => {
  try {
    res.status(200).json(threetsMock);
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
