import React from 'react';
import { Search, MessageCircle, Star, Users, Zap } from 'lucide-react';
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const CharacterAIClone = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to YourBotName</h1>
          <p className="text-xl mb-6">Discover and chat with unique AI characters</p>
        </section>

        {/* Search Bar */}
        <div className="relative mb-12">
          <Input
            placeholder="Search characters..."
            className="w-full pl-10 py-3 text-lg bg-white border-2 border-gray-300 rounded-full"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
        </div>

        {/* Featured Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Featured Characters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'AI Assistant', trait: 'Helpful', chats: '10k+' },
              { name: 'Historical Figure', trait: 'Knowledgeable', chats: '5k+' },
              { name: 'Fictional Character', trait: 'Creative', chats: '8k+' }
            ].map((char, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={`/api/placeholder/80/80?text=${char.name.charAt(0)}`}
                      alt={char.name}
                      className="w-16 h-16 rounded-full mr-4 border-2 border-blue-500"
                    />
                    <div>
                      <h3 className="font-bold text-xl">{char.name}</h3>
                      <p className="text-sm text-gray-600">By Creator{index + 1}</p>
                    </div>
                  </div>
                  <p className="text-sm mb-4">Engage in fascinating conversations with this {char.trait.toLowerCase()} AI character.</p>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="flex items-center">
                      <Star className="mr-1" size={14} />
                      4.{8 + index}/5
                    </Badge>
                    <Badge variant="outline" className="flex items-center">
                      <Users className="mr-1" size={14} />
                      {char.chats} chats
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <MessageCircle className="mr-2" size={18} />
                    Start Chatting
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* For You Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Recommended for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Tech Guru', specialty: 'AI & Robotics' },
              { name: 'Life Coach', specialty: 'Personal Growth' },
              { name: 'Language Tutor', specialty: 'Multilingual' },
              { name: 'Creative Muse', specialty: 'Artistic Inspiration' }
            ].map((char, index) => (
              <Card key={index} className="bg-white shadow hover:shadow-md transition-shadow">
                <CardContent className="pt-4">
                  <div className="flex items-center mb-3">
                    <img
                      src={`/api/placeholder/60/60?text=${char.name.charAt(0)}`}
                      alt={char.name}
                      className="w-12 h-12 rounded-full mr-3 border-2 border-green-500"
                    />
                    <div>
                      <h3 className="font-semibold">{char.name}</h3>
                      <p className="text-xs text-gray-600">By Expert{index + 1}</p>
                    </div>
                  </div>
                  <Badge className="mb-2 bg-green-100 text-green-800">
                    <Zap className="mr-1" size={12} />
                    {char.specialty}
                  </Badge>
                  <p className="text-sm mb-3">Get personalized advice and insights in {char.specialty}.</p>
                  <Button variant="outline" className="w-full text-sm py-1 border-blue-500 text-blue-500 hover:bg-blue-50">
                    Chat Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CharacterAIClone;