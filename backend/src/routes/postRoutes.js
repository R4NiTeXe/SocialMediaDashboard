import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multerMiddleware.js";
import { createPost, getFeed, deletePost } from "../controllers/postController.js";

const router = Router();

// All post routes require authentication
router.use(verifyJWT);

router.route("/")
  .get(getFeed)
  .post(upload.single("image"), createPost);

router.route("/:postId")
  .delete(deletePost);

export default router;
