import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { AnimatedSection } from "@/components/animated-section"
import Link from "next/link"
import { Button } from "./ui/button"

export default function ContactInfo() {
  return (
    <section>
      <AnimatedSection animation="fade-up">
        <SectionHeading title="Contact Information" description="Get in touch with us for any inquiries" />
      </AnimatedSection>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-10">
        <AnimatedSection
          animation="fade-up"
          delay={100}
          className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Our Location</h3>
          <p className="text-muted-foreground">Bus Station Custom, Juba, South Sudan 211</p>
        </AnimatedSection>

        <AnimatedSection
          animation="fade-up"
          delay={200}
          className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Phone className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Phone Number</h3>
          <p className="text-muted-foreground">+211 919 962 999</p>
        </AnimatedSection>

        <AnimatedSection
          animation="fade-up"
          delay={300}
          className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Email Address</h3>
          <p className="text-muted-foreground">primesmart04@mail.com</p>
        </AnimatedSection>

        <AnimatedSection
          animation="fade-up"
          delay={400}
          className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Business Hours</h3>
          <p className="text-muted-foreground">Monday - Saturday: 9:00 AM - 6:00 PM</p>
          <p className="text-muted-foreground">Sunday: 10:00 AM - 4:00 PM</p>
        </AnimatedSection>
      </div>

      <AnimatedSection animation="fade-up" delay={500} className="mt-12">
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="aspect-video w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.853500977977!2d31.578063399999998!3d4.8420972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x171317654ed8b2f9%3A0x7b3c56c0a4d5ac25!2sBus%20Station%2C%20Juba%2C%20South%20Sudan!5e0!3m2!1sen!2sus!4v1716130952209!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Prime Smart location"
              className="min-h-[300px]"
            ></iframe>
          </div>
          <div className="p-4 text-center">
            <p className="text-lg font-medium mb-2">Find Us at Bus Station Custom</p>
            <p className="text-muted-foreground mb-4">Located in Juba, South Sudan</p>
            <Button asChild size="sm">
              <Link
                href="https://www.google.com/maps/place/Bus+Station,+Juba,+South+Sudan/@4.8420972,31.5780634,17z/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions
              </Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}
