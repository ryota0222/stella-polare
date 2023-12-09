import { Liff } from "@line/liff";
import { useEffect, useState } from "react";

export interface Profile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

type UseProfile = (liff: Liff | null) => {
  profile: Profile | null;
};

export const useProfile: UseProfile = (liff) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (liff) {
      liff.getProfile().then((profile) => setProfile(profile));
    }
  }, [liff]);

  return { profile };
};
