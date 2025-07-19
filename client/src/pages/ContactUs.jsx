import React from 'react'
import Banner from '../components/Home/Banner'
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Clock, FacebookIcon, TwitterIcon, LinkedinIcon } from "lucide-react";

const faqs = [
  {
    question: "How quickly can I get started?",
    answer:
      "You can start using WorkSphere immediately after signing up. Our onboarding team will help you get up and running fast so your team sees value right away.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use enterprise-grade security measures including SSL, backups, role-based access, and encryption to protect your company’s data at every level.",
  },
  {
    question: "Do you offer training and support?",
    answer:
      "Yes! We provide extensive learning materials, video tutorials, and 24/7 customer support to make sure your team gets the most out of WorkSphere.",
  },
  {
    question: "Can I customize the platform?",
    answer:
      "Yes! WorkSphere offers customization options including custom roles, fields, workflows, and integrations with your existing tools.",
  },
];
const ContactUs = () => {
  return (
    <div>
      <section className="py-16">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold  mb-2">Get In Touch</h2>
          <p className="text-muted-foreground">
            Have questions? We’d love to hear from you. Send us a message and we’ll respond as soon as possible.
          </p>
        </div>

        {/* Contact Info & Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Left - Contact Info */}
          <div className="bg-secondary p-6 rounded-xl shadow-sm space-y-6">
            {/* Address */}
            <div className="flex items-start gap-4">
              <MapPin className="text-blue-600 w-6 h-6 mt-1" />
              <div>
                <h4 className="font-semibold ">Address</h4>
                <p>123 Business District<br />Tech City, TX 12345<br />United States</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <Phone className="text-blue-600 w-6 h-6 mt-1" />
              <div>
                <h4 className="font-semibold ">Phone</h4>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <Mail className="text-blue-600 w-6 h-6 mt-1" />
              <div>
                <h4 className="font-semibold ">Email</h4>
                <p>contact@worksphere.com</p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start gap-4">
              <Clock className="text-blue-600 w-6 h-6 mt-1" />
              <div>
                <h4 className="font-semibold ">Business Hours</h4>
                <p>Mon–Fri: 9:00 AM – 6:00 PM<br />Sat: 10:00 AM – 4:00 PM<br />Sun: Closed</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-4">
              <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
                <i className="fab fa-twitter" /> <TwitterIcon />
              </a>
              <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
                <i className="fab fa-facebook-f" /> <FacebookIcon />
              </a>
              <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
                <i className="fab fa-linkedin-in" /> <LinkedinIcon />
              </a>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-secondary p-6 rounded-xl shadow-sm space-y-6">
            <div>
              <label className="block text-sm font-medium  mb-1">Email Address</label>
              <Input type="email" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium  mb-1">Message</label>
              <Textarea rows="5" placeholder="Write your message..." />
            </div>
            <div className="bg-blue-50 text-blue-800 text-sm p-3 rounded-md">
              <strong>Response Time:</strong> We typically respond within 24 business hours. For urgent matters, please contact us directly.
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Send Message</Button>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 md:px-20 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold  text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h4 className="font-semibold  mb-2">
                  {faq.question}
                </h4>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Banner />
    </div>
  )
}

export default ContactUs