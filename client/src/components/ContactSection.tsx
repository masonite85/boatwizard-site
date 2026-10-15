import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, Mail, MapPin, Clock, Smartphone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { insertServiceRequestSchema } from "@/lib/schema";
import type { InsertServiceRequest } from "@/lib/schema";

// Submissions are emailed via FormSubmit (no server needed, works on GitHub Pages).
// After the address is activated, you can swap the email for FormSubmit's random-string alias to hide it.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/gwaoutdoors@gmail.com";

export default function ContactSection() {
  const { toast } = useToast();
  const [showLocationField, setShowLocationField] = useState(false);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const validateServiceArea = async (locationAddress: string) => {
    try {
      // Use a more reliable geocoding service - Nominatim (OpenStreetMap)
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationAddress)}&format=json&limit=1`);
      const data = await response.json();
      
      if (!data || data.length === 0 || !data[0].lat || !data[0].lon) {
        form.setError('locationAddress', {
          type: 'manual',
          message: 'Location not found. Please enter a valid city and state (e.g., Grand Rapids, MI).'
        });
        return false;
      }

      // Newaygo, Michigan coordinates
      const newaygoLat = 43.4197;
      const newaygoLon = -85.8000;
      
      const distance = calculateDistance(newaygoLat, newaygoLon, parseFloat(data[0].lat), parseFloat(data[0].lon));
      
      if (distance > 65) {
        // Reset the form and set to shop option
        form.setValue('location', 'shop');
        form.setValue('locationAddress', '');
        setShowLocationField(false);
        form.clearErrors('locationAddress');
        
        // Trigger form revalidation
        form.trigger();
        
        toast({
          title: "Outside Service Area",
          description: "This location is outside our 65-mile mobile service area. Changed to 'Bring to Shop'.",
          variant: "destructive",
        });
        return false;
      }
      
      return true;
    } catch (error) {
      form.setError('locationAddress', {
        type: 'manual',
        message: 'Unable to validate location. Please check your internet connection and try again.'
      });
      return false;
    }
  };

  const autoDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            
            // Check distance from Newaygo, Michigan
            const newaygoLat = 43.4197;
            const newaygoLon = -85.8000;
            const distance = calculateDistance(newaygoLat, newaygoLon, latitude, longitude);
            
            if (distance > 50) {
              toast({
                title: "Outside Service Area",
                description: "Your location is outside our 50-mile mobile service area. Please select 'Bring to Shop' instead.",
                variant: "destructive",
              });
              form.setValue('location', 'shop');
              setShowLocationField(false);
              return;
            }
            
            // Using a reverse geocoding service to get nearest city and state
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1&zoom=10`);
            const data = await response.json();
            
            // Extract the nearest city - prioritize city, then town, then county seat
            let city = data.address?.city || 
                      data.address?.town || 
                      data.address?.village || 
                      data.address?.municipality || 
                      data.address?.county?.replace(' County', '') || 
                      'Unknown';
            
            // Extract state abbreviation - try multiple fields
            let stateAbbr = data.address?.state_code || 
                           data.address?.['ISO3166-2-lvl4']?.split('-')[1] || 
                           'MI';
            
            // If we got a full state name, convert to abbreviation
            if (stateAbbr.length > 2) {
              const stateMap: { [key: string]: string } = {
                'Michigan': 'MI', 'Ohio': 'OH', 'Indiana': 'IN', 'Illinois': 'IL',
                'Wisconsin': 'WI', 'Minnesota': 'MN', 'Iowa': 'IA', 'Pennsylvania': 'PA'
              };
              stateAbbr = stateMap[stateAbbr] || stateAbbr.substring(0, 2).toUpperCase();
            }
            
            const locationString = `${city}, ${stateAbbr}`;
            form.setValue('locationAddress', locationString);
          } catch (error) {
            toast({
              title: "Location Detection Failed",
              description: "Please enter your location manually.",
              variant: "destructive",
            });
          }
        },
        (error) => {
          toast({
            title: "Location Access Denied",
            description: "Please enter your location manually.",
            variant: "destructive",
          });
        }
      );
    }
  };
  
  const form = useForm<InsertServiceRequest>({
    resolver: zodResolver(insertServiceRequestSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      outboard: "",
      location: "",
      locationAddress: "",
      description: "",
    },
  });

  const createServiceRequestMutation = useMutation({
    mutationFn: async (data: InsertServiceRequest) => {
      const name = `${data.firstName} ${data.lastName}`.trim();
      const serviceLocation =
        data.location === "mobile"
          ? `Mobile Service - ${data.locationAddress}`
          : "Bring to Shop (Grant, MI)";

      // Field names become the labels in the email, so keep them human-readable.
      const payload: Record<string, string> = {
        _subject: `New Service Request from ${name}`,
        _template: "table",
        _captcha: "false",
        Name: name,
        Phone: data.phone,
        Email: data.email || "Not provided",
        Outboard: data.outboard === "yes" ? "Yes" : "No",
        "Service Location": serviceLocation,
        Description: data.description,
      };
      if (data.email) payload._replyto = data.email;

      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || String(result.success) !== "true") {
        throw new Error(result.message || "Failed to send service request. Please call us instead.");
      }
      return result;
    },
    onSuccess: () => {
      toast({
        title: "Service Request Submitted!",
        description: "We will contact you within 24 hours to schedule your service.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit service request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: InsertServiceRequest) => {
    // If mobile service is selected and location address is provided, validate the service area
    if (data.location === 'mobile' && data.locationAddress) {
      const isValidLocation = await validateServiceArea(data.locationAddress);
      if (!isValidLocation) {
        return; // Stop form submission if location is invalid
      }
    }
    
    createServiceRequestMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-16 bg-[#e3e3e3] text-[#000000] mt-3">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#000000]">Get Your Motor Running</h2>
            <p className="text-xl text-[#000000]">Contact us for professional marine repair services or schedule your mobile service appointment</p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            {/* Contact Form */}
            <Card className="bg-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold marine-navy mb-6">Request Service</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="First Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Last Name" {...field} />
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
                          <FormLabel>Email Address (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="Email Address (optional)" 
                              value={field.value || ""}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              name={field.name}
                            />
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
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="Phone Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="outboard"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Outboard</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Yes or No" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Location</FormLabel>
                            <Select 
                              onValueChange={(value) => {
                                field.onChange(value);
                                setShowLocationField(value === 'mobile');
                              }} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Service Location" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="shop">Bring to Shop (Grant, MI)</SelectItem>
                                <SelectItem value="mobile">Mobile Service (Within 60 Miles)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    
                    {showLocationField && (
                      <FormField
                        control={form.control}
                        name="locationAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <div className="flex gap-2">
                              <FormControl>
                                <Input 
                                  placeholder="Enter city and state (e.g., Grand Rapids, MI)" 
                                  value={field.value || ""}
                                  onChange={field.onChange}
                                  onBlur={field.onBlur}
                                  name={field.name}
                                />
                              </FormControl>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={autoDetectLocation}
                                className="shrink-0"
                              >Current Location</Button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe the issue or service needed..." 
                              rows={4} 
                              className="resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-marine-blue hover:bg-blue-800 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 relative overflow-hidden group disabled:hover:scale-100 disabled:hover:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={createServiceRequestMutation.isPending || !form.formState.isValid}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-300/0 via-blue-300/30 to-blue-300/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <Send className={`mr-2 h-4 w-4 relative z-10 ${createServiceRequestMutation.isPending ? 'animate-pulse' : 'group-hover:translate-x-1'} transition-transform duration-300`} />
                      <span className="relative z-10">{createServiceRequestMutation.isPending ? "Submitting..." : "Submit Service Request"}</span>
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
