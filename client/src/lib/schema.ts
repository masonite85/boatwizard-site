import { z } from "zod";

export const insertServiceRequestSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  phone: z.string().min(1, "Phone number is required").refine((phone) => {
    // Remove all non-digit characters and check if exactly 10 digits
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length === 10;
  }, "Phone number must contain exactly 10 digits"),
  outboard: z.string().min(1, "Outboard selection is required"),
  location: z.string().min(1, "Service location is required"),
  locationAddress: z.string().optional(),
  description: z.string().min(1, "Description is required"),
}).superRefine((data, ctx) => {
  // If mobile service is selected, locationAddress is required and must be in "city, state" format
  if (data.location === 'mobile') {
    if (!data.locationAddress || data.locationAddress.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Location is required for mobile service",
        path: ['locationAddress'],
      });
    } else {
      const locationRegex = /^[^,]+,\s*[A-Z]{2}$/i;
      if (!locationRegex.test(data.locationAddress.trim())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter location in format: City, ST (e.g., Grand Rapids, MI)",
          path: ['locationAddress'],
        });
      }
    }
  }
});

export type InsertServiceRequest = z.infer<typeof insertServiceRequestSchema>;
