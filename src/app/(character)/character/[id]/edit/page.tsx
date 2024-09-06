'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { auth, firestore, storage } from '@/firebase/config';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { ChevronDown, ChevronLeft, Globe, ImagePlus, Link as LinkIcon, Lock } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function CharacterEditForm() {
  const [user, setUser] = useState<User | null>(null);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [characterData, setCharacterData] = useState({
    name: '',
    tagline: '',
    description: '',
    greeting: '',
    definition: '',
    visibility: 'Public',
    voice: 'Add',
    keepDefinitionPrivate: false,
    imageUrl: '',
    userId: '',
  });
  const [characterCount, setCharacterCount] = useState({
    name: 0,
    tagline: 0,
    description: 0,
    greeting: 0,
    definition: 0,
  });

  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchCharacterData(currentUser.uid);
      } else {
        setUser(null);
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router, id]);

  const fetchCharacterData = async (currentUserId: string) => {
    try {
      const docRef = doc(firestore, 'personalities', id as string);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.userId !== currentUserId) {
          router.push('/');
          return;
        }
        setCharacterData(data as typeof characterData);
        setCharacterCount({
          name: data.name.length,
          tagline: data.tagline.length,
          description: data.description.length,
          greeting: data.greeting.length,
          definition: data.definition.length,
        });
      } else {
        console.log('No such document!');
        router.push('/');
      }
    } catch (error) {
      console.error('Error fetching character data: ', error);
      router.push('/');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCharacterCount((prev) => ({ ...prev, [name]: value.length }));
    setCharacterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVoiceChange = (newVoice: string) => {
    setCharacterData((prev) => ({ ...prev, voice: newVoice }));
    setIsVoiceOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      console.error('User not logged in');
      return;
    }

    setIsUploading(true);
    let imageUrl = characterData.imageUrl;

    if (imageFile) {
      const storageRef = ref(storage, `character_images/${user.uid}_${Date.now()}`);
      try {
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
        console.log('Image uploaded successfully, URL: ', imageUrl);
      } catch (error) {
        console.error('Error uploading image: ', error);
        setIsUploading(false);
        return;
      }
    }

    try {
      const docRef = doc(firestore, 'personalities', id as string);
      await updateDoc(docRef, {
        ...characterData,
        imageUrl,
        updatedAt: new Date(),
      });

      console.log('Document updated successfully');
      setIsUploading(false);
      router.push('/profile');
    } catch (error) {
      console.error('Error updating document: ', error);
      setIsUploading(false);
    }
  };

  const visibilityIcons = {
    Public: <Globe className="h-4 w-4" />,
    Unlisted: <LinkIcon className="h-4 w-4" />,
    Private: <Lock className="h-4 w-4" />,
  };

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
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="flex items-center justify-left">
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center">
                  {imageFile ? (
                    <img src={URL.createObjectURL(imageFile)} alt="Character" className="w-full h-full object-cover rounded-full" />
                  ) : characterData.imageUrl ? (
                    <img src={characterData.imageUrl} alt="Character" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <ImagePlus className="text-slate-500" />
                  )}
                </div>
              </label>
              <Input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>

            <div>
              <Label htmlFor="name">Character Name</Label>
              <Input id="name" name="name" placeholder="Name" maxLength={20} value={characterData.name} onChange={handleInputChange} />
              <div className="text-right text-sm text-gray-500">{characterCount.name}/20</div>
            </div>

            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input id="tagline" name="tagline" placeholder="Tagline" maxLength={50} value={characterData.tagline} onChange={handleInputChange} />
              <div className="text-right text-sm text-gray-500">{characterCount.tagline}/50</div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Description" maxLength={500} value={characterData.description} onChange={handleInputChange} />
              <div className="text-right text-sm text-gray-500">{characterCount.description}/500</div>
            </div>

            <div>
              <Label htmlFor="greeting">Greeting</Label>
              <Textarea id="greeting" name="greeting" placeholder="Greeting" maxLength={2048} value={characterData.greeting} onChange={handleInputChange} />
              <div className="text-right text-sm text-gray-500">{characterCount.greeting}/2048</div>
            </div>

            <div>
              <Label htmlFor="definition">Definition (Optional)</Label>
              <Textarea id="definition" name="definition" placeholder="Definition" maxLength={2048} value={characterData.definition} onChange={handleInputChange} />
              <div className="text-right text-sm text-gray-500">{characterCount.definition}/2048</div>
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id="private-definition"
                  checked={characterData.keepDefinitionPrivate}
                  onCheckedChange={(checked) => setCharacterData((prev) => ({ ...prev, keepDefinitionPrivate: checked as boolean }))}
                />
                <Label htmlFor="private-definition">Keep definition private</Label>
              </div>
            </div>

            <Dialog open={isVoiceOpen} onOpenChange={setIsVoiceOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-between" onClick={() => setIsVoiceOpen(true)}>
                  <span>Voice: {characterData.voice}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Voices</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Search" />
                  <div className="space-y-2">
                    {['None', 'Voice1', 'Voice2', 'Voice3'].map((v) => (
                      <Button key={v} variant="outline" className="w-full justify-start" onClick={() => handleVoiceChange(v)}>
                        <div className={v !== 'None' ? 'w-8 h-8 bg-slate-200 rounded mr-2' : ''}></div>
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <div>
              <Label>Visibility</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex justify-between">
                    {visibilityIcons[characterData.visibility as keyof typeof visibilityIcons]}
                    <span>&nbsp; {characterData.visibility}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuItem onClick={() => setCharacterData((prev) => ({ ...prev, visibility: 'Public' }))}>
                    <Globe className="h-4 w-4 mr-2" />
                    <span>Public</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCharacterData((prev) => ({ ...prev, visibility: 'Unlisted' }))}>
                    <LinkIcon className="h-4 w-4 mr-2" />
                    <span>Unlisted</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCharacterData((prev) => ({ ...prev, visibility: 'Private' }))}>
                    <Lock className="h-4 w-4 mr-2" />
                    <span>Private</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Button type="submit" className="w-full" disabled={isUploading}>
              {isUploading ? 'Saving Changes...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}