import type { NextApiRequest, NextApiResponse } from "next";
import { cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { serviceAccount } from "@/lib/firebase-admin";
import admin from "firebase-admin";
import dayjs from "@/lib/dayjs";
import axios from "axios";
import { HUB_LIST } from "@/components/HubItem/constant";

const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message";
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_CHANNEL_ACCESS_TOKEN}`,
};

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
    if (typeof req.query.id !== "string") {
      return res.status(400).json({ message: "spaceId is missing" });
    }
    // スペースのデータを取得
    const doc = await db.collection(COLLECTION_NAME).doc(req.query.id).get();
    const space = doc.data();
    if (req.method === "GET") {
      if (typeof req.query.hub_id !== "string") {
        return res.status(400).json({ message: "hubId is missing" });
      }
      const snapshot = await db
        .collection(COLLECTION_NAME)
        .doc(req.query.id)
        .collection(req.query.hub_id)
        .orderBy("updatedAt", "desc")
        .get();
      const promises = snapshot.docs.map(async (doc) => {
        const tmp = doc.data();
        const lastUpdatedUser = await tmp.lastUpdatedUser.get(); // Firestoreから取得したタイムスタンプをDateオブジェクトに変換
        const createdAt = dayjs(tmp.createdAt.toDate()).format();
        const updatedAt = tmp.updatedAt
          ? dayjs(tmp.updatedAt.toDate()).format()
          : null;
        return {
          id: doc.id,
          ...tmp,
          lastUpdatedUser: lastUpdatedUser.data(),
          createdAt,
          updatedAt: updatedAt || null,
        };
      });

      const data = await Promise.all(promises);

      return res.status(200).json(data);
    }
    if (req.method === "POST") {
      let body = null;
      if (["hub_01", "hub_02", "hub_03"].includes(req.body.hubId)) {
        body = {
          createdAt: new Date(),
          updatedAt: new Date(),
          lastUpdatedUser: db.collection("users").doc(profile.userId),
          name: req.body.name,
          url: req.body.url || null,
        };
      }
      if (req.body.hubId === "hub_08") {
        body = {
          createdAt: new Date(),
          updatedAt: new Date(),
          lastUpdatedUser: db.collection("users").doc(profile.userId),
          title: req.body.title,
          description: req.body.description,
        };
      }
      if (!body) {
        return res.status(400).json({ message: "hubId is missing" });
      }
      const docRef = db
        .collection(COLLECTION_NAME)
        .doc(req.query.id as string)
        .collection(req.body.hubId);
      docRef.add(body);

      // LINE messaging APIで送信
      const to = [profile.userId];
      if (space?.partner) {
        const partner = await space.partner.get();
        const partnerData = partner.data();
        const partnerId = partnerData.userId;
        if (!to.includes(partnerId)) {
          to.push(partnerId);
        }
      }
      if (space?.owner) {
        const owner = await space.owner.get();
        const ownerData = owner.data();
        const ownerId = ownerData.userId;
        if (!to.includes(ownerId)) {
          to.push(ownerId);
        }
      }
      axios({
        method: "post",
        url: `${LINE_MESSAGING_API}/multicast`,
        headers: LINE_HEADER,
        data: {
          to,
          messages: [
            {
              type: "text",
              text: `${profile.displayName}さんがデータを登録しました。
カテゴリ：${HUB_LIST.find((hub) => hub.id === req.body.hubId)?.title || ""}
タイトル：${req.body.name || req.body.name || req.body.title || ""}`,
            },
          ],
        },
      });

      return res.status(200).json(body);
    }
    if (req.method === "PUT") {
      if (req.body.id === undefined) {
        return res.status(400).json({ message: "id is missing" });
      }
      const body = {
        updatedAt: new Date(),
        lastUpdatedUser: db.collection("users").doc(profile.userId),
        name: req.body.name,
        url: req.body.url || null,
      };
      const docRef = db
        .collection(COLLECTION_NAME)
        .doc(req.query.id as string)
        .collection(req.body.hubId)
        .doc(req.body.id);
      docRef.update(body);

      // LINE messaging APIで送信
      const to = [profile.userId];
      if (space?.partner) {
        const partner = await space.partner.get();
        const partnerData = partner.data();
        const partnerId = partnerData.userId;
        if (!to.includes(partnerId)) {
          to.push(partnerId);
        }
      }
      if (space?.owner) {
        const owner = await space.owner.get();
        const ownerData = owner.data();
        const ownerId = ownerData.userId;
        if (!to.includes(ownerId)) {
          to.push(ownerId);
        }
      }
      axios({
        method: "post",
        url: `${LINE_MESSAGING_API}/multicast`,
        headers: LINE_HEADER,
        data: {
          to,
          messages: [
            {
              type: "text",
              text: `${profile.displayName}さんがデータを更新しました。
カテゴリ：${HUB_LIST.find((hub) => hub.id === req.body.hubId)?.title || ""}
タイトル：${req.body.name || req.body.name || req.body.title || ""}`,
            },
          ],
        },
      });

      return res.status(200).json({ message: "ok" });
    }
    if (req.method === "DELETE") {
      if (req.query.id === undefined) {
        return res.status(400).json({ message: "id is missing" });
      }
      const docRef = db
        .collection(COLLECTION_NAME)
        .doc(req.query.id as string)
        .collection(req.query.hubId as string)
        .doc(req.query.dataId as string);
      docRef.delete();

      // LINE messaging APIで送信
      const to = [profile.userId];
      if (space?.partner) {
        const partner = await space.partner.get();
        const partnerData = partner.data();
        const partnerId = partnerData.userId;
        if (!to.includes(partnerId)) {
          to.push(partnerId);
        }
      }
      if (space?.owner) {
        const owner = await space.owner.get();
        const ownerData = owner.data();
        const ownerId = ownerData.userId;
        if (!to.includes(ownerId)) {
          to.push(ownerId);
        }
      }
      axios({
        method: "post",
        url: `${LINE_MESSAGING_API}/multicast`,
        headers: LINE_HEADER,
        data: {
          to,
          messages: [
            {
              type: "text",
              text: `${profile.displayName}さんが「${
                HUB_LIST.find((hub) => hub.id === req.query.hubId)?.title || ""
              }」のデータを削除しました。`,
            },
          ],
        },
      });

      return res.status(200).json({ message: "ok" });
    }
    res.status(200).json({ message: "ok" });
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
}
