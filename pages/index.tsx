import Header from "@/components/sections/Header";
import Mission from "@/components/sections/Mission";
import Courses from "@/components/sections/Courses";
import Instructors from "@/components/sections/Instructors";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className={`text-white`}>
      <Mission />
      <Courses />
      <Instructors />
    </main>
  );
}
