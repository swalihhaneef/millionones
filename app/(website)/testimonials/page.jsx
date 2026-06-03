import React from 'react'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'
import { setMetaTitleAndDesc } from '@/helpers/functions';

export const metadata = setMetaTitleAndDesc(
  "Client Testimonials | Horatio Kerala",
  "Hear from our clients! Discover how Horatio’s AI, digital marketing, web design, and branding solutions have delivered measurable results for businesses."
);


const page = () => {
    return (
        <>
        
            <Testimonials />
            <Footer show={true} />
        </>
    )
}

export default page