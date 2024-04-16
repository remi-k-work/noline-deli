// components
import NavBarDrawerContent from "@/components/NavBarDrawerContent";
import NavBarDrawerSide from "@/components/NavBarDrawerSide";

export default function Loading() {
  return (
    <>
      <NavBarDrawerContent>
        <div className="grid h-full place-content-center">
          <span className="loading loading-dots loading-lg m-auto block" />
        </div>
      </NavBarDrawerContent>
      <NavBarDrawerSide />
    </>
  );
}
