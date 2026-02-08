# Email Signature Generator

A lightweight, mobile-first tool for creating professional email signatures that work across all email clients.

## Why This Exists

Email signatures require an ancient tech stack: table-based layouts, inline CSS, and zero JavaScript. This generator creates clean, compatible HTML that renders consistently in Gmail, Outlook, Apple Mail, and other clients.

## Critical Design Principle: No Nested Frames

**The most important rule**: Avoid frame-within-frame rendering at all costs.

### The Problem
When building a signature preview UI, it's tempting to wrap components in multiple containers (cards, divs, borders). This creates visual nesting that looks unprofessional and confusing.

### The Solution
- The preview container provides ONE border
- The signature HTML itself has NO outer borders (except decorative internal elements like dividers)
- Each signature template is self-contained without wrapper frames
- The preview shows exactly what recipients will see in their inbox

### Example of What NOT To Do
\`\`\`html
<!-- BAD: Frame within frame -->
<div class="preview-card">           <!-- Outer frame -->
  <table style="border: 1px solid">   <!-- Inner frame -->
    <!-- Signature content -->
  </table>
</div>
\`\`\`

### Example of What TO Do
\`\`\`html
<!-- GOOD: Clean preview -->
<div class="preview-card">            <!-- Only frame -->
  <table style="border: 0">            <!-- No frame -->
    <!-- Signature content -->
  </table>
</div>
\`\`\`

## Features

- **3 Professional Styles**: Minimalist, Creator, Pro
- **Email-Safe HTML**: Tables, inline CSS, maximum compatibility
- **Mobile-First**: Responsive design with touch-optimized buttons
- **Copy Methods**: Visual copy for direct paste, HTML copy for settings
- **Lightweight**: No frameworks, minimal dependencies

## Usage

1. Select a signature style
2. Preview how it looks
3. Click "Copy Signature" to paste directly into email settings
4. Or click "Copy HTML Code" for manual HTML insertion

## Technical Notes

- All styles use system fonts for reliability
- Images must be hosted publicly (replace placeholder URLs)
- Gradients work in most clients but may fall back to solid colors
- The "Schedule Time" button uses your Outlook booking link

## Installation in Email Clients

- **Gmail**: Settings → General → Signature → Paste
- **Outlook Desktop**: File → Options → Mail → Signatures → Paste HTML
- **Apple Mail**: Mail → Settings → Signatures → Paste HTML

---

Built with Next.js 16, shadcn/ui, and a deep respect for the constraints of email HTML.
