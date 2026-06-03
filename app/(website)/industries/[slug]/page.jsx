import Clients from '@/components/Clients'
import Footer from '@/components/Footer'
import InsightSection from '@/components/Home/Insight'
import IndustryDetails from '@/components/Industries/IndustryDetails'
import React from 'react'

const page = async ({ params }) => {

    let { slug } = await params
    
    return (
        <>
            <IndustryDetails slug={slug}/>
            <Clients />
            <InsightSection />
            <Footer show={true} />
        </>
    )
}

export default page