"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/section-heading"
import { AnimatedSection } from "@/components/animated-section"
import { ChevronRight, Award, Users, Shield, TrendingUp } from "lucide-react"

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("mission")
  const tabsRef = useRef<HTMLDivElement>(null)

  const scrollToTabs = () => {
    if (tabsRef.current) {
      tabsRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section className="relative overflow-hidden">
      {/* Background design element */}
      <div className="absolute -right-[10%] -bottom-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl z-0" />
      <div className="absolute -left-[10%] top-[20%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-3xl z-0" />

      <div className="relative z-10">
        <AnimatedSection animation="fade-up">
          <SectionHeading title="About Prime Smart" description="Your trusted electronics store in Juba, South Sudan" />
        </AnimatedSection>

        <div className="mt-12 grid md:grid-cols-12 gap-10 items-center">
          {/* Image Column */}
          <AnimatedSection animation="fade-right" className="md:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000&auto=format&fit=crop"
                alt="Electronics Store"
                width={600}
                height={700}
                className="w-full h-auto object-cover aspect-[4/5]"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#005A64]/80 to-transparent" />

              {/* Stats overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                <h3 className="font-bold text-2xl mb-3">Prime Smart</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                    <p className="text-sm opacity-80">Products</p>
                    <p className="text-xl font-bold">500+</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                    <p className="text-sm opacity-80">Happy Customers</p>
                    <p className="text-xl font-bold">2,000+</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                    <p className="text-sm opacity-80">Experience</p>
                    <p className="text-xl font-bold">5+ Years</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                    <p className="text-sm opacity-80">Support</p>
                    <p className="text-xl font-bold">24/7</p>
                  </div>
                </div>
              </div>

              {/* Logo badge */}
              <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg">
                <Image
                  src="/images/logo.png"
                  alt="Prime Smart"
                  width={100}
                  height={50}
                  className="w-auto h-auto max-w-[100px]"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Content Column */}
          <AnimatedSection animation="fade-left" delay={200} className="md:col-span-7 space-y-6">
            <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-2">
              Established 2024
            </div>

            <h3 className="text-3xl font-bold">Your Trusted Technology Partner in Juba</h3>

            <p className="text-lg text-gray-600 leading-relaxed">
              Prime Smart was founded with a simple mission: to provide high-quality, affordable electronics to the
              people of South Sudan. We recognized the growing demand for reliable tech products in our region and set
              out to fill that gap with a curated selection of the best devices from around the world.
            </p>

            <div ref={tabsRef} className="border-b border-gray-200 mt-6">
              <div className="flex space-x-6">
                <button
                  onClick={() => setActiveTab("mission")}
                  className={`pb-3 text-sm font-medium transition-colors relative ${
                    activeTab === "mission"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Our Mission
                </button>
                <button
                  onClick={() => setActiveTab("values")}
                  className={`pb-3 text-sm font-medium transition-colors relative ${
                    activeTab === "values"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Our Values
                </button>
                <button
                  onClick={() => setActiveTab("team")}
                  className={`pb-3 text-sm font-medium transition-colors relative ${
                    activeTab === "team"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Our Team
                </button>
              </div>
            </div>

            <div className="pt-4 min-h-[200px]">
              {activeTab === "mission" && (
                <AnimatedSection animation="fade-in" className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Bringing Technology to Everyone</h4>
                      <p className="text-gray-600 mt-1">
                        We believe everyone should have access to high-quality technology, regardless of location or
                        budget.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Quality Guaranteed</h4>
                      <p className="text-gray-600 mt-1">
                        We meticulously select each product in our inventory to ensure it meets our rigorous quality
                        standards.
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {activeTab === "values" && (
                <AnimatedSection animation="fade-in" className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <ChevronRight className="h-5 w-5 text-primary mr-2" />
                      <span className="text-gray-700">
                        <strong>Integrity:</strong> We operate with honesty and transparency in all our dealings.
                      </span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="h-5 w-5 text-primary mr-2" />
                      <span className="text-gray-700">
                        <strong>Excellence:</strong> We pursue excellence in our products and customer service.
                      </span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="h-5 w-5 text-primary mr-2" />
                      <span className="text-gray-700">
                        <strong>Innovation:</strong> We constantly seek new and better ways to serve our customers.
                      </span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="h-5 w-5 text-primary mr-2" />
                      <span className="text-gray-700">
                        <strong>Community:</strong> We are committed to contributing positively to our local community.
                      </span>
                    </li>
                  </ul>
                </AnimatedSection>
              )}

              {activeTab === "team" && (
                <AnimatedSection animation="fade-in">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Our Experts</h4>
                      <p className="text-gray-600 mt-1">
                        Our team consists of passionate tech enthusiasts and experts who are dedicated to providing the
                        best service and advice to our customers.
                      </p>
                      <p className="text-gray-600 mt-3">
                        From sales specialists to technical support, our diverse team is unified by a passion for
                        technology and customer satisfaction.
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>

            <div className="flex items-center pt-4">
              <Button asChild>
                <Link href="/about">Learn More About Us</Link>
              </Button>

              <div className="ml-6 flex items-center space-x-2">
                <Award className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Trusted retailer in Juba</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
