import { asyncErrorHandler, Error, Response } from "express-error-catcher";
import model from "../model/index.js";
import { counter, currentDate, currentTime, generatePermalink, isValidObjectId, paginationParams, unwantedFields } from "../helper/functions.js";

export const create = asyncErrorHandler(async (req) => {
    const { name, sec1, sec2, sec3, sec4, sec5, sec6, faq, category } = req.body;

    if (isNull(name && category)) throw new Error("name and category are required", 412);

    const slug = generatePermalink(name);

    const exists = await model.Service.findOne({ $or: [{ name }, { slug }] });

    if (exists) throw new Error(`${exists.name} already exists.`);

    const data = await new model.Service({
        name,
        slug,
        sec1,
        sec2,
        sec3,
        sec4,
        sec5,
        sec6,
        faq,
        category,
        addedBy: req.user._id,
    }).save();

    return new Response("service added successfully", { data }, 200);
});

export const update = asyncErrorHandler(async (req) => {
    const { id, name, sec1 = {}, sec2 = [], sec3 = {}, sec4 = {}, sec5 = {}, sec6 = {}, faq = [], category } = req.body;

    if (isNull(id)) throw new Error("Service Id is required");

    const slug = generatePermalink(name);

    const exists = await model.Service.findOne({ _id: { $ne: id }, $or: [{ name }, { slug }] });

    if (exists) throw new Error(`${exists.name} already exists.`);

    const data = await model.Service.findByIdAndUpdate(id, {
        name,
        slug,
        sec1,
        sec2,
        sec3,
        sec4,
        sec5,
        sec6,
        faq,
        category,
        updateBy: req.user._id,
        upDate: currentDate(),
        upTime: currentTime(),
    });

    return new Response("service updated successfully", { data }, 200);
});

export const list = asyncErrorHandler(async (req) => {
    const { category } = req.query;

    const { skip, limit } = paginationParams(req.query);

    const query = { status: 0 };

    if (!isNull(category)) query.category = category;

    const data = await model.Service.find(query).sort({ _id: -1 }).skip(skip).limit(limit).select(unwantedFields()).lean();

    return new Response("success", { data }, 200);
});

export const webList = asyncErrorHandler(async (req) => {
    const { category, type } = req.query;

    const { skip, limit } = paginationParams(req.query);

    const query = { status: 0 };

    if (!isNull(category)) query.category = category;

    if (!isNull(type) && type == 2) {
        query.category = { $eq: '685189f1e517e36792f86536' }
    } else {
        query.category = { $ne: '685189f1e517e36792f86536' }
    }

    const data = await model.Service.find(query).skip(skip).limit(limit).select(`name slug description`).populate("category", "name order desc image brands").lean();

    return new Response("success", { data }, 200);
});

export const details = asyncErrorHandler(async (req) => {
    const id = req.params.id;

    const query = { status: 0 };

    if (isValidObjectId(id)) query._id = id;
    else query.slug = id;

    const data = await model.Service.findOne(query);

    if (!data) throw new Error("Data not found", 404);

    return new Response("success", { data }, 200);
});

export const deleteService = asyncErrorHandler(async (req) => {
    await model.Service.updateOne({ _id: req.params.id }, { status: 1 });

    return new Response("Service deleted successfully", null, 200);
});


const addService = async (data) => {
    for (let index = 0; index < data.length; index++) {
        const { name, sec1, sec2, sec3, sec4, sec5, sec6, faq, category,description } = data[index];

        const slug = generatePermalink(name);
        const exists = await model.Service.findOne({ $or: [{ name }, { slug }] });

        if (exists) throw new Error(`${exists.name} already exists.`);
        const newdata = await new model.Service({
            name,
            slug,
            description,
            sec1,
            sec2,
            sec3,
            sec4,
            sec5,
            sec6,
            faq,
            category: "685189f1e517e36792f86536",
            addedBy: "67f68da725e8a4bc964a7a1d",
        }).save();
        console.log(`update ${newdata.name} of ${index}`)
    }
    console.log('finished')
}

