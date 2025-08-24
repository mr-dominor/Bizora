import SlideShow from '@/ui/homepage/top-slideshow';
import SectionOne from '@/ui/homepage/section1';
import SectionTwo from '@/ui/homepage/section2';
import SectionThree from '@/ui/homepage/section3';
import BannerOne from '@/ui/homepage/bannerOne';
import BannerTwo from '@/ui/homepage/bannerTwo';
import Footer from '@/ui/homepage/footer';
import Cart from './cart/page';
// import AnimatedSection from '@/ui/homepage/animated';
export default async function Home() {
  return (
    <div className=" w-full min-h-screen bg-white overflow-x-hidden text-white text-center">
      <div className='relative  flex flex-col max-w-full h-[700px] md:h-[700px] justify-center items-center overflow-hidden'>
        <SlideShow />
      </div>

      {<SectionOne />}
      <BannerOne />
      {<SectionTwo />}
      <BannerTwo />
      {<SectionThree />}
      <Footer />
    </div>
  );
}
