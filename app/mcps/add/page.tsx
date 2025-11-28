"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { createMCP } from "@/lib/queries";
import { MCPIcon } from "@/components/mcp-icon";
import { Loader2, Plus, Check } from "lucide-react";
import { toast } from "sonner";

type PricingTier = 'standard' | 'featured' | 'premium';

interface FormData {
  name: string;
  description: string;
  icon_url: string;
  cursor_deep_link: string;
  install_instructions_url: string;
  company: string;
  pricing_tier: PricingTier;
}

const pricingOptions: { tier: PricingTier; name: string; price: string; description: string }[] = [
  {
    tier: 'standard',
    name: 'Standard',
    price: 'Free',
    description: 'Get your tool listed in our tools directory and reach 300k+ writers each month.',
  },
  {
    tier: 'featured',
    name: 'Featured',
    price: '$299/m',
    description: 'Get prime placement in the featured section at the top for maximum visibility.',
  },
  {
    tier: 'premium',
    name: 'Premium',
    price: '$499/m',
    description: 'Get maximum exposure with featured placement, email promotion to our entire writer network, social media promotion, and homepage spotlight.',
  },
];

export default function AddMCPPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    icon_url: "",
    cursor_deep_link: "",
    install_instructions_url: "",
    company: "",
    pricing_tier: "standard",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePricingChange = (tier: PricingTier) => {
    setFormData((prev) => ({ ...prev, pricing_tier: tier }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter a name for your tool");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Please enter a description for your tool");
      return;
    }

    setSubmitting(true);
    try {
      const newMCP = await createMCP({
        name: formData.name.trim(),
        description: formData.description.trim(),
        icon_url: formData.icon_url.trim() || null,
        cursor_deep_link: formData.cursor_deep_link.trim() || null,
        install_instructions_url: formData.install_instructions_url.trim() || null,
        company: formData.company.trim() || null,
        pricing_tier: formData.pricing_tier,
        is_featured: formData.pricing_tier === 'featured' || formData.pricing_tier === 'premium',
      });

      if (newMCP) {
        toast.success("Tool submitted successfully!");
        router.push("/mcps");
      }
    } catch (error) {
      console.error("Error creating tool:", error);
      toast.error("Failed to submit tool. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-foreground mb-8">Add a new Tool</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Icon Preview */}
          <div className="flex items-start gap-4">
            {formData.icon_url || formData.name ? (
              <MCPIcon 
                name={formData.name || "Tool"} 
                iconUrl={formData.icon_url || null} 
                size="lg" 
              />
            ) : (
              <div className="h-16 w-16 rounded-lg border-2 border-dashed border-border bg-surface flex items-center justify-center">
                <Plus className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Resend"
              value={formData.name}
              onChange={handleInputChange}
              className="bg-surface border-border/50 focus:border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Write a description..."
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="bg-surface border-border/50 focus:border-border text-foreground placeholder:text-muted-foreground resize-none"
            />
          </div>

          {/* Tool Website Link */}
          <div className="space-y-2">
            <Label htmlFor="cursor_deep_link" className="text-foreground">Tool Website</Label>
            <Input
              id="cursor_deep_link"
              name="cursor_deep_link"
              placeholder="https://yourtool.com"
              value={formData.cursor_deep_link}
              onChange={handleInputChange}
              className="bg-surface border-border/50 focus:border-border text-foreground placeholder:text-muted-foreground"
            />
            <p className="text-sm text-muted-foreground">
              Main website or landing page for your tool.
            </p>
          </div>

          {/* Install Instructions URL */}
          <div className="space-y-2">
            <Label htmlFor="install_instructions_url" className="text-foreground">Link to documentation</Label>
            <Input
              id="install_instructions_url"
              name="install_instructions_url"
              placeholder="https://docs.yourtool.com/getting-started"
              value={formData.install_instructions_url}
              onChange={handleInputChange}
              className="bg-surface border-border/50 focus:border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Icon URL */}
          <div className="space-y-2">
            <Label htmlFor="icon_url" className="text-foreground">Icon URL</Label>
            <Input
              id="icon_url"
              name="icon_url"
              placeholder="https://example.com/icon.png"
              value={formData.icon_url}
              onChange={handleInputChange}
              className="bg-surface border-border/50 focus:border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Company */}
          <div className="space-y-2">
            <Label htmlFor="company" className="text-foreground">Company</Label>
            <div className="flex gap-2">
              <Input
                id="company"
                name="company"
                placeholder="Select company"
                value={formData.company}
                onChange={handleInputChange}
                className="flex-1 bg-surface border-border/50 focus:border-border text-foreground placeholder:text-muted-foreground"
              />
              <Button
                type="button"
                variant="outline"
                className="bg-primary text-primary-foreground hover:bg-primary/90 border-0"
              >
                Add company
              </Button>
            </div>
          </div>

          {/* Pricing Options */}
          <div className="space-y-3">
            <Label className="text-foreground">Select option</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pricingOptions.slice(0, 2).map((option) => (
                <Card
                  key={option.tier}
                  onClick={() => handlePricingChange(option.tier)}
                  className={`relative p-4 cursor-pointer transition-all ${
                    formData.pricing_tier === option.tier
                      ? "border-primary bg-surface"
                      : "border-border/50 bg-card hover:border-border"
                  }`}
                >
                  {formData.pricing_tier === option.tier && (
                    <div className="absolute top-3 right-3">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <h3 className="font-medium text-foreground">{option.name}</h3>
                  <p className="text-lg font-semibold text-foreground mt-1">{option.price}</p>
                  <p className="text-xs text-muted-foreground mt-2">{option.description}</p>
                </Card>
              ))}
            </div>
            
            {/* Premium option full width */}
            <Card
              onClick={() => handlePricingChange('premium')}
              className={`relative p-4 cursor-pointer transition-all ${
                formData.pricing_tier === 'premium'
                  ? "border-primary bg-surface"
                  : "border-border/50 bg-card hover:border-border"
              }`}
            >
              {formData.pricing_tier === 'premium' && (
                <div className="absolute top-3 right-3">
                  <Check className="h-4 w-4 text-primary" />
                </div>
              )}
              <h3 className="font-medium text-foreground">{pricingOptions[2].name}</h3>
              <p className="text-lg font-semibold text-foreground mt-1">{pricingOptions[2].price}</p>
              <p className="text-xs text-muted-foreground mt-2">{pricingOptions[2].description}</p>
            </Card>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base font-semibold"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </main>
    </div>
  );
}
