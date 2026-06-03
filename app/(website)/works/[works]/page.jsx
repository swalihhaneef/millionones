import React from 'react'
import WorksDetails from '@/components/Works/WorksDetails'
import Footer from '@/components/Footer'
import { get } from '@/helpers/api';
async function getWorkDetails(slug) {
  const res = await get(`works/single/${slug}`);

 return res.data
}
const page = async ({ params }) => {
  const { works: slug } = params;

  const data = await getWorkDetails(slug);

  return (
    <>
      <WorksDetails data={data} slug={slug} />
      <Footer show={true} />

    </>
  )
}

export default page