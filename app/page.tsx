"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, Copy, Upload, X, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface FormData {
  name: string
  tagline: string
  phone: string
  email: string
  website: string
  schedulingUrl: string
  avatarUrl: string
}

const defaultFormData: FormData = {
  name: "",
  tagline: "",
  phone: "",
  email: "",
  website: "",
  schedulingUrl: "",
  avatarUrl: "/professional-headshot-placeholder.jpg",
}

const placeholders: Record<keyof Omit<FormData, "avatarUrl">, string> = {
  name: "Jack Johnson",
  tagline: "Building Connections",
  phone: "414-927-2948",
  email: "jack@company.com",
  website: "YourCompanyHere.com",
  schedulingUrl: "https://calendly.com/your-link",
}

const fieldLabels: Record<keyof Omit<FormData, "avatarUrl">, string> = {
  name: "Full Name",
  tagline: "Title / Tagline",
  phone: "Phone Number",
  email: "Email Address",
  website: "Website",
  schedulingUrl: "Scheduling Link",
}

const getDisplayValue = (data: FormData, field: keyof Omit<FormData, "avatarUrl">): string => {
  return data[field] || placeholders[field]
}

const generateSignatures = (data: FormData, hiddenFields: Set<string>) => {
  const show = (field: keyof FormData) => !hiddenFields.has(field)
  const getValue = (field: keyof Omit<FormData, "avatarUrl">) => getDisplayValue(data, field)

  return {
    minimalist: `<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; line-height: 1.4; color: #2d3748; max-width: 500px;">
  <tr>
    <td style="padding: 16px 0;">
      ${show("name") ? `<div style="font-size: 18px; font-weight: 600; margin-bottom: 3px; color: #1a202c; letter-spacing: -0.02em;">${getValue("name")}</div>` : ""}
      ${show("tagline") ? `<div style="font-size: 12px; color: #718096; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em;">${getValue("tagline")}</div>` : ""}
      
      <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px;">
        ${
          show("phone")
            ? `<tr>
          <td style="font-size: 13px; color: #4a5568; padding-bottom: 4px;"><a href="tel:${getValue("phone")}" style="color: #2d3748; text-decoration: none;">${getValue("phone")}</a></td>
        </tr>`
            : ""
        }
        ${
          show("website")
            ? `<tr>
          <td style="font-size: 13px; color: #4a5568;"><a href="https://${getValue("website")}" style="color: #2d3748; text-decoration: none;">${getValue("website")}</a></td>
        </tr>`
            : ""
        }
      </table>
      
      ${show("schedulingUrl") ? `<a href="${getValue("schedulingUrl")}" style="display: inline-block; padding: 8px 16px; background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%); color: #fff; text-decoration: none; border-radius: 6px; font-size: 12px; font-weight: 500; letter-spacing: 0.02em;">Schedule a Meeting</a>` : ""}
    </td>
  </tr>
</table>`,

    creator: `<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; line-height: 1.5; color: #2d3748; max-width: 550px;">
  <tr>
    <td style="padding: 20px 0;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          ${
            !hiddenFields.has("avatarUrl")
              ? `<td style="vertical-align: top; padding-right: 20px;">
            <img src="${data.avatarUrl}" alt="${getValue("name")}" style="width: 72px; height: 72px; border-radius: 50%; display: block; border: 2px solid #a0aec0; box-shadow: 0 2px 8px rgba(45, 55, 72, 0.12); object-fit: cover; object-position: center;" />
          </td>`
              : ""
          }
          <td style="vertical-align: top;">
            ${show("name") ? `<div style="font-size: 19px; font-weight: 600; margin-bottom: 2px; color: #1a202c; letter-spacing: -0.02em;">${getValue("name")}</div>` : ""}
            ${show("tagline") ? `<div style="font-size: 12px; color: #718096; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 500;">${getValue("tagline")}</div>` : ""}
            
            <table cellpadding="0" cellspacing="0" border="0">
              ${
                show("phone")
                  ? `<tr>
                <td style="font-size: 11px; color: #a0aec0; padding-bottom: 5px; width: 55px; text-transform: uppercase; letter-spacing: 0.05em;">Phone</td>
                <td style="font-size: 13px; padding-bottom: 5px;"><a href="tel:${getValue("phone")}" style="color: #2d3748; text-decoration: none; font-weight: 500;">${getValue("phone")}</a></td>
              </tr>`
                  : ""
              }
              ${
                show("email")
                  ? `<tr>
                <td style="font-size: 11px; color: #a0aec0; padding-bottom: 5px; text-transform: uppercase; letter-spacing: 0.05em;">Email</td>
                <td style="font-size: 13px; padding-bottom: 5px;"><a href="mailto:${getValue("email")}" style="color: #2d3748; text-decoration: none; font-weight: 500;">${getValue("email")}</a></td>
              </tr>`
                  : ""
              }
              ${
                show("website")
                  ? `<tr>
                <td style="font-size: 11px; color: #a0aec0; padding-bottom: 5px; text-transform: uppercase; letter-spacing: 0.05em;">Web</td>
                <td style="font-size: 13px; padding-bottom: 5px;"><a href="https://${getValue("website")}" style="color: #2d3748; text-decoration: none; font-weight: 500;">${getValue("website")}</a></td>
              </tr>`
                  : ""
              }
            </table>
            
            ${
              show("schedulingUrl")
                ? `<div style="margin-top: 14px;">
              <a href="${getValue("schedulingUrl")}" style="display: inline-block; padding: 8px 18px; background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%); color: #fff; text-decoration: none; border-radius: 6px; font-size: 12px; font-weight: 500; letter-spacing: 0.02em;">Book a Meeting</a>
            </div>`
                : ""
            }
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`,

    pro: `<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; line-height: 1.5; color: #2d3748; max-width: 580px;">
  <tr>
    <td style="padding: 20px 0;">
      <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
        <tr>
          <td style="padding-bottom: 14px; border-bottom: 1px solid #e2e8f0;">
            ${show("name") ? `<div style="font-size: 20px; font-weight: 600; margin-bottom: 3px; color: #1a202c; letter-spacing: -0.02em;">${getValue("name")}</div>` : ""}
            ${show("tagline") ? `<div style="font-size: 12px; color: #718096; text-transform: uppercase; letter-spacing: 0.06em;">${getValue("tagline")}</div>` : ""}
          </td>
        </tr>
        <tr>
          <td style="padding-top: 14px;">
            <div style="font-size: 10px; color: #a0aec0; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; font-weight: 500;">Contact</div>
            ${show("phone") ? `<div style="font-size: 13px; margin-bottom: 4px;"><a href="tel:${getValue("phone")}" style="color: #2d3748; text-decoration: none;">${getValue("phone")}</a></div>` : ""}
            ${show("email") ? `<div style="font-size: 13px; margin-bottom: 4px;"><a href="mailto:${getValue("email")}" style="color: #2d3748; text-decoration: none;">${getValue("email")}</a></div>` : ""}
            ${show("website") ? `<div style="font-size: 13px; margin-bottom: 14px;"><a href="https://${getValue("website")}" style="color: #2d3748; text-decoration: none;">${getValue("website")}</a></div>` : ""}
            ${show("schedulingUrl") ? `<a href="${getValue("schedulingUrl")}" style="display: inline-block; padding: 10px 22px; background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%); color: #fff; text-decoration: none; border-radius: 6px; font-size: 12px; font-weight: 500; letter-spacing: 0.02em;">Schedule Time</a>` : ""}
          </td>
        </tr>
        <tr>
          <td style="padding-top: 14px;">
            <div style="background: linear-gradient(90deg, #a0aec0 0%, #cbd5e0 50%, #a0aec0 100%); height: 2px; width: 100%; border-radius: 1px;"></div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`,
  }
}

