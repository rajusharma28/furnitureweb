import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type CreateRegistrationInput } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCraftsmen(filters?: { skill?: string; location?: string }) {
  const queryKey = [api.craftsmen.list.path, filters];
  return useQuery({
    queryKey,
    queryFn: async () => {
      // Build URL with query params
      const url = new URL(api.craftsmen.list.path, window.location.origin);
      if (filters?.skill) url.searchParams.append("skill", filters.skill);
      if (filters?.location) url.searchParams.append("location", filters.location);

      const res = await fetch(url.toString(), { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch craftsmen");
      return api.craftsmen.list.responses[200].parse(await res.json());
    },
  });
}

export function useCraftsman(id: number) {
  return useQuery({
    queryKey: [api.craftsmen.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.craftsmen.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch craftsman");
      return api.craftsmen.get.responses[200].parse(await res.json());
    },
  });
}

export function useRegisterCraftsman() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: CreateRegistrationInput) => {
      const validated = api.registrations.create.input.parse(data);
      const res = await fetch(api.registrations.create.path, {
        method: api.registrations.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.registrations.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to register");
      }
      return api.registrations.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Registration Submitted",
        description: "We have received your details and will verify shortly.",
      });
    },
    onError: (error) => {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
