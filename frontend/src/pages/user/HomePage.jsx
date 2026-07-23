import { HeroSection } from "../../components/pages/homepage/HeroSection";
import { Trending } from "../../components/pages/homepage/Trending";
import { AIStylist } from  "../../components/pages/homepage/AIStylist";
import { Discover } from "../../components/pages/homepage/Discover";
import { Community } from "../../components/Coummunity";
import { SmarterFashion } from "../../components/pages/SmarterFashion";

export const HomePage = () => {
  return (
    <>
      <HeroSection/>
      <Trending/>
      <AIStylist/>
      <SmarterFashion/>
      <Community/>
      <Discover/>
    </>
  );
};
