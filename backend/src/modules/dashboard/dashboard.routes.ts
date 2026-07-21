import { Router, Response, NextFunction } from "express";
import { requireAuth, AuthedRequest } from "../../middlewares/auth.middleware";
import { prisma } from "../../db/prisma";

const router = Router();
router.use(requireAuth);

router.get("/stats", async (_req: AuthedRequest, res: Response, next: NextFunction) => {
  try {
    const [portfolioCount, blogCount, softServiceCount, hardServiceCount, newEnquiries, totalEnquiries] =
      await Promise.all([
        prisma.portfolioProject.count(),
        prisma.blogPost.count(),
        prisma.service.count({ where: { type: "SOFT" } }),
        prisma.service.count({ where: { type: "HARD" } }),
        prisma.enquiry.count({ where: { status: "NEW" } }),
        prisma.enquiry.count(),
      ]);

    res.json({
      portfolioCount,
      blogCount,
      softServiceCount,
      hardServiceCount,
      newEnquiries,
      totalEnquiries,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
