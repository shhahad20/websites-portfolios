import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { Outlet } from "react-router-dom";

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
  bgType: "solid" | "gradient";
  setBgType: (type: "solid" | "gradient") => void;
  gradient: { from: string; to: string; direction: string };
  setGradient: (g: { from: string; to: string; direction: string }) => void;
  inputColor: string;
  setInputColor: (c: string) => void;
  borderColor: string;
  setBorderColor: (c: string) => void;
  socialBtnColor: string;
  setSocialBtnColor: (c: string) => void;
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

export const CustomizationContext = createContext<
  CustomizationContextType | undefined
>(undefined);

export function CustomizationProvider({ children }: { children: ReactNode }) {
  const [primaryColor, setPrimaryColor] = useState(() =>
    JSON.parse(localStorage.getItem("primaryColor") || '"#434343"')
  );
  const [bgColor, setBgColor] = useState(() =>
    JSON.parse(localStorage.getItem("bgColor") || '"#fff"')
  );
  const [avatar, setAvatar] = useState<string | null>(() =>
    localStorage.getItem("avatar")
  );
  const [inputColor, setInputColor] = useState<string>(() =>
    JSON.parse(localStorage.getItem("inputColor") || '"#fff"')
  );
  const [borderColor, setBorderColor] = useState<string>(() =>
    JSON.parse(localStorage.getItem("borderColor") || '"#ccc"')
  );
  const [socialBtnColor, setSocialBtnColor] = useState<string>(() =>
    JSON.parse(localStorage.getItem("socialBtnColor") || '"#434343"')
  );

  const [prompts, setPrompts] = useState<string[]>(
    () =>
      JSON.parse(localStorage.getItem("prompts") || "null") || defaultPrompts
  );
  const [socials, setSocials] = useState<Social[]>(() => {
    const raw = localStorage.getItem("socials");
    if (raw) {
      try {
        const arr = JSON.parse(raw);
        // migrate old socials (no icon) to new format
        return arr.map((s: Social) => ({ ...s, icon: s.icon || "twitter" }));
      } catch {
        return defaultSocials;
      }
    }
    return defaultSocials;
  });
  const [bgType, setBgType] = useState<"solid" | "gradient">(() => {
    const t = localStorage.getItem("bgType");
    return t === "gradient" ? "gradient" : "solid";
  });
  const [gradient, setGradient] = useState<{
    from: string;
    to: string;
    direction: string;
  }>(() => {
    try {
      const g = localStorage.getItem("gradient");
      if (g) return JSON.parse(g);
    } catch {
      // Ignore JSON parse errors and use default gradient
    }
    return { from: "#FDC031", to: "#ffffff", direction: "to bottom" };
  });

  // Persist changes to localStorage
  useEffect(() => {
    localStorage.setItem("primaryColor", JSON.stringify(primaryColor));
    document.documentElement.style.setProperty("--primary-color", primaryColor);
  }, [primaryColor]);

  useEffect(() => {
    localStorage.setItem("bgColor", JSON.stringify(bgColor));
    if (bgType === "solid") {
      document.body.style.background = bgColor;
    }
  }, [bgColor, bgType]);
  useEffect(() => {
    localStorage.setItem("inputColor", JSON.stringify(inputColor));
  }, [inputColor]);
  useEffect(() => {
    localStorage.setItem("borderColor", JSON.stringify(borderColor));
  }, [borderColor]);
  useEffect(() => {
    localStorage.setItem("socialBtnColor", JSON.stringify(socialBtnColor));
  }, [socialBtnColor]);

  useEffect(() => {
    localStorage.setItem("bgType", bgType);
    if (bgType === "gradient") {
      document.body.style.background = `linear-gradient(${gradient.direction}, ${gradient.from}, ${gradient.to})`;
    } else {
      document.body.style.background = bgColor;
    }
  }, [bgType, gradient, bgColor]);

  useEffect(() => {
    localStorage.setItem("gradient", JSON.stringify(gradient));
    if (bgType === "gradient") {
      document.body.style.background = `linear-gradient(${gradient.direction}, ${gradient.from}, ${gradient.to})`;
    }
  }, [gradient, bgType]);

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
    <CustomizationContext.Provider
      value={{
        primaryColor,
        setPrimaryColor,
        bgColor,
        setBgColor,
        avatar,
        setAvatar,
        prompts,
        setPrompts,
        socials,
        setSocials,
        bgType,
        setBgType,
        gradient,
        setGradient,
        inputColor,
        setInputColor,
        borderColor,
        setBorderColor,
        socialBtnColor,
        setSocialBtnColor,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
}
export function useCustomization() {
  const ctx = useContext(CustomizationContext);
  if (!ctx)
    throw new Error(
      "useCustomization must be used within CustomizationProvider"
    );
  return ctx;
}
// useCustomization hook moved to a separate file for Fast Refresh compatibility.

export default function CustomizationLayout() {
  return (
    <CustomizationProvider>
      <Outlet />
    </CustomizationProvider>
  );
}
