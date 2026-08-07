import Image from 'next/image';

const experiences = [
    {
        id: "2025 Jun - Present",
        title: "Marketing Collaterals Designed for Impact",
        description:
            "Campaigns, performance assets, rollouts—delivered with precision, speed, and brand consistency.",
        image: "/images/left-loom.webp",
    },
    {
        id: "2023 Nov - 2025 Jun",
        title: "Campaign & Rollout Design",
        description:
            "Launch creative, performance assets, landing page visuals, and emailers—all on brand and on time.",
        image: "/images/left-loom.webp",
    },
    {
        id: "2020 Apr - 2023 Nov",
        title: "Retail & PRINT design",
        description:
            "Catalogues, displays, packaging, and signage—creative built to engage and convert at every touchpoint.",
        image: "/images/left-loom.webp",
    },
    {
        id: "2020 Jan - 2020 Apr",
        title: "BRaND & corPorATE",
        description:
            "Strategic design for brand systems, corporate storytelling, and communication essentials.",
        image: "/images/left-loom.webp",
    },
];

const ExperienceSection = () => {
    return (
        <section className="relative section experience-section">
            <div className="max-w-[1360px] mx-auto px-5 flex flex-col items-center relative">

            <div className=" mb-10 sm:mb-20 sm:flex  gap-8 justify-between w-full items-center">
                <div className="flex flex-col mb-8">
                      <h2 className="uppercase slide-right  text-white heading filling-text text-5xl lg:text-[7rem]  leading-none font-medium font-monument relative">
                        <span className="fill" aria-hidden="true">
                         Our
                        </span>
                        <span>
                         Our
                        </span>
                      </h2>
                      <h2 className="uppercase slide-right delay-200 text-white heading filling-text text-5xl lg:text-[7rem]  leading-none font-medium font-monument relative">
                        <span className="fill" aria-hidden="true">
                         Services
                        </span>
                        <span>
                          Services
                        </span>
                      </h2>

                    </div>

                <p className="text-white/80 text-[18px] leading-relaxed lg:text-right max-w-[650px]">
                   we serve clients globally with a passion for innovation and storytelling. Whether it’s crafting cinematic videos, designing brand identities, or developing engaging digital content, we bring your vision to life with impact and authenticity.
                </p>
            </div>

            <div className="flex flex-col gap-10">
                {experiences.map((exp, i) => (
                    <div
                        key={exp.id}
                        className={`grid md:grid-cols-3 gap-4 lg:gap-8 border border-[var(--green)] bg-[var(--background2)] items-center rounded-[20px] p-7 sticky ${i === 0
                            ? "sm:top-[120px] top-[80px]"
                            : i === 1
                                ? "sm:top-[160px] top-[145px]"
                                : "sm:top-[200px] top-[205px]"
                            }`}
                    >
                        <div className="md:order-last w-full lg:w-auto flex justify-center">
                                                        <Image
                                src={exp.image}
                                alt={exp.title}
                                width={200} // Please provide the correct width
                                height={200} // Please provide the correct height
                                className=" object-contain w-[200px] ml-auto lg:ml-auto rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col  col-span-2">
                           

                            <h5 className="md:text-3xl text-2xl font-semibold mb-3 mt-3 max-w-[500px] uppercase">
                                {exp.title}
                            </h5>
                           
                            <p className="sm:text-md text-sm text-gray-400 sm:leading-[24px] max-w-[500px]">
                                {exp.description}
                            </p>
                        </div>

                    </div>
                ))}
            </div>
        </div >
        </section >

    );
};

export default ExperienceSection;
