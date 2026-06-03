import Clients from '@/components/Clients'
import Connect from '@/components/Connect'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import FaqSection from '@/components/Home/Faq'
import InsightSection from '@/components/Home/Insight'
import Quote from '@/components/Home/Quote'
import Technologies from '@/components/Home/Technologies'
import WelcomeModal from '@/components/Home/WelcomeModal'
import HomeserviceSection from '@/components/Homeservice/HomeserviceSection'
import Ourstorysection from '@/components/Ourstory/Ourstorysection'
import Service from '@/components/Service'
import Slider from '@/components/Slider'
import Story from '@/components/StoryHome/Story'
import Cards from '@/components/Works/Cards'

export default function Home() {


  return (
    <>
      <WelcomeModal />
      <Slider />
      {/* <Quote /> */}
      <Service />
      {/* <Ourstorysection/>  */}
      <Cards />
      <Story />
      <Clients />
      <Technologies />
      <InsightSection />
      <FaqSection />
      {/* <HomeserviceSection/> */}
      {/* <Connect /> */}
      <Footer show={true} />
    </>
  )
}
