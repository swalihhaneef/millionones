import React from 'react'
import Banner from '@/components/Services/Banner'
import SeviceSection from '@/components/Services/SeviceSection'
import Clients from '@/components/Clients'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/common/ScrollToTop'
const page = async() => {
  
  let bannerContent = "We craft solutions like puzzle pieces-tailor-made"

  return (
    <>
      <Banner content={bannerContent} />
      <SeviceSection />
      <Clients />
      <Footer show={true} />
    </>
  )
}

export default page