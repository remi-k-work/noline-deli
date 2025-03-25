// next
import { Inter, Lusitana, Noto_Color_Emoji } from "next/font/google";

export const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
export const lusitana = Lusitana({ variable: "--font-lusitana", weight: ["400", "700"], subsets: ["latin"] });
export const notoColorEmoji = Noto_Color_Emoji({ variable: "--font-noto-color-emoji", weight: "400", subsets: ["emoji"] });
