import ContactForm from "@/components/contact-form"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <AnimatedSection animation="fade-up">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Contact Us</h1>
        <p className="text-lg text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Have questions about our products or services? Reach out to us using the form below or through our contact
          information.
        </p>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
        <AnimatedSection animation="slide-in" className="origin-left">
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
          <ContactForm />
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={200}>
          <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Address</h3>
                <p className="text-muted-foreground">Bus Station Custom, Juba, South Sudan 211</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Phone</h3>
                <p className="text-muted-foreground">+211 919 962 999</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Email</h3>
                <p className="text-muted-foreground">primesmart04@mail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Business Hours</h3>
                <p className="text-muted-foreground">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                <p className="text-muted-foreground">Sunday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>

          <AnimatedSection animation="fade-in" delay={400} className="mt-10">
            <h3 className="font-medium mb-4">Find Us</h3>
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-md">
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
          </AnimatedSection>
        </AnimatedSection>
      </div>
    </div>
  )
}
