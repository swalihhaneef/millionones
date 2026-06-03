import Footer from '@/components/Footer'
import Detail from '@/components/Aisection/Details'
import React from 'react'
import { API_URL } from '@/config'

const page = async ({ params }) => {

    let { slug } = await params

    const getServiceDetails = async () => {
        try {
            const response = await fetch(`${API_URL}service/single/${slug}`).then((res) => res.json());

            return response.data;
        } catch (error) {
            console.log("Error fetching careers:", error.message);
        }
    };

    const data = await getServiceDetails()

    return (
        <>
            <Detail slug={slug} details={data}/>
            <Footer show={false} />
        </>
    )
}

export default page