type SignatureType = "minimalist" | "creator" | "pro"

export default function EmailSignaturePage() {
  const [selectedSignature, setSelectedSignature] = useState<SignatureType>("minimalist")
  const [copiedType, setCopiedType] = useState<"html" | "visual" | null>(null)
  const [formData, setFormData] = useState<FormData>(defaultFormData)
  const [hiddenFields, setHiddenFields] = useState<Set<string>>(new Set())
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const signatures = generateSignatures(formData, hiddenFields)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const hideField = (field: string) => {
    setHiddenFields((prev) => new Set([...prev, field]))
  }

  const showAllFields = () => {
    setHiddenFields(new Set())
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatarUrl: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, avatarUrl: defaultFormData.avatarUrl }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const copyToClipboard = async (type: "html" | "visual") => {
    const html = signatures[selectedSignature]

    if (type === "html") {
      await navigator.clipboard.writeText(html)
    } else {
      const blob = new Blob([html], { type: "text/html" })
      const data = [new ClipboardItem({ "text/html": blob })]
      await navigator.clipboard.write(data)
    }

    setCopiedType(type)
    toast({
      title: type === "html" ? "HTML copied!" : "Signature copied!",
      description:
        type === "html" ? "Paste the code into your email settings" : "Paste directly into Gmail or Outlook settings",
    })

    setTimeout(() => setCopiedType(null), 2000)
  }

  const renderField = (field: keyof Omit<FormData, "avatarUrl">) => {
    if (hiddenFields.has(field)) return null

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor={field} className="text-sm font-medium">
            {fieldLabels[field]}
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => hideField(field)}
                  className="text-muted-foreground/40 hover:text-muted-foreground transition-colors p-0.5 rounded"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-xs">Don't need this in my signature</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id={field}
          type={field === "email" ? "email" : "text"}
          value={formData[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholders[field]}
          className="placeholder:text-muted-foreground/40"
        />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background py-8 px-4 sm:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-5xl font-semibold mb-3 text-foreground tracking-tight text-balance">
            Email Signature Generator
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg font-light tracking-wide">
            Customize your details, choose a style, and copy your signature
          </p>
        </div>

        <Card className="p-5 sm:p-7 mb-8 border-border">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-widest">
              Your Information
            </h2>
            {hiddenFields.size > 0 && (
              <button
                onClick={showAllFields}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                Show hidden fields ({hiddenFields.size})
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {renderField("name")}
            {renderField("tagline")}
            {renderField("phone")}
            {renderField("email")}
            {renderField("website")}
            {renderField("schedulingUrl")}

            {!hiddenFields.has("avatarUrl") && (
              <div className="sm:col-span-2 space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Profile Photo (for The Creator)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => hideField("avatarUrl")}
                          className="text-muted-foreground/40 hover:text-muted-foreground transition-colors p-0.5 rounded"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p className="text-xs">Don't need this in my signature</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={formData.avatarUrl || "/placeholder.svg"}
                      alt="Avatar preview"
                      className="w-16 h-16 rounded-full object-cover border-2 border-border"
                    />
                    {formData.avatarUrl !== defaultFormData.avatarUrl && (
                      <button
                        onClick={removeImage}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/90 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="avatar-upload"
                    />
                    <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="gap-2">
                      <Upload className="w-4 h-4" />
                      Upload Photo
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1.5">Any image will be auto-cropped to fit</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        <div className="flex flex-col gap-3 mb-8 sm:grid sm:grid-cols-3 sm:gap-4">
          <button
            onClick={() => setSelectedSignature("minimalist")}
            className={`group relative p-5 sm:p-6 rounded-xl border transition-all duration-300 text-left touch-manipulation overflow-hidden ${
              selectedSignature === "minimalist"
                ? "border-foreground/30 bg-card shadow-lg"
                : "border-border bg-card/60 hover:border-foreground/20 hover:bg-card active:scale-[0.98]"
            }`}
          >
            <div className="relative z-10">
              <div className="font-semibold mb-1.5 text-base sm:text-lg text-foreground tracking-tight">
                The Minimalist
              </div>
              <div className="text-sm text-muted-foreground font-light">Clean typography, maximum impact</div>
            </div>
            {selectedSignature === "minimalist" && (
              <div className="absolute inset-0 bg-gradient-to-br from-accent/50 to-transparent pointer-events-none" />
            )}
          </button>

          <button
            onClick={() => setSelectedSignature("creator")}
            className={`group relative p-5 sm:p-6 rounded-xl border transition-all duration-300 text-left touch-manipulation overflow-hidden ${
              selectedSignature === "creator"
                ? "border-foreground/30 bg-card shadow-lg"
                : "border-border bg-card/60 hover:border-foreground/20 hover:bg-card active:scale-[0.98]"
            }`}
          >
            <div className="relative z-10">
              <div className="font-semibold mb-1.5 text-base sm:text-lg text-foreground tracking-tight">
                The Creator
              </div>
              <div className="text-sm text-muted-foreground font-light">Avatar-focused with personality</div>
            </div>
            {selectedSignature === "creator" && (
              <div className="absolute inset-0 bg-gradient-to-br from-accent/50 to-transparent pointer-events-none" />
            )}
          </button>

          <button
            onClick={() => setSelectedSignature("pro")}
            className={`group relative p-5 sm:p-6 rounded-xl border transition-all duration-300 text-left touch-manipulation overflow-hidden ${
              selectedSignature === "pro"
                ? "border-foreground/30 bg-card shadow-lg"
                : "border-border bg-card/60 hover:border-foreground/20 hover:bg-card active:scale-[0.98]"
            }`}
          >
            <div className="relative z-10">
              <div className="font-semibold mb-1.5 text-base sm:text-lg text-foreground tracking-tight">The Pro</div>
              <div className="text-sm text-muted-foreground font-light">Structured with accent details</div>
            </div>
            {selectedSignature === "pro" && (
              <div className="absolute inset-0 bg-gradient-to-br from-accent/50 to-transparent pointer-events-none" />
            )}
          </button>
        </div>

        <div className="bg-card p-6 sm:p-10 border border-border rounded-xl mb-5 sm:mb-6 shadow-sm overflow-x-auto">
          <h2 className="text-xs sm:text-sm font-medium mb-6 text-muted-foreground uppercase tracking-widest">
            Preview
          </h2>
          <div dangerouslySetInnerHTML={{ __html: signatures[selectedSignature] }} />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-5 sm:mb-6">
          <Button
            onClick={() => copyToClipboard("visual")}
            className="gap-2 w-full sm:w-auto h-12 text-base touch-manipulation font-medium"
            size="lg"
          >
            {copiedType === "visual" ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            {copiedType === "visual" ? "Copied!" : "Copy Signature"}
          </Button>

          <Button
            onClick={() => copyToClipboard("html")}
            variant="outline"
            className="gap-2 w-full sm:w-auto h-12 text-base touch-manipulation font-medium"
            size="lg"
          >
            {copiedType === "html" ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            {copiedType === "html" ? "Copied!" : "Copy HTML Code"}
          </Button>
        </div>

        <Card className="p-5 sm:p-7 bg-secondary/50 border-border">
          <h3 className="font-semibold mb-4 text-base sm:text-lg text-foreground tracking-tight">How to Install</h3>
          <div className="space-y-3 text-sm sm:text-base text-muted-foreground font-light">
            <div>
              <span className="font-medium text-foreground">Gmail:</span> Settings → See all settings → General →
              Signature → Click "Copy Signature" button above and paste
            </div>
            <div>
              <span className="font-medium text-foreground">Outlook (Desktop):</span> File → Options → Mail → Signatures
              → Click "Copy HTML Code" and paste
            </div>
            <div>
              <span className="font-medium text-foreground">Apple Mail:</span> Mail → Settings → Signatures → Click
              "Copy HTML Code" and paste
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground/70 pt-3 border-t border-border mt-5">
              Note: For The Creator style, upload your own photo or host the image online for best email client
              compatibility.
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
