"use client"
import React from 'react'
import VideoPlayer from './common/VedioPlayer'

const Connect = () => {
  return (
    <>
      <div className='slider' style={{padding:0,backgroundColor:"#d0d0d0"}}>
        <div className='relative w-full h-full'>
          {/* <div className='flex'> */}
            <div className='contact-vedio'>
              <div className="max-h-screen overflow-hidden">
                <VideoPlayer vedio="/vedios/connectAnim.MP4" onReady={true} />
              </div>
            </div>
            <div className='contact-content '>
              <div className='contact'>
                <h1 className='mb-7'>
                  Let’s Thrive <strong>Creatively</strong> together   
                </h1>
                <button>
                  Get in Touch
                </button>
                <div className='connect mt-4 hidden'>
                  <div className='w-full  flex items-center gap-2'>
                    <p className='line w-1/5'></p>
                    <p className='w-auto'>Connect with Us..!</p>
                    <p className='line w-1/5'></p>
                  </div>
                  <ul className='social w-full'>
                    <li>
                      <a href=''>
                        <img src='/icons/call.svg' alt='' /> <span>Call us</span>
                      </a>
                    </li>
                    <li>
                      <a href=''>
                        <img src='/icons/mail.svg' alt='' /> <span>Mail us</span>
                      </a>
                    </li>
                    <li>
                      <a href=''>
                        <img src='/icons/linkedIn.svg' alt='' />
                      </a>
                    </li>
                    <li>
                      <a href=''>
                        <img src='/icons/instagram.svg' alt='' />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          {/* </div> */}
        </div>
      </div>
    </>
  )
}

export default Connect
