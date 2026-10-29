import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HalftoneReveal from "../../components/HalftoneReveal";

function Support() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      question: "What is Neverarie?",
      answer:
        "Neverarie is a creative space for untold stories, unusual ideas, and imaginative worlds. It's where stories that once existed only in someone's mind can finally find a home.",
    },
    {
      question: "I'm having trouble accessing a story.",
      answer:
        "Try refreshing the page or opening it again. If the issue continues, contact support with the story title and a description of the problem.",
    },
    {
      question: "How can I report a bug?",
      answer:
        "You can report broken pages, loading issues, or unexpected behavior through the contact form below.",
    },
    {
      question: "Can I share suggestions or feedback?",
      answer:
        "Of course. Feedback and suggestions are always welcome and help make Neverarie a better experience.",
    },
    {
      question: "How do I contact the creator?",
      answer:
        "You can send a message directly through the contact form at the bottom of this page.",
    },
  ];

  const supportOptions = [
    {
      number: "01",
      title: "Technical issues",
      description:
        "Something isn't loading, a page looks broken, or a feature isn't working as expected.",
      action: "Report an issue",
    },
    {
      number: "02",
      title: "Stories & content",
      description:
        "Having trouble with a story, noticed a content issue, or want to share feedback.",
      action: "Get assistance",
    },
    {
      number: "03",
      title: "Questions & ideas",
      description:
        "Have a question, suggestion, or an idea you'd like to share with Neverarie.",
      action: "Reach out",
    },
  ];

  return (
    <>
      <Header />

      <main className="overflow-hidden bg-[#0B0812] text-white">
        {/* Support introduction */}
        <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6 pb-12 pt-32 sm:min-h-screen sm:pt-28">
          <div className="absolute inset-0 bg-[#0B0812]" />

          {/* Introduction text */}
          <div className="relative z-10 mx-auto w-full max-w-5xl grid items-center gap=8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#A78BFA] sm:text-sm">
                Neverarie Support
              </p>

              <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                We're here to help
                <span className="mt-2 block text-[#A78BFA]">you out.</span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
                Every now and then, even the best stories hit a complication.
                Whether something isn't working or you simply have a question,
                let's figure it out together.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="rounded-xl bg-[#A78BFA] px-6 py-3.5 text-sm font-semibold text-[#0B0812] transition hover:bg-[#C4B5FD]"
                >
                  Contact support <span aria-hidden="true">↗</span>
                </a>

                <a
                  href="#faq"
                  className="rounded-xl border border-white/15 px-6 py-3.5 text-sm font-medium text-white/80 transition hover:border-[#A78BFA]/50 hover:text-white"
                >
                  Explore FAQs
                </a>
              </div>
            </div>

            {/* Right */}
            <div className="relative mx-auto hidden w-full max-w-md lg:block lg:max-w-none">
              <div className="relative h-80 w-full overflow-hidden rounded-2xl sm:h-110 lg:h-125">
                <HalftoneReveal
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0TuVwaQs-wpAF0Yo0WFcKfppwWckOVv-PiPTsyqf27Qhnk1CMmgqNJEE&s=10"
                  mode="mono"
                  shape="dot"
                  cellSize={6}
                  angle={45}
                  inkColor="#c1aefc"
                  paperColor="#120f17"
                  revealRadius={160}
                  dotScale={1}
                  contrast={1.1}
                  brightness={0}
                  invert={false}
                  roughness={0}
                  misregistration={0}
                  fit="contain"
                  accentColor="#ff4f2a"
                  softness={0.6}
                  linger={1.2}
                  reverse={false}
                  wander={false}
                  clickBurst
                  intro
                />
              </div>
            </div>
          </div>
        </section>

        {/* Support categories */}
        <section className="px-6 py-20 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A78BFA]">
                What do you need?
              </p>

              <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                Find the right
                <span className="text-white/50"> direction.</span>
              </h2>

              <p className="mt-6 text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                Choose a category to get started. Whatever the issue, there's a
                place to begin.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {supportOptions.map((item) => (
                <a
                  key={item.number}
                  href="#contact"
                  className="group rounded-2xl border border-white/8 bg-white/2 p-7 transition duration-300 hover:-translate-y-1 hover:border-[#A78BFA]/30 hover:bg-[#A78BFA]/4 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-[0.2em] text-[#A78BFA]">
                      {item.number}
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 transition group-hover:border-[#A78BFA]/40 group-hover:text-[#A78BFA]">
                      ↗
                    </span>
                  </div>

                  <h3 className="mt-8 text-xl font-semibold">{item.title}</h3>

                  <p className="mt-4 min-h-21text-sm leading-7 text-white/50">
                    {item.description}
                  </p>

                  <div className="mt-6 border-t border-white/8 pt-5 text-sm font-medium text-white/70 transition group-hover:text-[#A78BFA]">
                    {item.action}
                    <span className="ml-2 transition group-hover:ml-3">→</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Frequently asked questions */}
        <section id="faq" className="scroll-mt-24 px-6 py-20 sm:py-28 lg:py-32">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A78BFA]">
                Frequently asked questions
              </p>

              <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                Questions,
                <span className="block text-white/50">answered.</span>
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                A few things you might want to know before reaching out. If you
                can't find your answer here, we're just a message away.
              </p>

              <a
                href="#contact"
                className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#A78BFA] transition hover:text-[#C4B5FD]"
              >
                Still have questions? <span>↗</span>
              </a>
            </div>

            <div className="border-t border-white/10">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <div key={faq.question} className="border-b border-white/10">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="text-sm font-medium leading-6 text-white/90 sm:text-base">
                        {faq.question}
                      </span>

                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-lg text-[#A78BFA] transition duration-300 ${
                          isOpen
                            ? "rotate-45 border-[#A78BFA]/40 bg-[#A78BFA]/10"
                            : "border-white/10"
                        }`}
                      >
                        +
                      </span>
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-2xl pb-6 text-sm leading-7 text-white/50">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact form */}
        <section id="contact" className="scroll-mt-24 px-6 pb-24 sm:pb-32">
          <div className="mx-auto max-w-6xl border-t border-white/10 pt-12 sm:pt-16">
            <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-start md:gap-16 lg:gap-24">
              {/* Contact introduction */}
              <div className="py-2">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A78BFA]">
                  Get in touch
                </p>

                <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                  Let's talk.
                  <span className="mt-2 block text-white/50">
                    I'm listening.
                  </span>
                </h2>

                <p className="mt-6 text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                  Tell me what's going on. Whether it's a technical issue, a
                  question about a story, or simply an idea you want to share,
                  I'd love to hear from you.
                </p>

                <div className="mt-8 border-l border-[#A78BFA]/40 pl-5">
                  <p className="text-sm font-medium text-white/80">
                    Every message matters.
                  </p>
                  <p className="mt-2 text-sm leading-7 text-white/40">
                    Give me a few details so I can better understand how to
                    help.
                  </p>
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={(event) => event.preventDefault()}
                className="rounded-2xl border border-white/10 bg-white/2 p-6 sm:p-8 lg:p-10"
              >
                <h3 className="text-xl font-semibold sm:text-2xl">
                  Send a message
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/40">
                  Fill in the details below to get started.
                </p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="support-name"
                      className="mb-2 block text-sm font-medium text-white/70"
                    >
                      Your name
                    </label>

                    <input
                      id="support-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your name"
                      required
                      className="w-full rounded-xl border border-white/10 bg-[#0B0812] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#A78BFA]/60 focus:ring-1 focus:ring-[#A78BFA]/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="support-email"
                      className="mb-2 block text-sm font-medium text-white/70"
                    >
                      Email address
                    </label>

                    <input
                      id="support-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-xl border border-white/10 bg-[#0B0812] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#A78BFA]/60 focus:ring-1 focus:ring-[#A78BFA]/20"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="support-subject"
                    className="mb-2 block text-sm font-medium text-white/70"
                  >
                    Subject
                  </label>

                  <select
                    id="support-subject"
                    name="subject"
                    defaultValue=""
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#0B0812] px-4 py-3.5 text-sm text-white/70 outline-none transition focus:border-[#A78BFA]/60 focus:ring-1 focus:ring-[#A78BFA]/20"
                  >
                    <option value="" disabled>
                      Select a topic
                    </option>
                    <option value="technical">Technical issue</option>
                    <option value="content">Story or content</option>
                    <option value="feedback">Feedback or suggestion</option>
                    <option value="question">General question</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="support-message"
                    className="mb-2 block text-sm font-medium text-white/70"
                  >
                    Message
                  </label>

                  <textarea
                    id="support-message"
                    name="message"
                    rows={6}
                    placeholder="Tell me a little more about what's on your mind..."
                    required
                    className="w-full resize-y rounded-xl border border-white/10 bg-[#0B0812] px-4 py-3.5 text-sm leading-7 text-white outline-none transition placeholder:text-white/25 focus:border-[#A78BFA]/60 focus:ring-1 focus:ring-[#A78BFA]/20"
                  />
                </div>

                <div className="mt-7">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#A78BFA] px-6 py-3.5 text-sm font-semibold text-[#0B0812] transition hover:bg-[#C4B5FD] sm:w-auto"
                  >
                    Send message
                    <span aria-hidden="true">↗</span>
                  </button>

                  <p className="mt-4 text-xs leading-6 text-white/30">
                    Please provide accurate details so I can better understand
                    your request.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Support;
