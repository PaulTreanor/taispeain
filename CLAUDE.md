# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server at localhost:4321
- `npm run build` - Build production site to ./dist/
- `npm run preview` - Preview build locally
- `npm run astro` - Access Astro CLI commands

## Architecture

This is an Astro project using the basic template structure:

- **Pages**: Located in `src/pages/` - Astro uses file-based routing
- **Layouts**: Located in `src/layouts/` - Shared page templates 
- **Components**: Located in `src/components/` - Reusable Astro components
- **Assets**: Located in `src/assets/` - Static assets and images
- **Public**: Located in `public/` - Static files served directly

The project uses TypeScript with Astro's strict configuration. Components are written in `.astro` format which combines HTML-like templates with JavaScript/TypeScript.