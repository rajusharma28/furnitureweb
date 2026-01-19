import { useState } from "react";
import { useCraftsmen } from "@/hooks/use-craftsmen";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Star, Phone, CheckCircle2, Search, MessageCircle } from "lucide-react";

export default function Craftsmen() {
  const [skill, setSkill] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const { data: craftsmen, isLoading } = useCraftsmen({ skill: skill === "all" ? undefined : skill, location });

  const skills = [
    "Carpenter",
    "Painter",
    "Electrician",
    "Plumber",
    "Interior Designer",
    "Furniture Maker"
  ];

  return (
    <div className="min-h-screen py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">Find Verified Craftsmen</h1>
          <p className="text-xl text-muted-foreground">
            Connect with skilled professionals in your area. All verified for quality and reliability.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border mb-12 flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full md:w-1/3 space-y-2">
            <label className="text-sm font-medium">Filter by Skill</label>
            <Select value={skill} onValueChange={setSkill}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="All Skills" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skills</SelectItem>
                {skills.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-1/3 space-y-2">
            <label className="text-sm font-medium">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Enter city or area..." 
                className="h-12 pl-10"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full md:w-1/3 pb-1">
            <Button className="w-full h-11 text-base" onClick={() => {}}>
              <Search className="mr-2 w-4 h-4" /> Search Pros
            </Button>
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="p-6">
                <div className="flex gap-4 mb-4">
                  <Skeleton className="w-20 h-20 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
                <Skeleton className="h-24 w-full mb-4" />
                <Skeleton className="h-10 w-full" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {craftsmen?.length === 0 ? (
              <div className="col-span-full text-center py-20 text-muted-foreground">
                No craftsmen found matching your criteria. Try adjusting filters.
              </div>
            ) : (
              craftsmen?.map((craftsman) => (
                <Card key={craftsman.id} className="hover:shadow-lg transition-all duration-300 border-border/50 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                          {craftsman.imageUrl ? (
                            <img src={craftsman.imageUrl} alt={craftsman.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-2xl font-bold text-primary">{craftsman.name[0]}</span>
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold font-display flex items-center gap-2">
                            {craftsman.name}
                            {craftsman.isVerified && (
                              <Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-100 gap-1 px-2 h-6">
                                <CheckCircle2 className="w-3 h-3" /> Verified
                              </Badge>
                            )}
                          </h3>
                          <p className="text-muted-foreground font-medium">{craftsman.skill}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded text-amber-700 font-bold text-sm">
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                        {craftsman.rating}
                      </div>
                    </div>

                    <div className="space-y-3 mb-8 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-primary" />
                        <span>{craftsman.experience} Years Experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{craftsman.location}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button className="w-full gap-2 bg-green-600 hover:bg-green-700" onClick={() => window.open(`https://wa.me/${craftsman.phone.replace(/\D/g,'')}`, '_blank')}>
                        <MessageCircle className="w-4 h-4" /> WhatsApp
                      </Button>
                      <Button variant="outline" className="w-full gap-2 border-primary text-primary hover:bg-primary/5" onClick={() => window.location.href = `tel:${craftsman.phone}`}>
                        <Phone className="w-4 h-4" /> Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Briefcase(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}
