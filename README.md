# Email Signature Generator

A lightweight, mobile-first tool for creating professional email signatures that work across all email clients. Built with [v0](https://v0.dev) and refined by hand.

## Features

- **3 Professional Styles**: Minimalist, Creator (with avatar), Pro (structured with dividers)
- **Email-Safe HTML**: Table-based layouts, inline CSS, maximum compatibility across Gmail, Outlook, Apple Mail
- **Live Preview**: See your signature update as you type
- **Dark Mode**: System-aware theme with manual toggle
- **Copy Methods**: Visual copy for direct paste, HTML copy for email client settings
- **Field Visibility**: Hide any field you don't need

## Usage

1. Fill in your details (placeholder values show until you type)
2. Select a signature style
3. Click **Copy Signature** to paste directly into Gmail/Outlook
4. Or click **Copy HTML Code** for manual HTML insertion

## Installation in Email Clients

- **Gmail**: Settings > See all settings > General > Signature > Paste
- **Outlook Desktop**: File > Options > Mail > Signatures > Paste HTML
- **Apple Mail**: Mail > Settings > Signatures > Paste HTML

## Design Principle: No Nested Frames

The signature preview uses a single container border. The signature HTML itself has no outer borders — what you see in the preview is exactly what recipients see in their inbox.

## Tech Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui components
- `next-themes` for dark mode (the `ThemeProvider` wrapper is a [v0 convention](https://v0.dev) for system-aware theming)

## Running Locally

```bash
npm install
npm run dev
```

## Notes

- All signature styles use system fonts for maximum email client reliability
- For the Creator style, upload your own photo or host the image at a public URL
- The "Schedule a Meeting" button links to your scheduling URL (Calendly, Cal.com, etc.)
- Gradients render in most clients but may fall back to solid colors in older Outlook versions
