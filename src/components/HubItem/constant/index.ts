import { IHubItem } from "../types";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { MdDirectionsWalk } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";
import { TbPigMoney } from "react-icons/tb";
import { MdOutlineRule } from "react-icons/md";
import { PiForkKnifeFill } from "react-icons/pi";
import { LuFileEdit } from "react-icons/lu";

export const HUB_LIST: IHubItem[] = [
  {
    id: "hub_01",
    title: "行きたい場所",
    color: "red",
    isComingSoon: false,
    icon: FaMapMarkerAlt,
  },
  {
    id: "hub_02",
    title: "食べたいもの",
    color: "pink",
    isComingSoon: true,
    icon: PiForkKnifeFill,
  },
  {
    id: "hub_03",
    title: "欲しいもの",
    color: "grape",
    isComingSoon: true,
    icon: TbPigMoney,
  },
  {
    id: "hub_04",
    title: "やりたいこと",
    color: "violet",
    isComingSoon: true,
    icon: MdDirectionsWalk,
  },
  {
    id: "hub_05",
    title: "買い物リスト",
    color: "indigo",
    isComingSoon: true,
    icon: IoCart,
  },
  {
    id: "hub_06",
    title: "やること",
    color: "blue",
    isComingSoon: true,
    icon: FaListCheck,
  },
  {
    id: "hub_07",
    title: "我が家のルール",
    color: "cyan",
    isComingSoon: true,
    icon: MdOutlineRule,
  },
  {
    id: "hub_08",
    title: "メモ",
    color: "teal",
    isComingSoon: false,
    icon: LuFileEdit,
  },
];
