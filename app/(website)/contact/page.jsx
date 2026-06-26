import Footer from "@/components/Footer";
import ContactForm from "./_comonents/Form";
import { setMetaTitleAndDesc } from "@/helpers/functions";

export const metadata = setMetaTitleAndDesc(
  "Contact Millionones | AI, Digital Marketing & Web Solutions Kerala",
  "Get in touch with Millionones for AI solutions, digital marketing, web design, branding, and web development services in Kerala. Let’s grow your business."
);
const page = () => {
  return (
    <>
      <main className="page-main">
        <div className="hero is-contact">
          <div className="w-layout-blockcontainer container w-container">
            <div className="hero-wrapper is-contact">
              <div className="contact-left">
                <div className="contact-head">
                  <div className="text-16">
                    Have a question or need a web solution? I’d love to hear from you! Reach out, and let’s discuss how we can bring your ideas to
                    life.
                  </div>
                  <h1 className="h1 is-80">Get in Touch!</h1>
                </div>
                <div className="contact-info">
                  <div className="contact-item">
                    <div className="text-16 is-info lh-180">Contact Us :</div>
                    <div className="flex flex-col sm:flex-row gap-4 md:gap-10">
                      <a href="mailto:mail@millionones.in?subject=Millionones%20Inquiry" className="contact-item-wrap w-inline-block">
                        <div className="contact-img-wrap">
                          <img src="/icons/mail-modi.svg" loading="lazy" alt="" />
                        </div>
                        <div className="contact-item-detail">
                          <div className="text-16 medium is-info">Email</div>
                          <div className="text-16 is-info lh-180">mail@millionones.in</div>
                        </div>
                      </a>
                      <a href="tel:+919562052148" className="contact-item-wrap w-inline-block">
                        <div className="contact-img-wrap">
                          <img src="/icons/call-modi.svg" loading="lazy" alt="" />
                        </div>
                        <div className="contact-item-detail">
                          <div className="text-16 medium is-info">Mobile</div>
                          <div className="text-16 is-info lh-180">+91 9562052148</div>
                        </div>
                      </a>
                    </div>
                    <div className="flex">
                      <a
                        href="https://www.google.com/maps/dir//FIRST+FLOOR,+177%2F166F,+ALIYARHAJI+ROAD,+Edathala,+Aluva,+Kochi,+Kerala+683561/@10.075372,76.2887648,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3b0809858e7b2fa3:0x765506412d11dae!2m2!1d76.3711582!2d10.0753796?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        className="contact-item-wrap w-inline-block"
                        style={{ alignItems: "flex-start" }}>
                        <div className="contact-img-wrap" style={{ minWidth: "50px" }}>
                          <img src="/icons/location-modi.svg" loading="lazy" alt="" />
                        </div>
                        <div className="contact-item-detail">
                          <div className="text-16 medium is-info">View map</div>
                          <div className="text-16 is-info lh-180">MILLIONONES - Digital Marketing Agency</div>
                          <div className="text-16 is-info lh-180">FIRST FLOOR, 177/166F, ALIYARHAJI ROAD, Edathala, Aluva, Kochi, Kerala 683561</div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div id="Inquiry-form" className="contact-block w-form">
                <ContactForm />
                {/* <div className="w-form-done" tabindex="-1" role="region" aria-label="Inquiry-form success">
                  <div>Thank you! Your submission has been received!</div>
                </div>
                <div id="error-message" className="w-form-fail" tabindex="-1" role="region" aria-label="Inquiry-form failure">
                  <div>Oops! Something went wrong while submitting the form.</div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer show={false} />
    </>
  );
};

export default page;
