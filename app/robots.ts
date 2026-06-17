import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/admin", "/profile", "/history", "/quiz", "/topic", "/api"],
      },
    ],
    sitemap: "https://tiquiz.vercel.app/sitemap.xml",
  };
}