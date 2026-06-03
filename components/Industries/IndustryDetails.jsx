"use client"
import React, { useEffect, useState } from 'react'
import DetailBanner from '../Services/DetailBanner'
import { digitalMarketing, industries } from '@/testData'
import Cards from '../Works/Cards'
import { get } from '@/helpers/api'
import { API_URL } from '@/config'

const IndustryDetails = ({slug}) => {

    const [data, setData] = useState({})

    useEffect(()=>{
        fetchIndustryDetails()
        // let value = industries.filter((item)=> item.slug == slug)
        // setData(value[0])
    },[])

    const fetchIndustryDetails = async() =>{
        let response = await get(`${API_URL}industries/single/${slug}`)

        if(response.success){
            let data = response.data
            setData(data)
        }
    } 
    return (
        <>
            <DetailBanner content={data?.name} />
            <div className='min-h-screen details'>
                {
                    data?.desc ?
                        <div className='cmpad sec1 py-10  part1 light-grey'>
                            <div className="text-center p-5 flex items-center">
                                <h2>
                                    {data?.desc}
                                </h2>
                            </div>
                        </div>
                        : ""
                }
                {
                    data?.content ?
                        <div className='sec3 cmpad min-h-screen py-5 '>
                            <div className=" p-5">
                                <p className='' dangerouslySetInnerHTML={{
                                    __html:data?.content
                                }}> 
                                </p>
                            </div>
                        </div>
                        : ""
                }
                <div className="sec7 min-h-screen relative bg-white" style={{ zIndex: "30", top: 0 }}>
                    <Cards />
                </div>
            </div>
        </>
    )
}

export default IndustryDetails