'use client'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown, ChevronLeft, Globe, Link as LinkIcon, Lock, Pencil } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

export default function CharacterCreationForm() {
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const [visibility, setVisibility] = useState('Public')
  const [voice, setVoice] = useState('Add')
  const [characterCount, setCharacterCount] = useState({
    name: 0,
    tagline: 0,
    description: 0,
    greeting: 0,
    definition: 0,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCharacterCount(prev => ({ ...prev, [name]: value.length }))
  }

  const visibilityIcons = {
    Public: <Globe className="h-4 w-4" />,
    Unlisted: <LinkIcon className="h-4 w-4" />,
    Private: <Lock className="h-4 w-4" />,
  }

  return (
    <>
    <div className="flex items-left mb-6">
      <Link href="/profile" passHref>
        <Button variant="ghost" className="p-0">
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </Link>
    </div>
    <div className="container mx-auto p-4 max-w-2xl">

      <div className="space-y-6">
        <div className="flex items-center justify-left">
          <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center">
            <Pencil/>
          </div>
        </div>

        <div>
          <Label htmlFor="name">Character Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Name"
            maxLength={20}
            onChange={handleInputChange}
          />
          <div className="text-right text-sm text-gray-500">{characterCount.name}/20</div>
        </div>

        <div>
          <Label htmlFor="tagline">Tagline</Label>
          <Input
            id="tagline"
            name="tagline"
            placeholder="Tagline"
            maxLength={50}
            onChange={handleInputChange}
          />
          <div className="text-right text-sm text-gray-500">{characterCount.tagline}/50</div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Description"
            maxLength={500}
            onChange={handleInputChange}
          />
          <div className="text-right text-sm text-gray-500">{characterCount.description}/500</div>
        </div>

        <div>
          <Label htmlFor="greeting">Greeting</Label>
          <Textarea
            id="greeting"
            name="greeting"
            placeholder="Greeting"
            maxLength={2048}
            onChange={handleInputChange}
          />
          <div className="text-right text-sm text-gray-500">{characterCount.greeting}/2048</div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span>Voice: {voice}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Voices</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <div>
          <Button
            variant="link"
            onClick={() => setShowMoreOptions(!showMoreOptions)}
            className="p-0"
          >
            {showMoreOptions ? 'Hide options' : 'More options'}
          </Button>
        </div>

        {showMoreOptions && (
          <div>
            <Label htmlFor="definition">Definition</Label>
            <Textarea
              id="definition"
              name="definition"
              placeholder="Definition"
              maxLength={2048}
              onChange={handleInputChange}
            />
            <div className="text-right text-sm text-gray-500">{characterCount.definition}/2048</div>
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox id="private-definition" />
              <Label htmlFor="private-definition">Keep definition private</Label>
            </div>
          </div>
        )}

        <div>
          <Label>Visibility</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex justify-between">
                {visibilityIcons[visibility as keyof typeof visibilityIcons]}
                <span>&nbsp; {visibility}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuItem onClick={() => setVisibility('Public')}>
                <Globe className="h-4 w-4 mr-2" />
                <span>Public</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setVisibility('Unlisted')}>
                <LinkIcon className="h-4 w-4 mr-2" />
                <span>Unlisted</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setVisibility('Private')}>
                <Lock className="h-4 w-4 mr-2" />
                <span>Private</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button className="w-full">Create Character</Button>
      </div>
    </div>
    </>
  )
}