import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cheerio from "cheerio";

interface OGPMetaTags {
  [key: string]: string | undefined;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (typeof req.body.url !== "string") {
      return res.status(400).json({ message: "Bad Request" });
    }
    try {
      const { data } = await axios.get(req.body.url);
      const $ = cheerio.load(data);
      const metaTags: OGPMetaTags = {};

      $("meta").each((i, element) => {
        const property = $(element).attr("property");
        if (property?.startsWith("og:")) {
          metaTags[property] = $(element).attr("content");
        }
      });

      return res.status(200).json(metaTags);
    } catch (error) {
      return res.status(200).json({});
    }
  }
}
