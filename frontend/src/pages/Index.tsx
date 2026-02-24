import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import WhoWeAre from "@/components/WhoWeAre";
import Marquee from "@/components/Marquee";
import FAQ from "@/components/FAQ";
import CategoriesSection from "@/components/CategoriesSection";
import OurDealingProducts from "@/components/OurDealingProducts";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyChooseUs from "@/components/WhyChooseUs";
import Newsletter from "@/components/Newsletter";
import OurCustomers from "@/components/OurCustomers";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Header />
    <main>
      <HeroSlider />
      <WhoWeAre />
      <Marquee />
      <FAQ />
      <FeaturedProducts />
      <CategoriesSection />
      <OurDealingProducts />
      <OurCustomers />
      <WhyChooseUs />
      <Newsletter />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Index;
