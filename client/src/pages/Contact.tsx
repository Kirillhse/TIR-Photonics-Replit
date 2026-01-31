import { PageHeader } from "@/components/PageHeader";
import { useSubmitContact } from "@/hooks/use-contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { api } from "@shared/routes";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

// Schema for frontend validation
const formSchema = api.contact.submit.input;

export default function Contact() {
  const { toast } = useToast();
  const mutation = useSubmitContact();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values, {
      onSuccess: () => {
        toast({
          title: "Message sent",
          description: "Thank you for reaching out. We will get back to you shortly.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  }

  return (
    <div className="min-h-screen bg-[#0A1428]">
      {/* Network / Connections background */}
      <PageHeader 
        title="Contact Us" 
        subtitle="Let's discuss how our photonic solutions can accelerate your innovations."
        bgImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
      />

      <div className="container mx-auto px-4 md:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">Get in Touch</h2>
            <div className="space-y-8">
              {[
                { icon: MapPin, title: "Headquarters", lines: ["123 Research Park Blvd", "Palo Alto, CA 94304"] },
                { icon: Mail, title: "Email", lines: ["info@tirphotonics.com", "sales@tirphotonics.com"] },
                { icon: Phone, title: "Phone", lines: ["+1 (555) 123-4567", "Mon-Fri, 9am - 5pm PST"] },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 p-6 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-[#0F1C44] flex items-center justify-center text-cyan-400 shrink-0">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    {item.lines.map((line, j) => (
                      <p key={j} className="text-gray-400">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-10 rounded-3xl bg-[#0F1C44]/50 border border-white/10 shadow-xl backdrop-blur-sm"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="bg-[#0A1428] border-white/10 text-white focus:border-cyan-500/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Company (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Tech Corp" {...field} className="bg-[#0A1428] border-white/10 text-white focus:border-cyan-500/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} className="bg-[#0A1428] border-white/10 text-white focus:border-cyan-500/50" />
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
                      <FormLabel className="text-gray-300">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="How can we help you?" 
                          className="min-h-[150px] bg-[#0A1428] border-white/10 text-white focus:border-cyan-500/50"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={mutation.isPending}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#0A1428] font-bold py-6 text-lg"
                >
                  {mutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
