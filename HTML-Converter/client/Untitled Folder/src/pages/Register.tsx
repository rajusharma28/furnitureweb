import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api, type CreateRegistrationInput } from "@shared/routes";
import { useRegisterCraftsman } from "@/hooks/use-craftsmen";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function Register() {
  const { mutate, isPending } = useRegisterCraftsman();
  
  const form = useForm<CreateRegistrationInput>({
    resolver: zodResolver(api.registrations.create.input),
    defaultValues: {
      name: "",
      skill: "",
      experience: 0,
      location: "",
      phone: ""
    }
  });

  const onSubmit = (data: CreateRegistrationInput) => {
    mutate(data, {
      onSuccess: () => form.reset()
    });
  };

  const benefits = [
    "Access to 500+ potential clients monthly",
    "Verified Professional badge on your profile",
    "Dedicated support team",
    "Direct leads via WhatsApp and Phone",
    "Showcase your portfolio to thousands",
    "No hidden commissions or fees"
  ];

  return (
    <div className="min-h-screen py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">Join Our Network of Pros</h1>
            <p className="text-xl text-muted-foreground mb-12">
              Grow your business by connecting with homeowners looking for quality craftsmanship.
            </p>

            <div className="bg-primary/5 rounded-3xl p-8 mb-8 border border-primary/10">
              <h3 className="text-2xl font-bold mb-6 font-display text-primary">Why Join CraftHome?</h3>
              <ul className="space-y-4">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                    <span className="text-foreground/80 font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Form */}
          <Card className="shadow-xl border-none">
            <CardHeader className="p-8 pb-0">
              <CardTitle className="text-2xl font-display">Professional Registration</CardTitle>
              <CardDescription>Fill in your details to get started.</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="h-12 bg-muted/30" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="skill"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Skill</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 bg-muted/30">
                                <SelectValue placeholder="Select Skill" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Carpenter">Carpenter</SelectItem>
                              <SelectItem value="Painter">Painter</SelectItem>
                              <SelectItem value="Electrician">Electrician</SelectItem>
                              <SelectItem value="Plumber">Plumber</SelectItem>
                              <SelectItem value="Interior Designer">Interior Designer</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience (Years)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              className="h-12 bg-muted/30" 
                              {...field} 
                              onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 98765 43210" className="h-12 bg-muted/30" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City / Area</FormLabel>
                        <FormControl>
                          <Input placeholder="Mumbai, Delhi, etc." className="h-12 bg-muted/30" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full h-12 text-lg font-semibold mt-4" disabled={isPending}>
                    {isPending ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
