import type { NextApiRequest, NextApiResponse } from "next";
import { cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { serviceAccount } from "@/lib/firebase-admin";
import admin from "firebase-admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let profile = null;
    if (req.headers.authorization) {
      const authToken = req.headers.authorization.split(" ")[1]; // トークンを抽出
      // トークンを使用した処理
      await fetch(
        "https://api.line.me/oauth2/v2.1/verify?access_token=" + authToken
      );
      const response = await fetch("https://api.line.me/v2/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`, // 実際のアクセストークンに置き換えてください
        },
      });
      profile = await response.json();
      if (profile?.message) {
        return res.status(401).json({ message: profile.message });
      }
    } else {
      return res
        .status(401)
        .json({ message: "Authorization token is missing" });
    }
    const COLLECTION_NAME = "users";
    //　初期化する
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: cert(serviceAccount),
      });
    }
    const db = getFirestore();
    if (req.method === "GET") {
      const docRef = db.collection(COLLECTION_NAME).doc(profile.userId);
      const doc = await docRef.get();
      if (doc.exists) {
        return res.status(200).json(doc.data());
      } else {
        const obj = {
          avatar: profile.pictureUrl,
          name: profile.displayName,
          userId: profile.userId,
        };
        db.collection(COLLECTION_NAME).doc(profile.userId).set(obj);
        return res.status(200).json(obj);
      }
    }
    res.status(200).json({ message: "ok" });
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
}
