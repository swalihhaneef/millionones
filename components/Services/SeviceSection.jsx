"use client";
import { useEffect, useRef, useState } from "react";
import AnimatedText from "../AnimatedText";
import Link from "next/link";
import { API_URL, BASE_URL } from "@/config";
import { get } from "@/helpers/api";
const SeviceSection = () => {

  const [services, setServices] = useState([])
  const headRef = useRef(null)

  useEffect(() => {
    getServices()
  }, [])

  useEffect(() => {
    headRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }, [])

  const classes = ["one", "two", "three", "four"]

  const defaultImg = "https://cdn.prod.website-files.com/67494655115913dcaef11a1f/677654749782893e83c577ed_Slide%2016_9%20-%2018.avif"

  const getServices = async () => {
    let response = await get(`${API_URL}service/web?page=${1}&limit=${100}`)
    if ( response.success ) {
      const grouped = [];
      let data = response.data
      data.forEach(item => {
        const categoryName = item.category?.name ?? "Uncategorized";
        const categoryOrder = item.category?.order ?? 0;
        const decs = item?.category?.desc ?? "";
        const img = item?.category?.image ?? "";
        const brands = item?.category?.brands ?? [];
        let group = grouped.find(g => g.category === categoryName);
        
        if (!group) {
          group = {
            category: categoryName,
            order: categoryOrder,
            decs,
            img,
            brands,
            service: []
          };
          grouped.push(group);
        }

        group.service.push(item);
      });

      // Sort by category.order (ascending)
      const result = grouped.sort((a, b) => a.order - b.order)
        .map(({ order, ...rest }) => rest); // remove `order` key from final output

      setServices(result);
    }
  }
  return (
    <>
      <div ref={headRef}></div>
      <div className="frame is-service">
        {
          services?.map((item, index) => {
            return (
              <div className={`section-frame is-${classes[index]} ${index > 0 ? "is-service" : ""}`}>
                <div className="spacer"></div>
                <section id="branding" className="section is-sticky bottom">
                  <div className="w-layout-blockcontainer container w-container">
                    <div className="outer-service-wrap">
                      <div className="service-wrap">
                        <div className="service-left">
                          <div className="service-head second">
                            <div className="text-number text-16">( 0{index + 1} )</div>
                            <img
                              src={item?.img?.length > 0 ? `${BASE_URL}${item?.img}` : defaultImg}
                              loading="lazy"
                              sizes="(max-width: 479px) 93vw, (max-width: 767px) 96vw, (max-width: 991px) 94vw, (max-width: 1919px) 22vw, 320px"
                              srcSet={item?.img?.length > 0 ? `${BASE_URL}${item?.img}` : defaultImg}
                              alt=""
                              className="service-img second branding-img"
                              style={{ display: 'block' }}
                            />
                          </div>
                          <div className="text-16 is-grey">{item?.decs}</div>
                        </div>
                        <div className="service-right">
                          <div className="text-wrapper mw-547">
                            <h2 scrub-each-word="" text-split="" className="h2 is-80">
                              <AnimatedText text={item?.category} animation={"opacity-text"} />
                            </h2>
                          </div>
                          <div className="service-content">
                            {
                              item?.service?.map((field, idx) => {
                                return (
                                  <div
                                    className="service-item-2 branding"
                                    style={{ opacity: 1, transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)', transformStyle: 'preserve-3d' }}
                                  >
                                    <div className="text-16">{field.name}</div>
                                    <div className="service-bg white"></div>
                                    {field?.slug && <Link href={`services/${field?.slug}`} className="absolute inset-0"></Link>}
                                  </div>
                                )
                              })
                            }
                          </div>
                        </div>
                      </div>
                      <div className="work-content">
                        {
                          item.brands.map((img, idx) => {
                            return (
                              <div
                                className="work-item"
                                style={{ opacity: 1, transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)', transformStyle: 'preserve-3d' }}
                              >
                                <div className="work-link w-inline-block">
                                  <div className="work-img-wrap">
                                    <img
                                      src={`${BASE_URL}${img}`}
                                      loading="lazy"
                                      sizes="(max-width: 479px) 98vw, (max-width: 767px) 100vw, (max-width: 991px) 48vw, (max-width: 1919px) 23vw, 26vw"
                                      srcSet={`${BASE_URL}${item?.img}`}
                                      alt=""
                                      className="work-img"
                                      style={{ transform: 'scale(1.05, 1.05)' }}
                                    />
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default SeviceSection
