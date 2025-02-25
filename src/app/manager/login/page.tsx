// components
import SectionHero from "@/features/manager/components/SectionHero";
import LoginForm from "@/features/manager/login/components/LoginForm";

// assets
import bannerLogin from "@/assets/manager/banner-login.webp";

export const metadata = {
  title: "NoLine-Deli ► Manager ► Login",
};

export default async function Page() {
  return (
    <>
      <SectionHero heroBanner={bannerLogin} sectionTitle={"Login"} />
      <LoginForm />
    </>
  );
}
