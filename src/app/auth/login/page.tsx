// component css styles
import styles from "./page.module.css";

// components
import SectionHero from "@/features/manager/components/SectionHero";
import LoginForm from "@/features/manager/auth/components/LoginForm";

// assets
import bannerLogin from "@/assets/manager/banner-login.webp";

export const metadata = {
  title: "NoLine-Deli ► Manager ► Login",
};

export default async function Page() {
  return (
    <article className={styles["page"]}>
      <SectionHero heroBanner={bannerLogin} sectionTitle={"Login"} />
      <section className="bg-base-300 pb-4 pt-4">
        <LoginForm />
      </section>
    </article>
  );
}
