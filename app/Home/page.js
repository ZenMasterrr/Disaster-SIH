import Image from "next/image"
import { ArrowRight, ChevronRight, Play, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Component() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="relative h-[60vh] overflow-hidden">
        <Image
          src="/images/disaster-response-team.jpg"
          alt="Disaster Response Team in Action"
          width={1920}
          height={1080}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute top-4 left-4 flex space-x-2">
          <button className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm">
            $1M Raised for Relief
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-full text-sm">
            Emergency Alert
          </button>
        </div>
        <div className="absolute bottom-10 left-10 max-w-xl">
          <h1 className="text-5xl font-bold mb-4">Cyclone Preparedness: Stay Safe, Stay Informed</h1>
          <button className="bg-white text-black px-6 py-3 rounded-full font-semibold flex items-center">
            Read Guidelines <ArrowRight className="ml-2 w-4 h-4" />
          </button>
          <p className="mt-2 text-sm">3 min read</p>
        </div>
      </header>

      <section className="py-12 px-10 grid grid-cols-4 gap-8">
        <div className="flex items-start">
          <div className="bg-red-700 p-3 rounded-full mr-4">
            <Play className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Emergency Response Protocols</h3>
            <p className="text-sm text-gray-400">Learn our disaster response procedures</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="bg-red-700 p-3 rounded-full mr-4">
            <Play className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Evacuation Routes and Safe Zones</h3>
            <p className="text-sm text-gray-400">Know your nearest evacuation points</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="bg-red-700 p-3 rounded-full mr-4">
            <Play className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Community Resilience Programs</h3>
            <p className="text-sm text-gray-400">Building stronger, prepared communities</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="bg-red-700 p-3 rounded-full mr-4">
            <Play className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Volunteer Training Initiatives</h3>
            <p className="text-sm text-gray-400">Join our disaster response team</p>
          </div>
        </div>
      </section>

      <section className="py-12 px-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Recent Disaster Updates</h2>
          <div className="flex space-x-2">
            <button className="w-3 h-3 rounded-full bg-red-500" />
            <button className="w-3 h-3 rounded-full bg-gray-700" />
            <button className="w-3 h-3 rounded-full bg-gray-700" />
            <button className="w-3 h-3 rounded-full bg-gray-700" />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-6">
          {[
            "Flood Warning: River Levels Rising",
            "Earthquake Recovery: Progress Report",
            "Wildfire Alert: Evacuation Orders",
            "Hurricane Preparedness: Supply Checklist",
            "Drought Crisis: Water Conservation Measures",
          ].map((title, index) => (
            <div key={index} className="relative group cursor-pointer">
              <Image
                src="/images/gasmask.jpg"
                alt={title}
                width={300}
                height={400}
                className="rounded-lg object-cover w-full h-64"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 group-hover:opacity-90 transition-opacity rounded-lg" />
              <h3 className="absolute bottom-4 left-4 right-4 text-lg font-semibold">{title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-10 grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <h2 className="text-2xl font-bold mb-6">Latest News</h2>
          <div className="space-y-6">
            {[
              {
                title: "Cyclone Biparjoy: Gujarat Coast on High Alert",
                excerpt:
                  "Authorities evacuate thousands as Cyclone Biparjoy approaches Gujarat coast with wind speeds up to 150 km/h...",
                image: "/images/cyclone.jpg",
                date: "30 mins ago",
                readTime: "3 min read",
              },
              {
                title: "Assam Floods: Over 7 Lakh People Affected Across 29 Districts",
                excerpt:
                  "Brahmaputra and its tributaries continue to flow above danger level, causing widespread flooding and displacement...",
                image: "/images/floodassam.jpg",
                date: "2 hours ago",
                readTime: "4 min read",
              },
              {
                title: "Uttarakhand Landslides: Char Dham Yatra Temporarily Suspended",
                excerpt: "Heavy rainfall triggers landslides in Uttarakhand, blocking major roads and affecting pilgrimage routes...",
                image: "/images/landslide.jpg",
                date: "5 hours ago",
                readTime: "3 min read",
              },
            ].map((post, index) => (
              <div key={index} className="flex space-x-4">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={300}
                  height={200}
                  className="rounded-lg object-cover w-32 h-32"
                />
                <div>
                  <h3 className="font-semibold mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">{post.excerpt}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            Critical Alerts <span className="text-red-500 ml-2">▲</span>
          </h2>
          <ol className="space-y-4">
            {[
              "Cyclone Warning: Red Alert for Gujarat Coast",
              "Flood Alert: Brahmaputra Above Danger Mark in Assam",
              "Landslide Warning: Uttarakhand Hills Face High Risk",
              "Heat Wave Alert: Temperature Soars in North India",
              "Heavy Rainfall Alert: Mumbai and Konkan Coast",
            ].map((title, index) => (
              <li key={index} className="flex items-start">
                <span className="text-2xl font-bold text-red-600 mr-4">!</span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-xs text-gray-500 mt-1">Updated 30 mins ago</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-12 px-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Disaster Preparedness Videos</h2>
          <button className="text-red-500 flex items-center">
            See All <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="relative group cursor-pointer">
              <Image
                src="/images/cyc.jpg"
                alt={`Preparedness Video ${index}`}
                width={300}
                height={200}
                className="rounded-lg object-cover w-full h-48"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-opacity rounded-lg flex items-center justify-center">
                <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-800 text-gray-300 py-12 px-10">
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Our Mission</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Emergency Response Team</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press Releases</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Disaster Preparedness</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Emergency Plans</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Recovery Assistance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Training Programs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Community</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Volunteer</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Donate</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community Resilience</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partner Organizations</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Emergency Hotline</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Report an Incident</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Media Inquiries</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Feedback</a></li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between items-center pt-8 border-t border-gray-700">
          <p>&copy; 2024 Disaster Management Authority. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition-colors"><Facebook className="w-6 h-6" /></a>
            <a href="#" className="hover:text-white transition-colors"><Twitter className="w-6 h-6" /></a>
            <a href="#" className="hover:text-white transition-colors"><Instagram className="w-6 h-6" /></a>
            <a href="#" className="hover:text-white transition-colors"><Youtube className="w-6 h-6" /></a>
          </div>
        </div>
      </footer>
    </div>
  )
}