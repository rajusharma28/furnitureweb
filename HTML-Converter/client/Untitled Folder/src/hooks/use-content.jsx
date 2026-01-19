import { useQuery, useMutation } from "@tanstack/react-query";
import { api, type CreateContactInput } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useServices() {
  return useQuery({
    queryKey: [api.services.list.path],
    queryFn: async () => {
      const res = await fetch(api.services.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch services");
      return api.services.list.responses[200].parse(await res.json());
    },
  });
}

export function useTestimonials() {
  return useQuery({
    queryKey: [api.testimonials.list.path],
    queryFn: async () => {
      const res = await fetch(api.testimonials.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return api.testimonials.list.responses[200].parse(await res.json());
    },
  });
}

export function useFaqs() {
  return useQuery({
    queryKey: [api.faqs.list.path],
    queryFn: async () => {
      const res = await fetch(api.faqs.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch FAQs");
      return api.faqs.list.responses[200].parse(await res.json());
    },
  });
}

export function useContact() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: CreateContactInput) => {
      const validated = api.contact.create.input.parse(data);
      const res = await fetch(api.contact.create.path, {
        method: api.contact.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.contact.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to send message");
      }
      return api.contact.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "We'll get back to you as soon as possible.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to Send",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
