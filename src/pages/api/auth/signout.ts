import { ApiError, ApiRequest, ApiResponse } from "@/types/api.types";
import { createRouter } from "next-connect";

const router = createRouter<ApiRequest, ApiResponse>();

router.post(async (req, res) => {
  try {
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router.handler({
  onError(err, req, res) {
    const error = err as ApiError;
    console.error(error.stack);
    res.status(error.status || 500).json({ message: error.message });
  },
});
