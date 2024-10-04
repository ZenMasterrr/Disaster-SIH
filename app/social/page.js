"use client";

import { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Eye, Image as ImageIcon, MapPin, Users, Settings, ThumbsUp, X, Send } from "lucide-react";
import Image from 'next/image';

export default function Component() {
  const [recentPosts, setRecentPosts] = useState([
    {
      id: 1,
      author: { name: "Priya Patel", username: "priyap", avatar: "/placeholder.svg" },
      content: "Just completed a disaster preparedness workshop in Mumbai. Great turnout and engagement from the community!",
      createdAt: new Date().toISOString(),
      images: [
        "/images/work1.jpg",
        "/images/work2.jpg",
        "/images/work3.jpg"
      ],
      location: "Mumbai, Maharashtra",
      imageLabel: "Workshop Photos",
      comments: []
    },
    {
      id: 2,
      author: { name: "Rahul Verma", username: "rahulv", avatar: "/placeholder.svg" },
      content: "Cyclone alert for coastal regions of Odisha. Please stay informed and follow evacuation instructions if issued.",
      createdAt: new Date().toISOString(),
      images: [
        "/images/odhisa.jpg"
      ],
      location: "Bhubaneswar, Odisha",
      imageLabel: "Cyclone Warning Maps",
      comments: []
    }
  ]);

  const [updatePosts, setUpdatePosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImages, setNewPostImages] = useState([]);
  const [activeTab, setActiveTab] = useState("recent");
  const [respondingToPost, setRespondingToPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + newPostImages.length > 3) {
      alert("You can only upload up to 3 images.");
      return;
    }

    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      name: file.name
    }));

    setNewPostImages([...newPostImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = newPostImages.filter((_, i) => i !== index);
    setNewPostImages(updatedImages);
  };

  const handlePost = () => {
    if (newPostContent.trim() === "" && newPostImages.length === 0) return;

    const newPost = {
      id: Date.now(),
      author: { name: "Harshit Pandey", username: "harshits", avatar: "/placeholder.svg" },
      content: newPostContent,
      createdAt: new Date().toISOString(),
      images: newPostImages.map(img => img.url),
      location: "Bhopal, Madhya Pradesh", // Updated location
      imageLabel: newPostImages.length > 0 ? "Uploaded Images" : ""
    };

    setUpdatePosts([newPost, ...updatePosts]);
    setNewPostContent("");
    setNewPostImages([]);
    setActiveTab("updates");
  };

  const handleAddComment = (postId) => {
    if (newComment.trim() === "") return;

    const updatedPosts = recentPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: Date.now(),
              author: "Current User",
              content: newComment,
              createdAt: new Date().toISOString()
            }
          ]
        };
      }
      return post;
    });
    setRecentPosts(updatedPosts);
    setNewComment("");
    setRespondingToPost(null);
  };

  const renderPosts = (posts) => (
    posts.map((post) => (
      <Card key={post.id} className="mt-4 border border-gray-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-100">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={post.author.avatar} alt={post.author.username} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-sm font-bold">{post.author.name}</CardTitle>
              <p className="text-xs text-gray-600">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </Button>
        </CardHeader>
        <CardContent className="p-4">
          <p className="mt-2 text-lg font-semibold">{post.content}</p>
          {post.location && (
            <p className="text-sm mt-2 font-medium">
              <MapPin className="h-4 w-4 inline mr-1" />
              <span>{post.location}</span>
            </p>
          )}
          {post.images && post.images.length > 0 && (
            <>
              <p className="text-sm font-bold mt-4 uppercase tracking-wide">{post.imageLabel}</p>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {post.images.map((img, index) => (
                  <Image
                    key={index}
                    src={img}
                    alt={`${post.imageLabel} ${index + 1}`}
                    width={100}
                    height={128}
                    className="w-full h-32 object-cover rounded-lg border border-gray-300"
                  />
                ))}
              </div>
            </>
          )}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span className="text-sm font-medium">2</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-100">
                <ThumbsUp className="h-4 w-4 mr-2" />
                <span className="font-medium">Acknowledge</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setRespondingToPost(post.id)}
                className="border-gray-300 hover:bg-gray-100"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                <span className="font-medium">Respond</span>
              </Button>
            </div>
          </div>
          {respondingToPost === post.id && (
            <div className="mt-4 bg-gray-100 p-4 rounded-lg border border-gray-300">
              <Input
                placeholder="Type your response..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="border-2 border-gray-300 focus:border-gray-500 rounded-md"
              />
              <div className="flex justify-end mt-2">
                <Button size="sm" onClick={() => handleAddComment(post.id)} className="bg-gray-800 hover:bg-gray-900 text-white">
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          )}
          {post.comments && post.comments.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="font-bold text-lg">Responses:</h4>
              {post.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-100 p-3 rounded-lg border border-gray-300">
                  <p className="text-sm font-bold">{comment.author}</p>
                  <p className="text-sm mt-1">{comment.content}</p>
                  <p className="text-xs text-gray-600 mt-1 italic">{new Date(comment.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    ))
  );

  const user = { name: "Harshit Pandey", username: "harshits", avatar: "/placeholder.svg" };
  const stories = [
    { id: 1, user: { name: "Ananya" }, image: "/images/1st.jpg" },
    { id: 2, user: { name: "Vikram" }, image: "/images/2nd.jpg" },
    { id: 3, user: { name: "Deepika" }, image: "/images/3rd.jpg" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-64 bg-white p-4 flex flex-col border-r border-gray-300">
        <div className="flex items-center space-x-4 mb-6">
          <Avatar className="w-12 h-12">
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-bold text-lg">{user.name}</h2>
            <p className="text-sm text-gray-600">@{user.username}</p>
          </div>
        </div>
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start font-semibold text-gray-800 hover:bg-gray-100">
            <Eye className="mr-2 h-4 w-4" />
            Alerts Feed
          </Button>
          <Button variant="ghost" className="w-full justify-start font-semibold text-gray-800 hover:bg-gray-100">
            <MessageCircle className="mr-2 h-4 w-4" />
            Emergency Contacts
            <span className="ml-auto bg-gray-800 text-white text-xs px-2 py-1 rounded-full">3</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start font-semibold text-gray-800 hover:bg-gray-100">
            <Users className="mr-2 h-4 w-4" />
            Community Forums
          </Button>
          <Button variant="ghost" className="w-full justify-start font-semibold text-gray-800 hover:bg-gray-100">
            <Users className="mr-2 h-4 w-4" />
            Volunteer Network
            <span className="ml-auto bg-gray-800 text-white text-xs px-2 py-1 rounded-full">5</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start font-semibold text-gray-800 hover:bg-gray-100">
            <ImageIcon className="mr-2 h-4 w-4" />
            Resource Center
          </Button>
          <Button variant="ghost" className="w-full justify-start font-semibold text-gray-800 hover:bg-gray-100">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="max-w-3xl mx-auto space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="@user" />
                  <AvatarFallback>H</AvatarFallback>
                </Avatar>
                <Input 
                  placeholder="Share an update or alert" 
                  className="flex-1" 
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
              </div>
              {newPostImages.length > 0 && (
                <div className="flex space-x-2 mt-4">
                  {newPostImages.map((img, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={img.url}
                        alt={img.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <button
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-between mt-4">
                <div className="flex space-x-2">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    ref={fileInputRef}
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => fileInputRef.current.click()}
                    disabled={newPostImages.length >= 3}
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Image
                  </Button>
                  <Button variant="outline" size="sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    Location
                  </Button>
                </div>
                <Button onClick={handlePost}>Post</Button>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
            </TabsList>
            <TabsContent value="recent">
              {renderPosts(recentPosts)}
            </TabsContent>
            <TabsContent value="updates">
              {renderPosts(updatePosts)}
            </TabsContent>
            <TabsContent value="alerts">
              <Card>
                <CardContent>
                  <p>Current disaster alerts and warnings</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-64 bg-white p-4 flex flex-col border-l border-gray-300">
        <h2 className="font-bold text-xl mb-4 text-gray-800">Recent</h2>
        <ScrollArea className="h-40">
          <div className="flex space-x-2">
            {stories.map((story) => (
              <div key={story.id} className="flex-shrink-0">
                <Image
                  src={story.image}
                  alt={`Alert by ${story.user.name}`}
                  width={80}
                  height={96}
                  className="object-cover rounded-lg border border-gray-300"
                />
                <p className="text-sm mt-1 font-bold text-gray-800">{story.user.name}</p>
              </div>
            ))}
          </div>
        </ScrollArea>

        <h2 className="font-bold text-xl mt-6 mb-4 text-gray-800">Nearby Volunteers</h2>
        <div className="space-y-4">
          {["Amit Kumar", "Sneha Gupta", "Rajesh Sharma"].map((name, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt={name} />
                  <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                <span className="font-bold text-gray-800">{name}</span>
              </div>
              <Button variant="outline" size="sm" className="border-gray-400 hover:bg-gray-100 font-semibold text-gray-800">
                Contact
              </Button>
            </div>
          ))}
        </div>

        <h2 className="font-bold text-xl mt-6 mb-4 text-gray-800">Quick Access</h2>
        <div className="grid grid-cols-2 gap-2">
          {["Emergency Kit", "Evacuation Plan", "First Aid", "Weather Updates"].map((topic, i) => (
            <Button 
              key={i} 
              variant="outline" 
              className="w-full border-gray-400 hover:bg-gray-100 font-bold text-gray-800 text-sm"
            >
              {topic}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}