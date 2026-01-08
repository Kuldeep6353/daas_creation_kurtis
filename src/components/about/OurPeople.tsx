import { motion } from "framer-motion";

const processVideos = [
  {
    title: "packaging & ironing branch",
    description:
      "the second branch of daas creations where the packaging and ironing of kurtis is done with utmost care and precision.",
    video: "/video/2nd-branch.mp4",
  },
  {
    title: "Finishing & Ironing",
    description:
      "Every kurti is carefully finished, pressed, and prepared to meet premium brand standards.",
    video: "/video/press-video.mp4",
  },
  {
    title: "Quality Control",
    description:
      "Dedicated inspection teams check fabric, stitching, sizing, and final appearance.",
    video: "/video/kirpalbhai-office.mp4",
  },
  {
    title: "Packaging & Dispatch",
    description:
      "Secure folding, labeling, and packaging for safe delivery and export readiness.",
    video: "/video/packaging.mp4",
  },
];

export default function OurPeople() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 space-y-16">

        {/* SECTION TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Our People & Process
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Behind every DAAS Creation kurti is a skilled team and a refined manufacturing process.
          </p>
        </motion.div>

        {/* BIG IMAGE — PACKAGING TEAM */}
        <div className="overflow-hidden rounded-2xl">
          <img
            src="/images/packaging-team.jpg"
            alt="Packaging Team"
            className="w-full h-[420px] object-cover"
          />
        </div>

        {/* BIG IMAGE — STITCHING TEAM */}
        <div className="overflow-hidden rounded-2xl">
          <img
            src="/images/stitching-team.jpg"
            alt="Stitching Team"
            className="w-full h-[420px] object-cover"
          />
        </div>

        {/* PROCESS VIDEO CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processVideos.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl border bg-background overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-[260px] bg-black">
                <video
                   src={item.video}
                   autoPlay
                   muted
                   loop
                   playsInline
                   className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>


              <div className="p-4 flex-1">
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-snug">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
