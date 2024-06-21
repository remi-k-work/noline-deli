// component css styles
import styles from "./Header.module.css";

// next
import Link from "next/link";

// other libraries
import clsx from "clsx";
import PathFinder from "../PathFinder";

// components
import NavBar from "./NavBar";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Logout from "./Logout";

export default async function Header() {
  return (
    <header className={clsx(styles["header"], "z-30 text-primary")}>
      <Link href={PathFinder.toManagerHome()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="32" viewBox="0 0 31.013 17.044">
          <path
            fill="currentColor"
            d="M64.651 84.919c-.288 0-.539.1-.752.3-.213.201-.351.459-.414.772-.038.301.025.552.188.753.163.188.39.282.678.282.276 0 .52-.094.733-.282.214-.201.345-.452.395-.753.038-.313-.025-.57-.188-.771-.15-.201-.364-.301-.64-.301zm-3.418.063-2.753 1.16s-3.207 5.798-1.204 8.542c2.003 2.743 6.915 3.174 11.587 1.983 6.834-1.741 7.745 5.296 7.745 5.296.072-8.991-1.633-6.454-8.532-6.347-3.042.048-7.317-.133-8.806-2.4-1.488-2.267 1.963-8.234 1.963-8.234zm-11.13 1.32c-.876 0-1.56.159-2.052.478-.715.464-1.072 1.217-1.072 2.258 0 1.054.357 1.913 1.072 2.578.715.664 1.837 1.103 3.368 1.316 1.517.214 2.634.094 3.349-.357.715-.464 1.072-1.223 1.072-2.277 0-1.053-.357-1.912-1.072-2.577-.715-.665-1.832-1.104-3.35-1.317a9.675 9.675 0 0 0-1.315-.101zm20.457 1.57c-.276 0-.534.045-.772.132a4.078 4.078 0 0 0-.621.301 3.525 3.525 0 0 0-.452.34c-.113.112-.2.187-.263.225h-.038l.076-.847h-1.543l-.94 6.66h1.75l.639-4.553a.696.696 0 0 1 .169-.188c.1-.087.2-.169.301-.244.113-.088.232-.157.358-.207a.835.835 0 0 1 .376-.094c.263 0 .433.088.508.263.075.163.081.483.018.96l-.545 4.064h1.712l.64-4.497c.112-.79.069-1.374-.132-1.75-.2-.376-.614-.564-1.241-.564zm5.286 0c-.376 0-.74.076-1.09.226-.34.151-.653.376-.942.677-.276.301-.52.678-.734 1.13-.2.451-.344.997-.432 1.637-.088.577-.088 1.078 0 1.505.088.413.232.759.432 1.035.214.263.477.457.79.583a2.86 2.86 0 0 0 1.036.188c.313 0 .602-.031.865-.094.276-.05.514-.107.715-.17.213-.075.382-.144.508-.207.138-.075.232-.131.282-.169l-.188-1.166c-.088.05-.188.1-.301.15-.113.05-.245.1-.395.15a3.57 3.57 0 0 1-.47.133 3.215 3.215 0 0 1-.49.037c-.376 0-.677-.126-.903-.376-.213-.264-.276-.684-.188-1.26h3.368c.025-.026.056-.12.094-.283.05-.176.094-.383.132-.621.075-.552.075-1.022 0-1.41-.075-.39-.207-.71-.396-.96a1.612 1.612 0 0 0-.714-.546 2.433 2.433 0 0 0-.979-.188zm-10.762.02-1.806.244-.903 6.548h1.75zm-14.945.276c.37-.003.797.03 1.28.098.953.126 1.693.333 2.22.621.514.289.771.696.771 1.223 0 .502-.257.822-.771.96-.527.138-1.267.138-2.22 0-.966-.138-1.706-.351-2.22-.64-.527-.288-.79-.678-.79-1.167 0-.501.263-.827.79-.978.257-.075.57-.114.94-.117zm25.519.946c.238 0 .42.12.546.358.125.238.144.677.056 1.317h-1.768c.087-.627.244-1.06.47-1.298.238-.251.47-.377.696-.377zm-28.53 4.684v1.6l4.422.62.565.038c.175.012.3.03.376.056v.02c-.903.325-1.794.651-2.672.977-.89.314-1.787.634-2.69.96v1.618l8.542 1.204v-1.58l-4.422-.602a5.014 5.014 0 0 0-.564-.076 6.109 6.109 0 0 1-.395-.037l5.38-1.995v-1.6zm12.903 3.642a.454.454 0 0 0-.273.094.398.398 0 0 0-.158.242l-.23.989a.712.712 0 0 0 .13.632l.078.075a.66.66 0 0 0 .489.209c.21 0 .378-.092.504-.213a.714.714 0 0 0 1.015.004.736.736 0 0 0 .516.209c.195 0 .36-.074.501-.213a.7.7 0 0 0 .51.213.641.641 0 0 0 .49-.21l.063-.066a.714.714 0 0 0 .137-.64l-.231-.99a.452.452 0 0 0-.164-.24.421.421 0 0 0-.267-.095zm12.014.003c-.277.111-.404.139-.782.189v.172l.117.011c.305.04.366.144.36.621v2.346c0 .306-.1.439-.343.46l-.134.012v.166h1.476v-.166l-.128-.011c-.244-.022-.344-.155-.344-.46v-3.34zm-7.909.2v.172l.139.017c.288.033.355.144.36.61v2.18c-.005.466-.072.576-.36.61l-.139.016v.172h1.692c.86 0 1.32-.122 1.708-.46.372-.322.599-.854.599-1.398 0-.527-.216-1.076-.555-1.397-.382-.361-.915-.522-1.752-.522zm9.546.15a.335.335 0 1 0-.007.67.335.335 0 0 0 .007-.67zm-7.832.078c.604 0 1.054.2 1.326.588.2.277.305.654.305 1.064 0 .45-.128.865-.355 1.148-.267.339-.716.522-1.276.522-.278 0-.505-.05-.583-.122-.06-.056-.077-.144-.077-.366v-2.324c0-.211.017-.317.066-.372.067-.083.31-.138.594-.138zm-2.72.01.242.989c.02.096 0 .183-.062.262a.256.256 0 0 1-.211.1.23.23 0 0 1-.18-.075.297.297 0 0 1-.083-.184l-.136-1.085zm-3.099.007h.441l-.136 1.085c-.027.177-.115.26-.263.26-.092 0-.16-.032-.21-.101a.302.302 0 0 1-.063-.263zm.894 0h.437v1.053a.29.29 0 0 1-.08.206.278.278 0 0 1-.211.086.232.232 0 0 1-.193-.092.323.323 0 0 1-.076-.209v-.035zm.885 0h.437l.123 1.009a.252.252 0 0 1-.064.24.283.283 0 0 1-.227.096.254.254 0 0 1-.188-.086.29.29 0 0 1-.08-.206zm8.106.792c-.76 0-1.31.571-1.31 1.37 0 .372.14.743.367.999.25.282.588.421 1.004.421.51 0 .865-.21 1.148-.693l-.183-.09c-.205.367-.455.534-.805.534-.393 0-.676-.195-.826-.572-.083-.194-.111-.438-.111-.832h1.925c-.006-.322-.078-.52-.261-.732-.222-.26-.56-.405-.948-.405zm3.832.05a6.934 6.934 0 0 1-.815.111v.166l.11.012c.295.033.367.122.367.46v1.303c0 .306-.1.439-.344.46l-.139.012v.166h1.487v-.166l-.133-.011c-.244-.022-.344-.155-.344-.46V98.73zm-3.86.172c.405 0 .66.266.66.693h-1.332c.04-.233.073-.332.162-.449a.595.595 0 0 1 .51-.244zm-10.319 1.01v1.113c0 .25.2.449.449.449h3.137a.448.448 0 0 0 .448-.449v-1.109a.663.663 0 0 1-.448.213.701.701 0 0 1-.552-.213.711.711 0 0 1-.501.213.744.744 0 0 1-.516-.209.72.72 0 0 1-1.015-.004.7.7 0 0 1-.502.213c-.201 0-.352-.078-.5-.217z"
            transform="translate(-46.979 -84.919)"
          />
        </svg>
        <span className="font-bold">Manager</span>
      </Link>
      <div className="flex items-end gap-2">
        <NavBar />
        <ThemeSwitcher />
        <Logout />
      </div>
    </header>
  );
}
