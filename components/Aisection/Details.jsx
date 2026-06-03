

"use client"
import React, { useEffect, useRef } from 'react'
import { useState } from "react";
import DetailBanner from '@/components/Services/DetailBanner';
import FlippingCards from '../FlippingCards';
import Cards from '../Works/Cards';
import InsightSection from '../Home/Insight';
import { details1, details2, aiSolutions } from '@/testData';
import FaqSection from './FaqSection';
import { useSearchParams } from 'next/navigation';
import { cleanObj } from '@/helpers/functions';
import Link from 'next/link';

const Detail = ({ slug, details }) => {
const [data, setData] = useState({})
  const headRef = useRef(null)

  useEffect(() => {
    if (details) {
      setData(cleanObj(details))
    }
  }, [details])

  useEffect(() => {
    headRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }, [])

  return (
    <>
     <div ref={headRef}></div>
      <DetailBanner content={data?.name} />
      <div className='min-h-screen details'>
        <div className="">
          {
            data.sec1 ?
              <div className='cmpad sec1 py-10  part1 light-grey'>
                <div className="md:w-1/2 p-5">
                  <h1>
                    {data?.sec1?.title}
                  </h1>
                </div>
                <div className="md:w-1/2 p-5 flex items-center">
                  <p>{data?.sec1?.content}</p>
                </div>
              </div>
              : ""
          }
          {data?.sec2 ?
            <div className="sec2 ">
              <FlippingCards content={data?.sec2} />
            </div>
            : ""
          }
          {data?.sec3 ?
            <div className='sec3 cmpad min-h-screen py-5 '>
              <div className=" p-5">
                <h1 className=' py-4'>
                  {data?.sec3?.title}
                </h1>
                <p className=''>{data?.sec3?.content} </p>
              </div>
            </div>
            : ""
          }
          <div className="sec4 construct-wrap large-pad-top large-pad-bottom ">
            <div className='cmpad '>
              <div className="main-title bmarg-2">
                <h2 className="hd-2 bmarg-half">
                  {data?.sec4?.title}
                </h2>
              </div>
              <div className="construct-list medium-tpad-half">
                {
                  data?.sec4?.contents.map((item, index) => (
                    <div className="construct-item bpad-2 bmarg-2">
                      <div className="title">
                        <span className="hd-display red-line text-bold">{index + 1}</span>
                        <span className="red-line-horizontal"></span>
                        <h3 className="hd-4 bmarg-0 large-tpad-1">
                          {item?.title}</h3>
                      </div>
                      <div className="content">
                        <p className="bmarg-0">{item?.content}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>

          </div>
          <div className="sec5 construct-wrap2 large-pad-top large-pad-bottom">
            <div className='cmpad '>
              <div className="main-title bmarg-2">
                <h2 className="hd-2 bmarg-half">{data?.sec5?.title}</h2>
              </div>
              <div className="construct-list medium-tpad-half">
                {
                  data?.sec5?.content?.map((item, index) => (
                    <div className="construct-item bpad-2 bmarg-2">
                      <div className="title">
                        <h3 className="hd-4 bmarg-0 large-tpad-1">{item?.title}</h3>
                      </div>
                      <div className="content">
                        <p className="bmarg-0">{item?.content}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <section id="sec6 hatypo3d-section" className="section is-full is-dark _3d relative " style={{ zIndex: "30" }}>
            <div className="w-layout-blockcontainer  w-container">
              <div className="cta-wrapper">
                <div className="cta-head">
                  <div className="tittle text-18">Have any questions?</div>
                  <div className="heading">
                    <h2 className="h2 is-80 is-cta">
                      {data?.sec6?.title}
                    </h2>
                  </div>
                </div>
                <div className="cta-contact">
                  <div className="cta-text text-20">{data?.sec6?.content}</div>
                  <Link href="/contact" className="btn w-inline-block">
                    <div className="btn-text-wrap">
                      <div className="btn-text text-18" >Book a Call</div>
                      <div className="btn-text text-18 absolute" >Book a Call</div>
                    </div>
                    <div className="btn-icon-wrapper is-58">
                      <div className="btn-icon-block">
                        <img loading="lazy" src="https://cdn.prod.website-files.com/67494655115913dcaef11a1f/67494d56a000598d086a4010_Icon%20Hatypo.svg" alt="" className="btn-icon is-26" />
                        <img loading="lazy" src="https://cdn.prod.website-files.com/67494655115913dcaef11a1f/67494d56a000598d086a4010_Icon%20Hatypo.svg" alt="" className="btn-icon is-26 absolute" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <div className="sec7 min-h-screen relative bg-white" style={{ zIndex: "30", top: 0 }}>
            <Cards />
          </div>
          {data?.faq ?
            <div className='sec8 cmpad min-h-screen py-10 flex justify-center items-center light-grey  relative' style={{ top: 0, zIndex: "30" }}>
              <div className='w-3/4 py-5'>
                <h3 className='py-4 '>Frequently Asked Questions </h3>
                <div>
                  <FaqSection data={data?.faq} />
                </div>
              </div>
            </div>
            : ""}
          <div className="sec9">
            <InsightSection />
          </div>
        </div>

      </div>
    </>
  )
}

export default Detail
