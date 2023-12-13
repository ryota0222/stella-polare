import { Profile } from "@/hooks/useProfile";

export interface HubData {
  id: string;
  url: string | null;
  name: string;
  createdAt: Date;
  updatedAt: Date | null;
  lastUpdatedUser: Profile;
}
