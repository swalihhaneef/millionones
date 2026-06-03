import Footer from '@/components/Footer'
import ServiceDetail from '@/components/Services/Details'
import { API_URL } from '@/config'
import React from 'react'

const page = async ({ params }) => {

    let { service } = await params

    const getServiceDetails = async () => {
        try {
            const response = await fetch(`${API_URL}service/single/${service}`).then((res) => res.json());

            return response.data;
        } catch (error) {
            console.log("Error fetching careers:", error.message);
        }
    };

    const data = await getServiceDetails()
    return (
        <>
            <ServiceDetail slug={service} details={data}/>
            <Footer show={false} />
        </>
    )
}

export default page