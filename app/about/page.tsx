import Image from "next/image"
import { AnimatedSection } from "@/components/animated-section"
import { CheckCircle, MapPin, Award, ThumbsUp, Clock, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden mb-20">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2000&auto=format&fit=crop"
            alt="Technology background"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 py-20 px-6 md:px-12 text-center text-white">
          <AnimatedSection animation="fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">About Prime Smart</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Your premier destination for cutting-edge electronics in Juba, South Sudan
            </p>
            <div className="mt-12 inline-block">
              <Image src="/images/logo-white.png" alt="Prime Smart Logo" width={200} height={100} className="h-auto" />
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Our Story Section */}
      <AnimatedSection animation="fade-up" className="mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Established 2024
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Prime Smart was founded with a simple mission: to provide high-quality, affordable electronics to the
              people of South Sudan. We recognized the growing demand for reliable tech products in our region and set
              out to fill that gap with a curated selection of the best devices from around the world.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              What started as a small shop with a handful of products has grown into a thriving business that serves
              thousands of customers across Juba and beyond. Our commitment to quality, affordability, and excellent
              customer service has made us the go-to destination for tech enthusiasts in South Sudan.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -z-10 inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl transform rotate-3"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=900&auto=format&fit=crop"
                alt="Electronics store display"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute bottom-4 right-4 bg-white p-3 rounded-xl shadow-lg">
              <div className="text-center">
                <p className="text-sm text-gray-500">Established</p>
                <p className="text-xl font-bold text-primary">2024</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Core Values Section */}
      <AnimatedSection animation="fade-up" className="mb-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            What We Stand For
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Core Values</h2>
          <p className="text-lg text-gray-600">
            At Prime Smart, our values guide everything we do. They're the foundation of our business and the compass
            that directs our decisions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Quality</h3>
            <p className="text-gray-600">
              We carefully select each product in our inventory to ensure it meets our high standards. We believe in
              selling products that last and provide value.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <ThumbsUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Affordability</h3>
            <p className="text-gray-600">
              We believe that great technology should be accessible to everyone. We work hard to provide competitive
              prices without compromising on quality.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Customer Service</h3>
            <p className="text-gray-600">
              Our knowledgeable team is always ready to assist you with any questions or concerns. We believe in
              building relationships, not just making sales.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Community</h3>
            <p className="text-gray-600">
              We are proud to be a local business serving the people of Juba and beyond. We are committed to
              contributing positively to our community.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Integrity</h3>
            <p className="text-gray-600">
              We believe in honest business practices. What we promise is what we deliver, with transparency in all our
              dealings.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Reliability</h3>
            <p className="text-gray-600">
              We stand behind our products. Our customers can count on us for consistent quality and dependable service
              when they need it.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Visit Us Section */}
      <AnimatedSection animation="fade-up">
        <div className="bg-gradient-to-r from-primary to-[#007A87] rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 text-white">
              <h2 className="text-3xl font-bold mb-6">Visit Our Store</h2>
              <p className="text-lg opacity-90 mb-8">
                We invite you to visit our store at Bus Station Custom, Juba, South Sudan. Experience our products
                firsthand and let our friendly staff help you find the perfect tech solution for your needs.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 mt-1 text-white/80" />
                  <div>
                    <p className="font-medium">Our Location</p>
                    <p className="opacity-80">Bus Station Custom, Juba, South Sudan 211</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 mt-1 text-white/80" />
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="opacity-80">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                    <p className="opacity-80">Sunday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-white/80 italic">
                  "Thank you for choosing Prime Smart as your electronics partner. We look forward to serving you!"
                </p>
                <p className="font-medium mt-2">— The Prime Smart Team</p>
              </div>
            </div>

            <div className="hidden md:block relative">
              <Image
                src="https://images.unsplash.com/photo-1604754742629-3e0498a8990d?q=80&w=1000&auto=format&fit=crop"
                alt="Store front"
                fill
                className="object-cover h-full"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
