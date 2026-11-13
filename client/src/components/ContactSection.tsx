import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { contactSchema } from "@/lib/schema";
import type { ContactFormValues } from "@/lib/schema";

// Submissions are emailed via FormSubmit (no server needed, works on GitHub Pages).
// The first submission sends an activation email to this address; click the link in it once.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/gwaoutdoors@gmail.com";

export default function ContactSection() {
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const sendMessage = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      // Field names become the labels in the email, so keep them human-readable.
      const payload: Record<string, string> = {
        _subject: `New message from ${data.name} (BoatWizard website)`,
        _template: "table",
        _captcha: "false",
        _replyto: data.email,
        Name: data.name,
        Email: data.email,
        Phone: data.phone || "Not provided",
        Message: data.message,
      };

      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || String(result.success) !== "true") {
        throw new Error(result.message || "Your message couldn't be sent. Please try again or call us.");
      }
      return result;
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. We'll get back to you soon.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => sendMessage.mutate(data);

  return (
    <section id="contact" className="py-16 bg-[#e3e3e3] text-[#000000] mt-3">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#000000]">Get Your Motor Running</h2>
            <p className="text-xl text-[#000000]">Questions or need service? Send us a message and we'll get back to you.</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold marine-navy mb-6">Contact Us</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" autoComplete="name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" autoComplete="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (optional)</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="Phone number" autoComplete="tel" {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="How can we help?" rows={5} className="resize-none" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-marine-blue hover:bg-blue-800 text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={sendMessage.isPending}
                    >
                      <Send className={`mr-2 h-4 w-4 ${sendMessage.isPending ? "animate-pulse" : ""}`} />
                      {sendMessage.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
