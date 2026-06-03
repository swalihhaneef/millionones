"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion'
import RelatedWorks from './RelatedWorks';
import { useSearchParams } from 'next/navigation';
import { get } from '@/helpers/api';
import { BASE_URL } from '@/config';

export default function CampaignPage({ data, slug }) {

  return (
    <article className="cmpad">
      <div className="flex flex-col md:flex-row justify-between mb-8 gap-6 mt-48 md:mt-72">
        <div className="flex-1">
          <h4 className="uppercase thin-heading text-sm mb-1 md:mb-2">Client</h4>
          <p>{data.client}</p>
        </div>
        <div className="flex-1">
          <h4 className="uppercase thin-heading text-sm mb-1 md:mb-2">Services</h4>
          <p>{data.service}</p>
        </div>
        <div className="flex-1">
          <h4 className="uppercase thin-heading text-sm mb-1 md:mb-2">Category</h4>
          <p>{data?.category?.name}</p>
        </div>
      </div>

      <hr className="border-t border-gray-400 my-8" />

      <h2 className="text-4xl sm:text-5xl md:text-6xl font-thin thin-heading leading-tight mb-8">
        {data.heading}
      </h2>

      <section className="my-20">

        {data?.details?.map((item, index) => (
          <>
            <div key={index} className="flex flex-col md:flex-row justify-between mb-8">
              <div className="md:flex-[0_0_300px] mr-8 mb-4 md:mb-0">
                <h2 className="text-xl font-normal font-geist thin-heading mb-4">{item.title}</h2>
              </div>
              <div className="flex-[0.6]">
                <div className="text-md thin-heading font-extralight leading-7">
                  <p className="mb-4">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
            {item?.img ? (
              <>
                <div className="mb-20">
                  <img
                    alt="Two-Week Campaign"
                    src={`${BASE_URL}/${item.img}`}
                    width={800}
                    height={400}
                    className="rounded-lg w-full max-h-[750px] object-cover"
                  />
                </div>
              </>
            ) : null}


          </>
        ))}

      </section>

      <hr className="border-t border-gray-400 my-8" />


      <div className="mt-8">
        <h2 className="text-2xl sm:text-3xl font-normal font-geist thin-heading leading-9  my-5">Conclusion</h2>
        <div className="prose" style={{ minWidth: "100%" }}
          dangerouslySetInnerHTML={{ __html: data.conclusion }}
        >

        </div>
      </div>

      <hr className="border-t border-gray-400 mt-12" />
      <RelatedWorks category={data?.category?._id} />
    </article>
  );
}
