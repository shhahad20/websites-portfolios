import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Types
type Social = { label: string; href: string; icon: string };

interface CustomizationContextType {
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
  avatar: string | null;
  setAvatar: (avatar: string | null) => void;
  prompts: string[];
  setPrompts: (prompts: string[]) => void;
  socials: Social[];
  setSocials: (socials: Social[]) => void;
}

const defaultPrompts = [
  "Tell me about last Noura’s projects",
  "What is Noura’s educations?",
  "Noura’s Contact info",
  "What are Noura’s technical skills?",
];

const defaultSocials: Social[] = [
  { label: "Twitter", href: "https://twitter.com", icon: "twitter" },
  { label: "Mastodon", href: "https://front-end.social", icon: "mastodon" },
  { label: "CodePen", href: "https://codepen.io", icon: "codepen" },
];

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

export function CustomizationProvider({ children }: { children: ReactNode }) {
  const [primaryColor, setPrimaryColor] = useState(() => JSON.parse(localStorage.getItem("primaryColor") || '"#434343"'));
  const [bgColor, setBgColor] = useState(() => JSON.parse(localStorage.getItem("bgColor") || '"#fff"'));
  const [avatar, setAvatar] = useState<string | null>(() => localStorage.getItem("avatar"));
  const [prompts, setPrompts] = useState<string[]>(() => JSON.parse(localStorage.getItem("prompts") || "null") || defaultPrompts);
  const [socials, setSocials] = useState<Social[]>(() => {
    const raw = localStorage.getItem("socials");
    if (raw) {
      try {
        const arr = JSON.parse(raw);
        // migrate old socials (no icon) to new format
        return arr.map((s: any) => ({ ...s, icon: s.icon || "twitter" }));
      } catch {
        return defaultSocials;
      }
    }
    return defaultSocials;
  });

  // Persist changes to localStorage
  useEffect(() => {
    localStorage.setItem("primaryColor", JSON.stringify(primaryColor));
    document.documentElement.style.setProperty('--primary-color', primaryColor);
  }, [primaryColor]);

  useEffect(() => {
    localStorage.setItem("bgColor", JSON.stringify(bgColor));
    document.body.style.background = bgColor;
  }, [bgColor]);

  useEffect(() => {
    if (avatar) localStorage.setItem("avatar", avatar);
  }, [avatar]);

  useEffect(() => {
    localStorage.setItem("prompts", JSON.stringify(prompts));
  }, [prompts]);

  useEffect(() => {
    localStorage.setItem("socials", JSON.stringify(socials));
  }, [socials]);

  return (
    <CustomizationContext.Provider value={{
      primaryColor, setPrimaryColor,
      bgColor, setBgColor,
      avatar, setAvatar,
      prompts, setPrompts,
      socials, setSocials
    }}>
      {children}
    </CustomizationContext.Provider>
  );
}

export function useCustomization() {
  const ctx = useContext(CustomizationContext);
  if (!ctx) throw new Error("useCustomization must be used within CustomizationProvider");
  return ctx;
}
