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
    const COLLECTION_NAME = "spaces";
    //　初期化する
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: cert(serviceAccount),
      });
    }
    const db = getFirestore();
    if (req.method === "POST") {
      let docId: any = null;
      let docData: any = null;
      const querySnapshot = await db
        .collection(COLLECTION_NAME)
        .where("password", "==", req.body.password)
        .get();

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          docData = doc.data();
          docId = doc.id;
        });
      }
      if (!docId) {
        return res.status(404).json({ message: "space not found" });
      }
      if (docData?.partner) {
        return res.status(400).json({ message: "space is full" });
      }
      const docRef = db.collection(COLLECTION_NAME).doc(docId);
      await docRef.update({
        partner: db.collection("users").doc(profile.userId),
      });
      const userDocRef = db.collection("users").doc(profile.userId);
      await userDocRef.update({
        spaceId: docId,
      });

      return res.status(200).json({ data: docId });
    }
    res.status(200).json({ message: "ok" });
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
}
