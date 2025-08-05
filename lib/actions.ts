"use server"

import { z } from "zod"

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export async function submitContactForm(formData: ContactFormData) {
  try {
    // Validate form data
    const validatedData = contactFormSchema.parse(formData)

    // In a real application, you would send an email here
    // For example using a service like Resend, SendGrid, or Nodemailer

    // Example of how you would send an email with Nodemailer:
    // const transporter = nodemailer.createTransport({
    //   host: process.env.EMAIL_SERVER_HOST,
    //   port: Number(process.env.EMAIL_SERVER_PORT),
    //   auth: {
    //     user: process.env.EMAIL_SERVER_USER,
    //     pass: process.env.EMAIL_SERVER_PASSWORD,
    //   },
    //   secure: true,
    // })

    // await transporter.sendMail({
    //   from: process.env.EMAIL_FROM,
    //   to: "primesmart04@mail.com", // Store's email address
    //   subject: `New Contact Form Submission from ${validatedData.name}`,
    //   text: `
    //     Name: ${validatedData.name}
    //     Email: ${validatedData.email}
    //     Phone: ${validatedData.phone || "Not provided"}
    //     Message: ${validatedData.message}
    //   `,
    //   html: `
    //     <h1>New Contact Form Submission</h1>
    //     <p><strong>Name:</strong> ${validatedData.name}</p>
    //     <p><strong>Email:</strong> ${validatedData.email}</p>
    //     <p><strong>Phone:</strong> ${validatedData.phone || "Not provided"}</p>
    //     <p><strong>Message:</strong> ${validatedData.message}</p>
    //   `,
    // })

    // For now, we'll just log the data and return success
    console.log("Form submission:", validatedData)

    return { success: true, message: "Your message has been sent successfully!" }
  } catch (error) {
    console.error("Form submission error:", error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed. Please check your inputs.",
        errors: error.errors,
      }
    }
    return { success: false, message: "Failed to send your message. Please try again later." }
  }
}
