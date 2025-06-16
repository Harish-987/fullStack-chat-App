import { create } from "zustand";

export const useThemeStore = create((set) => ({
    theme:localStorage.getItem("chatTheme") || "lemonade",
    setTheme:(theme) => {
        localStorage.setItem("chatTheme",theme);
        set({theme});
        console.log(theme);
    },
}));