const aiSolutions = [
    // ai strategy
    {
        name: "AI Strategy",
        slug: "ai-strategy",
        description:'Develop customized AI strategies to optimize business operations, enhance efficiency, and drive growth.',
        sec1: {
            title: "Innovative AI Solutions Company in Kochi",
            content: "When it comes to navigating the fast-moving world of tech, finding the right AI strategy consulting can feel a bit overwhelming. Some companies promise innovation, but few actually deliver. We've seen businesses thrive when guided with the right blend of AI tools and realistic strategy, not just flashy terms, but solutions that actually solve. That’s where Horatio comes. As the trusted AI Solutions Company in Kochi, we specialise in cutting-edge AI strategy.  Let’s build your AI roadmap together."
        },
        // sec3: {
        //     title: "Corporate Branding & Identity Solutions For Your Business",
        //     content: `We have all heard that the first impression always determines the long-term connection. When it comes to the branding package, branding elements like logos, graphic elements, visiting cards, etc. will come under this first impression. If it is done well, it will attract your potential audience and later become your loyal customer. At Horatio, we offer your business the best corporate branding and identity solutions.`
        // },
        sec4: {
            title: "How Our AI Strategy Consulting in Kochi Helps Businesses Scale Smarter",
            contents: [
                {
                    title: "AI Readiness Assessment",
                    content: "Before diving into AI, it helps to know where you stand. Our AI readiness assessment service isn’t just a checklist—it’s a conversation. We examine your systems, company culture, and strategic goals. As part of our AI strategy consulting in Kochi, we help businesses evaluate if they’re truly ready or if foundational work is needed first."
                },
                {
                    title: "Data Strategy & Governance",
                    content: "Data isn’t just numbers—it’s potential. Without structure, it becomes chaos. Our business AI strategy services focus on crafting data strategy and governance frameworks that are both adaptable and reliable. It’s not about control—it’s about making data usable, understandable, and valuable."
                },
                {
                    title: "AI Roadmap Development",
                    content: "Jumping in without a plan isn’t ideal. We specialize in AI roadmap development in Kerala, guiding businesses to build smart, achievable strategies. Our AI implementation planning service focuses on practical goals and building systems that are right—not just big."
                },
                {
                    title: "Use Case Discovery Workshops",
                    content: "Great AI ideas often come from unexpected places. Our use case discovery workshops are explorative and collaborative, helping teams identify where AI can truly help—not just where it sounds trendy. It’s a key part of our realistic and grounded AI strategy consulting approach."
                },
                {
                    title: "ROI Forecasting & Impact Analysis",
                    content: "It’s one thing to build AI, another to measure its success. Through ROI forecasting and impact analysis, we provide clarity on whether your AI investments are delivering value. This is what effective business AI strategy services should offer—measurable impact."
                },
                {
                    title: "AI Model Evaluation & Selection",
                    content: "Choosing the right AI model is more than a technical decision—it’s strategic. Through our AI strategy consulting in Kochi, we help evaluate and select models that truly align with your operations. It’s about what fits, not just what’s trending—because a poor fit is wasted effort."
                }
            ]


        },
        sec5: {
            title: "Discover Why We're the Leading AI Strategy Partner",
            content: [
                {
                    title: "Enhanced Operational Efficiency",
                    content: "AI helps automate repetitive tasks and streamline processes, reducing errors and boosting productivity. With our AI strategy consulting in Kochi, we help businesses implement AI solutions that improve operational efficiency, save time, and increase output while ensuring optimal performance."
                },
                {
                    title: "Cost Reduction",
                    content: "By automating tasks and optimizing processes, AI can significantly reduce operational costs. Our AI roadmap development in Kerala focuses on using AI to eliminate inefficiencies, ensuring that businesses cut down on unnecessary expenses while improving overall resource allocation."
                },
                {
                    title: "Competitive Advantage",
                    content: "AI-driven insights offer a competitive edge by helping businesses stay ahead of market trends. With our Business AI strategy services, we guide companies to implement AI solutions that adapt quickly to evolving market conditions, ensuring long-term competitiveness and innovation."
                },
                {
                    title: "Risk Mitigation",
                    content: "AI can proactively identify potential risks and help mitigate them, including cybersecurity threats or supply chain disruptions. Our AI implementation planning in Kochi equips businesses with the tools to monitor and manage risks effectively, ensuring smoother operations."
                },
                {
                    title: "Improved Customer Experience",
                    content: "AI-powered tools, like chatbots and personalized recommendations, enhance the customer journey. Through our AI strategy consulting in Kochi, we help businesses improve customer engagement, providing personalized services that increase customer satisfaction and loyalty."
                },
                {
                    title: "Innovation & New Product Development",
                    content: "AI uncovers new market opportunities and accelerates product development. With our AI roadmap development in Kerala, businesses can leverage AI to innovate faster, discover new trends, and create products that meet emerging customer demands for sustainable growth."
                }
            ]

        },
        sec6: {
            title: "Get a Free Consultation Today!",
            content: `Is your business ready to embrace AI but unsure where to start? At Horatio, we specialize in AI strategy solutions that are tailored to your needs. Our experts in Kochi work closely with you to identify opportunities, create an effective AI roadmap, and implement solutions that drive real results. Get your free consultation today and start your journey toward smarter, AI-driven success!`
        },
        // faq: [
        //     {
        //         question: "How does Horatio ensure consistency in brand messaging across all marketing channels?",
        //         answer: "Horatio ensures consistency in brand messaging across all marketing channels by establishing clear brand guidelines, maintaining a unified content strategy, and connecting messaging across platforms. Through strong internal communication, content approval processes, and data-driven refinements, Horatio ensures that every touchpoint—whether social media, email, website, or offline campaigns—delivers a unified and impactful brand experience."
        //     },
        //     {
        //         question: "What will be included in Horatio's branding package?",
        //         answer: "Horatio's branding package will include a Logo, Colour, Typography, Graphic Elements, Visiting Card, Envelopes, Letterhead, Name Board, Id Card, and Website Design Idea."
        //     },
        //     {
        //         question: "Why is a branding package important for my business?",
        //         answer: "A branding package ensures consistency across all marketing channels, builds brand recognition, and helps establish trust with your audience. With a well-defined brand identity, your business can stand out from competitors, create a lasting impression, and drive customer loyalty."
        //     },
        //     {
        //         question: "How does Horatio customize branding packages for different businesses?",
        //         answer: "Horatio creates branding packages by understanding each business's unique vision, target audience, and industry trends. Through in-depth research and collaboration, they craft a brand identity that aligns with the company's goals, ensuring a distinctive and impactful presence in the market."
        //     }
        // ]

    },
    //ai marketing
    {
        name: "AI Marketing Solutions",
        slug: "ai-marketing-solutions",
        description: 'Leverage AI-driven marketing automation, predictive analytics, and customer insights to improve engagement and conversions.',
        sec1: {
            title: "AI Marketing Solutions Kochi That Actually Work",
            content: "It’s easy to feel overwhelmed by ever-changing marketing trends. But the fact is, data alone doesn’t bring growth—smart use of it does. That’s where our AI marketing solutions in Kochi come in. We help businesses understand their audience better, automate smarter, and engage more meaningfully. It's not just marketing; it's a strategy powered by AI.  Let’s start building your smarter campaign today."
        },
        // sec3: {
        //     title: "Corporate Branding & Identity Solutions For Your Business",
        //     content: `We have all heard that the first impression always determines the long-term connection. When it comes to the branding package, branding elements like logos, graphic elements, visiting cards, etc. will come under this first impression. If it is done well, it will attract your potential audience and later become your loyal customer. At Horatio, we offer your business the best corporate branding and identity solutions.`
        // },
        sec4: {
            title: "What Our AI Marketing Solutions in Kochi Can Do for You",
            contents: [
                {
                    title: "Predictive Customer Analytics",
                    content: "Make smarter decisions before they even need to be made. With predictive marketing AI solutions, we help you forecast customer behaviour and trends. Our skilled team uses AI for digital marketing to uncover patterns that often go unnoticed. It's not about guessing anymore—it’s about knowing what’s likely to happen and preparing for it, with strategy, not assumption."
                },
                {
                    title: "Automated Ad Campaign Optimization",
                    content: "Running ads is easy. Running ads that work? That’s where AI-driven marketing campaigns come in. We use advanced tools to test, tweak, and improve your campaigns on the fly. Based in Kochi, we focus on delivering AI marketing solutions that not only reach the right people but also adjust dynamically to get better over time. It's almost like the ads learn from themselves."
                },
                {
                    title: "Sentiment Analysis & Brand Monitoring",
                    content: "Sometimes, it’s not what people say, but the way they say it. Our sentiment analysis tools filter through reviews, social mentions, and feedback to give you a clearer sense of how people feel about your brand. If you're working on brand, our AI for digital marketing can spot both risks and opportunities early, before they grow into bigger issues."
                },
                {
                    title: "AI Chatbots & Conversational Marketing",
                    content: "Not every customer wants to wait for answers. Our AI chatbots keep conversations going even when your team’s offline. From basic queries to lead qualification, these tools handle the routine—so your people can focus on what really matters. It's one way AI marketing solutions are reshaping customer experience with smart, responsive engagement that feels…well, almost human."
                },
                {
                    title: "Personalized Content Generation",
                    content: "Everyone says “personalization” matters—but doing it right takes more than just a name in an email. Our AI tools create content tailored to real behaviors, preferences, and optimal timing. Whether it’s product suggestions or dynamic website content, personalisation with AI has never felt this intuitive. It’s not magic—it just feels that way to your customers."
                },
                {
                    title: "Customer Segmentation & Targeting",
                    content: "Mass marketing is over. Today, it’s about knowing who you're talking to—and why. With AI-driven segmentation, we divide your audience into groups that actually make sense. We don’t just guess who might buy; we use AI for digital marketing to find patterns, behavior cues, and intent signals. The result? Smarter targeting. Less waste. More impact."
                }
            ]
        },
        sec5: {
            title: "Why Choose Us for AI Marketing Solutions in Kerala",
            content: [
                {
                    title: "Practicality First",
                    content: "There’s a lot of going around AI right now, but not all of it translates into action. At Horatio, we believe AI marketing solutions should actually do something—boost ROI, cut down manual work, maybe even save a little sanity. Our goal? To take predictive marketing AI solutions from concept to something you see working, day-to-day."
                },
                {
                    title: "Local Insight",
                    content: "We’re not just a name on the internet. We live and work here. Kochi, Thrissur, Calicut—every local nuance matters. That’s why our AI for digital marketing in Kerala is built with regional insights at its core. Trends here don’t always follow global patterns, and we’re one of the few who actually adjust for that."
                },
                {
                    title: "Human-Centric",
                    content: "Numbers matter, sure. But so does instinct. We like to think of our process as equal parts logic and gut feel. That’s what makes our AI-driven marketing campaigns different—they’re not just optimized; they feel right. There’s room for adjustment, discussion, even second thoughts. That's real strategy."
                },
                {
                    title: "Custom-Built AI Marketing Solutions",
                    content: "Every brand's a little different, right? So why would one-size-fit-all ever make sense here? We create custom AI marketing strategies designed specifically for your goals. Whether it's personalization with AI in Kerala markets or segmenting audiences more intuitively, we avoid the template trap—and that makes all the difference."
                },
                {
                    title: "Transparent Process",
                    content: "We won’t confuse you with AI speak. Honestly, we hate that too. Our team keeps things simple and collaborative. You’ll always know what’s happening behind the scenes of your campaign—from initial AI implementation to optimization. You don't need to be an AI expert to see the value we deliver."
                },
                {
                    title: "Measured Impact",
                    content: "We get it—everyone promises results. But with Horatio, you actually see them. Higher lead quality, better reach, sharper engagement—whatever the metric, our AI marketing solutions in Kochi are built to improve things you care about. No overhype. Just tools that work, tested in the real world."
                }
            ]
        },
        sec6: {
            title: "Curious about something? Unlock Smarter Growth Today!",
            content: `If your marketing feels like guesswork, you’re not alone. At Horatio, we offer practical AI marketing solutions that actually move the needle—think smarter targeting, predictive insights, and content that speaks to real people. Whether you're a local business in Kochi or scaling across Kerala, we help you work sharper, not harder. Let AI Reimagine Your Marketing Now!`
        },
        // faq: [
        //     {
        //         question: "How does Horatio ensure consistency in brand messaging across all marketing channels?",
        //         answer: "Horatio ensures consistency in brand messaging across all marketing channels by establishing clear brand guidelines, maintaining a unified content strategy, and connecting messaging across platforms. Through strong internal communication, content approval processes, and data-driven refinements, Horatio ensures that every touchpoint—whether social media, email, website, or offline campaigns—delivers a unified and impactful brand experience."
        //     },
        //     {
        //         question: "What will be included in Horatio's branding package?",
        //         answer: "Horatio's branding package will include a Logo, Colour, Typography, Graphic Elements, Visiting Card, Envelopes, Letterhead, Name Board, Id Card, and Website Design Idea."
        //     },
        //     {
        //         question: "Why is a branding package important for my business?",
        //         answer: "A branding package ensures consistency across all marketing channels, builds brand recognition, and helps establish trust with your audience. With a well-defined brand identity, your business can stand out from competitors, create a lasting impression, and drive customer loyalty."
        //     },
        //     {
        //         question: "How does Horatio customize branding packages for different businesses?",
        //         answer: "Horatio creates branding packages by understanding each business's unique vision, target audience, and industry trends. Through in-depth research and collaboration, they craft a brand identity that aligns with the company's goals, ensuring a distinctive and impactful presence in the market."
        //     }
        // ]

    },
    // ai-image-and-video-creation
    {
        name: "AI Image and Video Creation",
        slug: "ai-image-and-video-creation",
        description: 'Utilize AI-powered tools to generate, enhance, and optimize images and videos for branding, advertising, and content creation.',
        sec1: {
            title: "Expert AI video creation company in Kerala",
            content: "Visual content is changing fast—and AI is right at the center of it. At Horatio, we offer AI image generation services in Kochi that blend creativity with precision. Whether it's for branding, ads, or content, we help you produce visuals that stand out, without wasting time or budget."
        },
        // sec3: {
        //     title: "Corporate Branding & Identity Solutions For Your Business",
        //     content: `We have all heard that the first impression always determines the long-term connection. When it comes to the branding package, branding elements like logos, graphic elements, visiting cards, etc. will come under this first impression. If it is done well, it will attract your potential audience and later become your loyal customer. At Horatio, we offer your business the best corporate branding and identity solutions.`
        // },
        sec4: {
            title: "Your Go-To Partner for AI Image Generation Services in Kochi",
            contents: [
                {
                    title: "AI-Generated Product Photos & Mockups",
                    content: "Sometimes, getting the perfect product shot takes hours—maybe days. With our AI image generation services in Kochi, we create high-quality mockups and product visuals without the photoshoots. It’s fast, flexible, and feels incredibly real. From e-commerce to pitch decks, your visuals are handled with precision and creativity."
                },
                {
                    title: "Face & Object Recognition Editing",
                    content: "Precision editing used to be time-consuming. Not anymore. Our tools utilize generative AI visuals to edit or improve images based on facial features or objects—without compromising on authenticity. Whether it's refining portraits or removing distractions, the results are smooth and smart."
                },
                {
                    title: "Deepfake & Voiceover Generation (Ethical Use Only)",
                    content: "Used responsibly, deepfake tech and AI voiceovers can do wonders—like recreating brand stories or reanimating historical characters. As a trusted AI video creation company in Kerala, we ensure every project is ethical, transparent, and well-aligned with your goals. No gimmicks. Just powerful storytelling tools."
                },
                {
                    title: "AI-Powered Video Summarization",
                    content: "Nobody watches long videos anymore—unless they’re really good. Our AI content creation team in Kerala helps summarize hours of footage into meaningful, digestible clips. Perfect for newsrooms, marketing teams, or anyone with more content than time."
                },
                {
                    title: "Animated Content from Scripts",
                    content: "Got a script but no visuals? We turn that into motion. Using AI creative solutions from Kochi, we animate your ideas—whether it's explainer videos, social reels, or interactive stories. It’s fast, engaging, and way more affordable than traditional animation."
                },
                {
                    title: "Realistic Virtual Models for Ads",
                    content: "Forget the limitations of real-life casting. With our AI image generation services in Kochi, we design virtual models tailored to your brand—diverse, photorealistic, and ready for campaign rollouts. It’s inclusivity and creativity, blended through smart tech."
                }
            ]

        },
        sec5: {
            title: "Top Reasons to Choose Our AI Image & Video Services in Kochi",
            content: [
                {
                    title: "Custom Solutions",
                    content: "Every brand has a personality. That’s why we don’t rely on templates or recycled assets. Whether you're looking for product visuals, animated explainers, or something entirely different, we tailor our AI image generation services in Kochi to fit your voice. It’s not just smart—it feels personal, because that’s what connects with people."
                },
                {
                    title: "Speed & Precision",
                    content: "Sometimes, deadlines are brutal. We get it. Our workflows are designed to move fast without compromising clarity or quality. Whether you’re after high-volume AI video creation or just need a handful of generative AI visuals, we deliver on time—and make sure they hit the mark."
                },
                {
                    title: "Creative Intelligence",
                    content: "AI alone doesn’t make great content. It’s the blend of tech and taste that brings it alive. With years of creative grounding, we push AI content creation in Kerala to a point where visuals tell stories, not just fill space. The result? Assets that feel surprisingly human."
                },
                {
                    title: "Ethical Standards",
                    content: "Yes, we use deepfake and voiceover tools—but always with clear intent and consent. We believe in the ethical side of AI. That means no shortcuts, no grey areas. Just honest, transparent work, especially important when crafting AI creative solutions that people can trust."
                },
                {
                    title: "MultiFormat Capability",
                    content: "Need a video teaser, image mockup, and a set of reels? We’ve got you. From stills to animated sequences, our tech can flex across formats without losing consistency. Working with us means you’re not chasing three vendors—you’re partnering with one team who gets your entire visual ecosystem."
                },
                {
                    title: "Local Expertise",
                    content: "Being based in Kerala gives us a sharper sense of what actually connects with your audience. We’ve worked with brands that needed visuals to resonate here, not just globally. If you’re searching for an AI image generation service in Kochi or a reliable AI video creation company in Kerala, we speak the language—both culturally and creatively."
                }
            ]

        },
        sec6: {
            title: "GET A FREE CONSULTATION TODAY!",
            content: `Is your business looking to stand out with unique visual content? Look no further! At Horatio, we provide top-tier AI image and video creation services in Kochi. Our team blends cutting-edge AI technology with creative expertise to help you craft compelling visuals that captivate your audience. Contact us now for a FREE consultation and let’s bring your ideas to life!`
        },
    },
    // ai-user-experience-solutions
    {
        name: "AI User Experience Solutions",
        slug: "ai-user-experience-solutions",
        description: 'Enhance user interactions with AI-driven chatbots, voice assistants, and personalized recommendations for seamless experiences.',
        sec1: {
            title: "Best  AI UX solutions in Kochi",
            content: "When it comes to AI UX solutions in Kochi, there’s a shift happening. Interfaces feel less like machines and more like, well, conversations. It’s subtle—smart design guided by AI, adapting to how we think, not just how we click. Want to see it in action? Let’s talk."
        },
        // sec3: {
        //     title: "Corporate Branding & Identity Solutions For Your Business",
        //     content: `We have all heard that the first impression always determines the long-term connection. When it comes to the branding package, branding elements like logos, graphic elements, visiting cards, etc. will come under this first impression. If it is done well, it will attract your potential audience and later become your loyal customer. At Horatio, we offer your business the best corporate branding and identity solutions.`
        // },
        sec4: {
            title: "How Our AI UX Services Help Your Brand",
            contents: [
                {
                    title: "Smart UX Personalization Engines",
                    content: "It’s not just about showing users what you want them to see. It’s about gently adapting—responding in real time, maybe even predicting what they might need next. That’s the kind of thinking behind AI-driven user personalization. Not perfect, no. But when it works, it almost feels invisible, and that’s sort of the point."
                },
                {
                    title: "AI-Driven A/B Testing",
                    content: "Traditional A/B testing takes time. Weeks, sometimes. The truth is, we don't always have that kind of time. With AI for enhanced user experience, the iterations happen fast—automated, responsive, even self-correcting at times. Does it replace intuition? No. But it does give it a pretty solid assist. Like a very, very fast assistant who never sleeps."
                },
                {
                    title: "Chatbots with Natural Language Processing",
                    content: "Some days, you just want answers. Other times, you need to feel like someone’s actually listening—even if that “someone” is a chatbot. With natural language processing, bots get a little closer to sounding human. Not perfect, maybe not even close yet. Still, it’s changing how users engage online."
                },
                {
                    title: "Predictive User Behavior Modelling",
                    content: "You don’t always notice it, but behind the scenes, something is learning from what you do. And what you don’t do. Smart UX design with AI is less about control and more about prediction—subtle shifts based on past behavior. Sometimes it gets it wrong. But sometimes, it’s uncannily spot-on."
                },
                {
                    title: "Adaptive UI Design Elements",
                    content: "Ever tapped a button and thought, ‘Yep, that just made sense’? It’s often thanks to adaptive elements—UI that shifts based on user habits or environment. You wouldn’t necessarily know it’s AI at work. But it is. At least in more advanced setups and at Horatio, your trusted AI UX solutions in Kochi, we make it more common."
                },
                {
                    title: "AI for Accessibility Enhancement",
                    content: "This one hits closer to the heart. Accessibility isn’t an optional feature—it’s essential. AI can’t solve everything, but it helps fill some of the gaps. From real-time adjustments to personalized interfaces, it’s making the web feel a bit more human—or at least more fair."
                }
            ]
        },
        sec5: {
            title: "What Makes Our Smart UX Design with AI Stand Out",
            content: [
                {
                    title: "Adaptive Intelligence",
                    content: "Design isn’t static—and honestly, it shouldn’t be. Our approach uses adaptive intelligence to respond to real user behavior as it happens. So, instead of redesigning from scratch, your interface adjusts and improves in real time. With our AI UX solutions in Kochi evolving fast, we help you stay aligned with user needs, even when they shift unexpectedly. It’s smart, but also practical—and built to grow with you."
                },
                {
                    title: "Ethical Personalization",
                    content: "Personalization is often discussed, but it’s important to strike the right balance between being helpful and overstepping. We believe in AI-driven user personalization that feels natural—never forced. Think suggestions that make sense, not creepy over-targeting. It’s personalization that respects boundaries, which honestly, more users expect now. By combining ethics with intelligence, we create experiences that feel just right—for your brand and your audience."
                },
                {
                    title: "Actionable Insights",
                    content: "Data is everywhere. The hard part? Knowing what to do with it. That’s where we come in. Our smart UX design with AI doesn’t just collect numbers—it pulls out patterns that actually mean something. Patterns you can act on. You’ll begin to understand how users actually behave—not just what they claim to want. And that insight, small as it sounds, can make a huge difference in the way your platform performs."
                },
                {
                    title: "Efficient Testing",
                    content: "You shouldn't have to wait six weeks for A/B test results—and honestly, you don’t need to. With AI-driven tools, we help you test faster, adjust smarter, and move forward with confidence. It’s not about rushing; it’s about clarity. Whether it’s a button color or a full user flow, smart UX design with AI lets you experiment and learn without dragging your project down."
                },
                {
                    title: "Inclusive Design",
                    content: "It’s easy to overlook, but inclusive design is essential—especially when you want to reach everyone, not just the average user. We use AI for enhanced user experience in Kerala by adapting interfaces to diverse needs, whether that’s accessibility tools or responsive layouts that adjust intuitively. Inclusivity, in our view, isn’t a checkbox—it’s baked into how we think about UX from day one."
                },
                {
                    title: "Scalable Innovation",
                    content: "Growth is exciting—but also messy. What works for ten users might not work for ten thousand. That’s exactly why we build our solutions to scale effortlessly as your needs grow. We build flexible systems that adapt as your audience expands, no matter where your customers are located. So you’re not stuck rebuilding things later. You scale, and the experience scales with you—quietly, efficiently, and without surprises."
                }
            ]
        },
        sec6: {
            title: "Looking for answers? Get a Free Consultation Today!",
            content: `Is your digital experience falling short? Don’t worry! At Horatio, we specialize in AI-powered user experience solutions that transform your website into an intuitive, engaging platform. Our expert team works with you to personalize interactions, improve usability, and enhance overall user satisfaction. Book your free consultation today and discover how AI can truly transform the way users experience your brand.`
        },
        // faq: [
        //     {
        //         question: "How does Horatio ensure consistency in brand messaging across all marketing channels?",
        //         answer: "Horatio ensures consistency in brand messaging across all marketing channels by establishing clear brand guidelines, maintaining a unified content strategy, and connecting messaging across platforms. Through strong internal communication, content approval processes, and data-driven refinements, Horatio ensures that every touchpoint—whether social media, email, website, or offline campaigns—delivers a unified and impactful brand experience."
        //     },
        //     {
        //         question: "What will be included in Horatio's branding package?",
        //         answer: "Horatio's branding package will include a Logo, Colour, Typography, Graphic Elements, Visiting Card, Envelopes, Letterhead, Name Board, Id Card, and Website Design Idea."
        //     },
        //     {
        //         question: "Why is a branding package important for my business?",
        //         answer: "A branding package ensures consistency across all marketing channels, builds brand recognition, and helps establish trust with your audience. With a well-defined brand identity, your business can stand out from competitors, create a lasting impression, and drive customer loyalty."
        //     },
        //     {
        //         question: "How does Horatio customize branding packages for different businesses?",
        //         answer: "Horatio creates branding packages by understanding each business's unique vision, target audience, and industry trends. Through in-depth research and collaboration, they craft a brand identity that aligns with the company's goals, ensuring a distinctive and impactful presence in the market."
        //     }
        // ]

    },
    // ai-for-large-task-automation
    {
        name: "AI for Large Task Automation",
        slug: "ai-for-large-task-automation",
        description: 'Automate complex and repetitive workflows using AI-powered process automation to increase efficiency and reduce costs.',
        sec1: {
            title: "Leading AI Task Automation For Your Business",
            content: "Not every task needs human hands—some just need a smarter system. With AI task automation in Kochi, businesses are finally moving beyond tedious manual routines. From scheduling to data entry, we help you automate repetitive tasks with AI, freeing up time for what actually matters. It’s not just quicker—it’s more precise, more reliable, and perhaps, just perhaps, a bit less exhausting when the day’s done."
        },
        // sec3: {
        //     title: "Corporate Branding & Identity Solutions For Your Business",
        //     content: `We have all heard that the first impression always determines the long-term connection. When it comes to the branding package, branding elements like logos, graphic elements, visiting cards, etc. will come under this first impression. If it is done well, it will attract your potential audience and later become your loyal customer. At Horatio, we offer your business the best corporate branding and identity solutions.`
        // },
        sec4: {
            title: "Smarter Workflows with our AI Task Automation services in Kochi",
            contents: [
                {
                    title: "Document Processing & Data Extraction",
                    content: "We get it—digging through forms or PDFs just to extract a few data points is the kind of work that eats up your team's time. With our document processing and data extraction services, powered by AI task automation, we help you capture, organize, and route critical information with minimal human input. It’s not just faster—it reduces error, adds structure to chaos, and lets your team focus on decisions, not data entry."
                },
                {
                    title: "Workflow & Process Automation (RPA + AI)",
                    content: "When things run on autopilot—but intelligently—that’s where real efficiency starts. Our workflow and process automation service, which blends traditional RPA with AI, does more than just follow instructions. It learns, adapts, and evolves with your operations. Whether you're streamlining HR approvals or finance routing, we offer intelligent process automation in Kerala that flexes with your business, not against it. It’s like having a team that doesn’t take coffee breaks."
                },
                {
                    title: "Email Sorting & Autoreplies",
                    content: "Some emails need attention. Others? Not so much. Our email sorting and autoreply solution uses AI workflow automation services to filter, categorise, and—where appropriate—respond automatically. Think fewer missed queries, faster turnarounds, and inboxes that no longer feel like a black hole. It's not magic, it's machine learning tuned to your needs. You’ll spend less time sorting through emails and more time focusing on what truly matters with the ones that count."
                },
                {
                    title: "AI Based Scheduling Assistants",
                    content: "Coordinating calendars can take longer than the meetings themselves. That’s why our AI-based scheduling assistant works quietly behind the scenes, checking preferences, blocking conflicts, and suggesting slots—all while learning your habits over time. Backed by an AI task automation service helps you reclaim time from endless back-and-forth emails. And when things change (because they always do), the system adapts, reshuffling with minimal fuss."
                },
                {
                    title: "Automated Report Generation",
                    content: "Reports are necessary, sure. But they shouldn’t consume hours each week. Our automated report generation service uses AI to pull relevant data, structure it, and deliver insights that are easy to digest. Whether it’s sales metrics or operational summaries, we help automate repetitive tasks with AI so your reports are on time, every time, without the repetitive grind. You’ll wonder why you didn’t hand it off to a smart system sooner."
                },
                {
                    title: "AI-Based Fraud Detection or Compliance Checks",
                    content: "Fraud doesn’t wait, and compliance issues rarely announce themselves in advance. Our AI-based fraud detection and compliance check service monitors behaviour patterns, flags anomalies, and runs real-time checks—all without slowing your operations. With intelligent process automation in Kerala, you’re not just reacting to problems; you're staying one step ahead. The goal isn't just catching issues—it’s building trust in every transaction, every report, every click."
                }
            ]
        },
        sec5: {
            title: "Why Choose Our AI for Large Task Automation Solutions",
            content: [
                {
                    title: "Proven Expertise",
                    content: "At Horatio, we bring years of experience in AI task automation in Kochi, ensuring that every solution we offer is backed by proven expertise. Our team understands the complexities of large-scale automation and has successfully helped businesses streamline their processes with AI. We don’t just promise results—we deliver them."
                },
                {
                    title: "Flexible Automation",
                    content: "We understand that every business is unique, which is why our intelligent process automation Kerala solutions are designed to be flexible. Whether it's automating repetitive tasks with AI or customizing workflows to suit your needs, our solutions adapt to your business. Flexibility means we can scale with you as your business grows, ensuring continued efficiency."
                },
                {
                    title: "Seamless Integration",
                    content: "Integrating AI-driven solutions shouldn’t be complicated. With our AI workflow automation services, we ensure smooth and hassle-free integration with your existing systems. We make the transition as seamless as possible, so you don’t miss a beat in your daily operations."
                },
                {
                    title: "Innovative Technology",
                    content: "Our AI solutions incorporate the latest advancements in technology, ensuring that your business stays ahead of the curve. From intelligent data processing to AI-based scheduling assistants, we bring cutting-edge tools to help you automate and optimize large tasks efficiently, enhancing your overall operations."
                },
                {
                    title: "Efficient Automation",
                    content: "At Horatio, we believe in making automation work harder for you. Our AI-driven systems are designed to automate repetitive tasks with AI, freeing up your team to focus on high-impact work. The result? A noticeable increase in efficiency, accuracy, and productivity across the board."
                },
                {
                    title: "Reliable Support",
                    content: "When you choose us, you don’t just get technology—you get a committed team. Our AI task automation solutions are backed by reliable support to ensure everything runs smoothly. If you face any issues, we’re always here to provide prompt, knowledgeable assistance so you can continue to focus on what matters most."
                }
            ]
        },
        sec6: {
            title: "Need help with something? Claim Your Free Consultation Now!",
            content: `Struggling with time-consuming tasks? At Horatio, we offer cutting-edge AI for large task automation, helping businesses like yours improve efficiency and reduce manual effort. Whether it’s automating workflows, scheduling, or document processing, our AI solutions streamline your operations. Get a free consultation today and see how we can help you save time, boost productivity, and let AI take your business to the next level!`
        },
        // faq: [
        //     {
        //         question: "How does Horatio ensure consistency in brand messaging across all marketing channels?",
        //         answer: "Horatio ensures consistency in brand messaging across all marketing channels by establishing clear brand guidelines, maintaining a unified content strategy, and connecting messaging across platforms. Through strong internal communication, content approval processes, and data-driven refinements, Horatio ensures that every touchpoint—whether social media, email, website, or offline campaigns—delivers a unified and impactful brand experience."
        //     },
        //     {
        //         question: "What will be included in Horatio's branding package?",
        //         answer: "Horatio's branding package will include a Logo, Colour, Typography, Graphic Elements, Visiting Card, Envelopes, Letterhead, Name Board, Id Card, and Website Design Idea."
        //     },
        //     {
        //         question: "Why is a branding package important for my business?",
        //         answer: "A branding package ensures consistency across all marketing channels, builds brand recognition, and helps establish trust with your audience. With a well-defined brand identity, your business can stand out from competitors, create a lasting impression, and drive customer loyalty."
        //     },
        //     {
        //         question: "How does Horatio customize branding packages for different businesses?",
        //         answer: "Horatio creates branding packages by understanding each business's unique vision, target audience, and industry trends. Through in-depth research and collaboration, they craft a brand identity that aligns with the company's goals, ensuring a distinctive and impactful presence in the market."
        //     }
        // ]

    },
    // ai-custom-ai-solutions
    {
        name: "Custom AI Solutions",
        slug: "custom-ai-solutions",
        description: 'Develop tailored AI solutions, from predictive modeling to AI-driven automation, ensuring security, scalability, and compliance.',
        sec1: {
            title: "Your Partner for Custom AI Solutions in Kochi",
            content: "Not all AI is created equal, and definitely not all of it is made for your business. At Horatio, we specialize in leading custom AI solutions that align with your exact goals and operations. No generic shortcuts. Just purpose-built systems that automate, predict, and optimize where it counts. We listen, then we build—simple as that."
        },
        // sec3: {
        //     title: "Corporate Branding & Identity Solutions For Your Business",
        //     content: `We have all heard that the first impression always determines the long-term connection. When it comes to the branding package, branding elements like logos, graphic elements, visiting cards, etc. will come under this first impression. If it is done well, it will attract your potential audience and later become your loyal customer. At Horatio, we offer your business the best corporate branding and identity solutions.`
        // },
        sec4: {
            title: "Custom AI Services That Fit",
            contents: [
                {
                    title: "Tailored Machine Learning Models",
                    content: "Our tailored machine learning models aren’t just smart—they’re made to match the rhythm of your business. Whether you're dealing with structured data or unpredictable patterns, we craft solutions that adapt and improve over time. Based in Kochi, our team specializes in custom AI development, helping local businesses build systems that think ahead. It’s not a one-size-fits-all solution—it’s your data, your logic, and your way of doing things."
                },
                {
                    title: "NLP Engines for Specific Industries",
                    content: "Not all industries speak the same language—so why should their AI? Our NLP engines for specific industries are fine-tuned for the context, tone, and terminology that matter most to you. Whether you're in healthcare, law, or logistics, we bring tailored AI solutions that actually understand what your users are saying—and what they mean."
                },
                {
                    title: "AI Integration into Legacy Systems",
                    content: "Let’s be honest—ripping everything out and starting fresh isn’t always practical. That’s why our AI integration into legacy systems is designed to extend what you already have. We work with your existing setup, quirks and all, to bring in modern intelligence without the massive overhaul. Our custom AI solutions shouldn’t mean breaking everything apart—they should help you build on what works."
                },
                {
                    title: "Multilingual AI Assistants",
                    content: "If your customers speak more than one language, your AI should too. Our multilingual AI assistants are built to handle local dialects and global audiences, so your business doesn’t have to choose. From customer support to onboarding journeys, we create bespoke AI applications that truly speak your users’ language—both literally and contextually."
                },
                {
                    title: "Cross-Platform AI Tool Development",
                    content: "One solution, many devices. That’s the goal with our cross-platform AI tool development services. Whether it's mobile, desktop, or web-based platforms, we ensure a seamless AI experience everywhere. It’s all part of our commitment to end-to-end AI product development—because in a multi device world, consistency still matters."
                },
                {
                    title: "IoT + AI Integration for Smart Environments",
                    content: "Smart homes. Smarter factories. Our IoT + AI integration for smart environments blends data from connected devices with real-time intelligence. From energy savings to predictive maintenance, we build custom AI solutions that make environments more responsive and a lot more efficient. It's not just smart tech—it’s tech that works like it knows what’s next."
                }
            ]
        },
        sec5: {
            title: "Why Businesses Trust Our Custom AI Solutions in Kochi",
            content: [
                {
                    title: "Deep Customization",
                    content: "There’s no universal blueprint for AI—and we don’t pretend there is. Our custom AI solutions in Kochi are shaped to match how you work, not the other way around. Whether you’re dealing with unique datasets or niche workflows, we adapt. Honestly, some things we build have never been done quite that way before—and that’s the point. Precision matters when it comes to automation. So we don't settle for close enough."
                },
                {
                    title: "Strategic Alignment",
                    content: "AI that looks good on paper isn’t enough. What you need is something that quietly aligns with your long-term goals. With our tailored AI solutions in Kerala, we aim for that kind of fit—the kind that makes sense today but doesn’t hold you back tomorrow. Sure, there’s technical brilliance underneath, but more importantly, the strategy is never out of sight. We design solutions that grow with you, not just tick off today’s tasks."
                },
                {
                    title: "Scalable Design",
                    content: "Maybe you're just starting with a pilot idea, or perhaps you've been deep into product development for years. Either way, our end-to-end AI product development ensures what you build today won’t become your bottleneck tomorrow. We think in layers—what works now, and what can evolve later. It’s flexible, not flimsy. And even if you pivot (as most do), your foundation won’t fall apart. We plan for scale so you don’t have to rebuild."
                },
                {
                    title: "Cross-Platform Capability",
                    content: "One of the quiet frustrations with AI is when it’s stuck in one place—usable only in a web app or tied to a single tool. We get that. That’s why our bespoke AI applications are designed with adaptability in mind. Whether it’s a mobile app, desktop suite, or cloud tool, we help AI fit in seamlessly. No “please use this interface only” limitations. It’s your tech, your tools—AI just makes them better."
                },
                {
                    title: "Context-Aware Intelligence",
                    content: "Not all AI is truly intelligent. Some just process inputs, spit out results, and that’s it. But the systems we build under custom AI development in Kochi take more into account—timing, user behavior, even local nuances. That extra layer of sensitivity often makes the difference between helpful and annoying. We think AI should know when to act and, occasionally, when to wait. That kind of subtlety? It doesn’t happen by accident."
                },
                {
                    title: "Future-Ready Frameworks",
                    content: "We don’t believe in trendy shortcuts or rigid templates. Our stack is modern for a reason: so your tailored AI solution doesn’t go obsolete in a year. We pick frameworks that let you adapt—not just scale, but evolve. And yes, we’ve seen clients who came in with outdated tools and left with systems that felt five years ahead. That’s the bar we aim for. If it won’t last, we won’t build it."
                }
            ]
        },
        sec6: {
            title: "Want to know more? Get a Free AI Strategy Session!",
            content: `Not sure where AI fits into your business? At Horatio, we specialize in custom AI solutions designed around your unique challenges. From automation to intelligent workflows, our team helps you spot the right opportunities—without the tech overwhelm. Curious about what’s possible? Book your free AI strategy session today and start shaping smarter, more efficient systems for tomorrow.`
        },
        // faq: [
        //     {
        //         question: "How does Horatio ensure consistency in brand messaging across all marketing channels?",
        //         answer: "Horatio ensures consistency in brand messaging across all marketing channels by establishing clear brand guidelines, maintaining a unified content strategy, and connecting messaging across platforms. Through strong internal communication, content approval processes, and data-driven refinements, Horatio ensures that every touchpoint—whether social media, email, website, or offline campaigns—delivers a unified and impactful brand experience."
        //     },
        //     {
        //         question: "What will be included in Horatio's branding package?",
        //         answer: "Horatio's branding package will include a Logo, Colour, Typography, Graphic Elements, Visiting Card, Envelopes, Letterhead, Name Board, Id Card, and Website Design Idea."
        //     },
        //     {
        //         question: "Why is a branding package important for my business?",
        //         answer: "A branding package ensures consistency across all marketing channels, builds brand recognition, and helps establish trust with your audience. With a well-defined brand identity, your business can stand out from competitors, create a lasting impression, and drive customer loyalty."
        //     },
        //     {
        //         question: "How does Horatio customize branding packages for different businesses?",
        //         answer: "Horatio creates branding packages by understanding each business's unique vision, target audience, and industry trends. Through in-depth research and collaboration, they craft a brand identity that aligns with the company's goals, ensuring a distinctive and impactful presence in the market."
        //     }
        // ]
    },
]
// addService(aiSolutions)