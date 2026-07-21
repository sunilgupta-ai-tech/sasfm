import express from "express";
import cors from "cors";
import path from "path";
import { env } from "./config/env";
import { notFoundHandler, errorHandler } from "./middlewares/error.middleware";

import authRoutes from "./modules/auth/auth.routes";
import portfolioRoutes, { adminRouter as portfolioAdminRoutes } from "./modules/portfolio/portfolio.routes";
import blogRoutes, { adminRouter as blogAdminRoutes } from "./modules/blog/blog.routes";
import servicesRoutes, { adminRouter as servicesAdminRoutes } from "./modules/services/services.routes";
import enquiriesRoutes, { adminRouter as enquiriesAdminRoutes } from "./modules/enquiries/enquiries.routes";
import teamRoutes, { adminRouter as teamAdminRoutes } from "./modules/team/team.routes";
import uploadsRoutes from "./modules/uploads/uploads.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";

export const app = express();

app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(express.json({ limit: "2mb" }));

// Serve uploaded images statically, e.g. GET /uploads/portfolio/xyz.jpg
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Public API
app.use("/api/auth", authRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/enquiries", enquiriesRoutes);
app.use("/api/team", teamRoutes);

// Admin API (each protected internally via requireAuth)
app.use("/api/admin/portfolio", portfolioAdminRoutes);
app.use("/api/admin/blog", blogAdminRoutes);
app.use("/api/admin/services", servicesAdminRoutes);
app.use("/api/admin/enquiries", enquiriesAdminRoutes);
app.use("/api/admin/team", teamAdminRoutes);
app.use("/api/admin/uploads", uploadsRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
