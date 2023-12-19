import { Profile } from "@/hooks/useProfile";

export interface HubData {
  id: string;
  url?: string;
  name?: string;
  title?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date | null;
  lastUpdatedUser: Profile;
}
