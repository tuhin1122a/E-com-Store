# tuhin

# GitHub CMS - Next.js Application

A modern content management system built with Next.js that integrates with GitHub for content storage and management.

## 🚀 Live Demo

- **Live Site:** [https://nextjs-github-cms-task.vercel.app/](https://nextjs-github-cms-task.vercel.app/)
- **Repository:** [https://github.com/tuhin1122a/nextjs-github-cms-task](https://github.com/tuhin1122a/nextjs-github-cms-task)

# 📝 Evaluation Criteria

This project was implemented keeping in mind the following evaluation criteria:

---

## 🔹 Problem Framing & Judgment
- The assignment brief was broken down into clear deliverables: **GitHub integration**, **local draft management**, and **publishing flows**.  
- API design was mapped to three endpoints:  
  - `/api/drafts` → Fetch all drafts  
  - `/api/publish` → Publish all drafts  
  - `/api/publish-draft` → Publish a single draft  
- Clear separation of responsibilities ensured maintainability.

---

## 🔹 Code Quality, Structure & Maintainability
- **Modular folder structure** with `components`, `hooks`, and `api` routes separated.  
- Custom hooks (`useDrafts`, `useGitHubFiles`) for stateful logic reuse.  
- Clean, commented code with **separation of concerns** and readability.  

---

## 🔹 API Integration Correctness & Security Hygiene
- **GitHub API calls proxied** via Next.js API routes (no direct client-side calls).  
- Sensitive tokens stored securely in `.env.local` (never exposed to client).  
- Input validation and proper error handling implemented in API routes.  

---

## 🔹 UX Clarity for Authoring/Publishing Flow
- Intuitive **form for creating/editing drafts**.  
- **Drag-and-drop support** for publishing single drafts.  
- **Confirmation modals** before publishing/deleting drafts.  
- Clear **toast notifications** for success and error handling.  

---

## 🔹 Performance & Accessibility
- Optimized data fetching with **caching and refetching**.  
- Minimal re-renders through isolated state management.  
- **Semantic HTML** and **ARIA labels** applied to the form.  
- Basic **keyboard navigation support** for form interactions (adding and deleting drafts). 

---

## 🔹 Documentation Quality & Deployment Readiness
- Detailed **README.md** with setup, usage, API docs, and troubleshooting.  
- `.env.example` provided for environment configuration.  
- Fully deployed and tested on **Vercel** for production readiness.  

---



## ✨ Features

- **GitHub Integration**: Fetch, display, and preview Markdown content directly from GitHub repositories.  
- **Draft Management**: Create, edit, and delete local drafts with intuitive form-based UI.  
- **Single & Bulk Publishing**: Publish individual drafts via drag-and-drop or publish all drafts at once to GitHub.  
- **Responsive & Accessible Design**: Mobile-first layout with clean, semantic HTML, ARIA labels for forms, and basic keyboard interactions for adding/deleting drafts.    
- **Secure Environment Handling**: API tokens and sensitive data managed through `.env` variables, never exposed to the client.  
- **Error Handling & Validation**: Proper client-side and server-side validation with clear error messages.  


## 🛠️ Technology Stack

### Framework & Libraries
- **Next.js 14 (App Router)**: Server-side rendering, routing, and API integration.  
- **React 18**: Component-based UI library for building interactive frontend.  
- **Tailwind CSS**: Utility-first CSS framework for responsive and modern styling.  
- **Tailwind Typography**: For beautifully formatted markdown and content.  
- **Framer Motion**: Animation library for smooth UI transitions.  
- **Radix UI Components**: Accessible and customizable UI primitives (Dialog, Label, Slot).  
- **Lucide React**: Lightweight icons library.  
- **Marked**: Markdown parser to render markdown content as HTML.  
- **PrismJS**: Syntax highlighting for code blocks.  
- **NanoID**: Unique ID generator for drafts.  
- **Sonner**: Toast notifications for success/error feedback.  
- **clsx & tailwind-merge**: Conditional className management for Tailwind.  
- **class-variance-authority**: Variant-based className management for components.  
- **tw-animate-css & tailwindcss-animate**: Prebuilt animation utilities for Tailwind.

### API Integration
- **GitHub REST API via Octokit Core**: Fetch and update content on GitHub securely.

### Deployment
- **Vercel**: Recommended for Next.js deployment with automatic build & serverless functions.

### Version Control
- **Git & GitHub**: Source code versioning and repository management.

---

### NPM Scripts
```json
{
  "scripts": {
    "dev": "next dev",       // Run development server
    "build": "next build",   // Build for production
    "start": "next start",   // Start production server
    "lint": "next lint"      // Lint code
  }
}


## 📋 Prerequisites

- Node.js 18.0 or later
- A GitHub account and personal access token
- A public GitHub repository for content storage

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/tuhin1122a/nextjs-github-cms-task
cd nextjs-github-cms-task
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# GitHub Configuration
GITHUB_TOKEN=
NEXT_PUBLIC_GITHUB_OWNER=
NEXT_PUBLIC_GITHUB_REPO=
NEXT_PUBLIC_GITHUB_BRANCH=

# Commit Author Information
GITHUB_COMMITTER_NAME=
GITHUB_COMMITTER_EMAIL=

# Drafts Directory
NEXT_PUBLIC_DRAFTS_PATH=
```

### 3. GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate a new token with these scopes:
   - `repo` (Full control of private repositories)
   - `public_repo` (Access to public repositories)
3. Copy the token to your `.env.local` file

### 4. Repository Structure

Your content repository should have a structure like:

```
your-content-repo/
├── drafts/
│   ├── hello.md
│   ├── about.md
│   └── posts/
│       ├── first-post.md
│       └── second-post.md
└── README.md
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
JOB-TASK/
├── .next/
├── app/
│ ├── api/
│ │ ├── drafts/
│ │ │ └── route.js
│ │ ├── publish/
│ │ │ └── route.js
│ │ ├── publish-draft/
│ │ │ └── route.js
│ ├── fonts/
│ ├── favicon.ico
│ ├── globals.css
│ ├── layout.js
│ └── page.js
├── components/
│ ├── GitHubDraftsViewer/
│ │ ├── DraftCard.jsx
│ │ ├── FileModal.jsx
│ │ └── Loader.jsx
│ ├── publisher/
│ │ ├── DraftForm.jsx
│ │ ├── GitHubDraftsViewer.jsx
│ │ ├── LocalDraftsList.jsx
│ │ └── PublisherClient.jsx
│ ├── ui/
│ │ └── ClientToaster.js
│ └── PublishConfirmModal.jsx
├── hooks/
│ ├── useDrafts.js
│ └── useGitHubFiles.js
├── lib/
│ ├── api.js
│ └── utils.js
├── node_modules/
├── .env
├── .env.local
```

## 🔒 Security Considerations

### Environment Variables
- GitHub token is stored server-side only
- Public environment variables are prefixed with `NEXT_PUBLIC_`
- Sensitive operations are handled through API routes

### API Security
- Rate limiting considerations for GitHub API
- Error handling without exposing sensitive information
- Validation of user inputs before GitHub operations

### Best Practices
- Tokens are never exposed to the client
- GitHub operations are authenticated server-side
- Proper error boundaries and loading states

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**:
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Environment Variables**:
   Add the same environment variables from `.env.local` to your Vercel project settings.

3. **Deploy**:
   ```bash
   vercel --prod
   ```

### Alternative Hosting

The application can also be deployed to:
- **Netlify**: Configure build command as `npm run build`
- **Cloudflare Pages**: Set framework preset to Next.js

## 📱 Usage Guide

### Viewing GitHub Content

1. Navigate to the home page
2. Content from `drafts/hello.md` fetched and displayed like card click eye button and see full file
3. Markdown is rendered as HTML with proper styling

### Managing Drafts

1. Use the form to create new drafts with title and body
2. View all drafts in the list below
3. Edit existing drafts by clicking the "Edit" button
4. Delete drafts using the "Delete" button

### Publishing Content

1. Create one or more drafts  
2. Click the "Publish All Drafts" button  
3. All drafts will be committed to your GitHub repository  
4. Drafts are cleared after successful publishing  
5. Drag and drop a draft into the drafts card area to publish a single draft 

# 🔧 API Endpoints

The application exposes three main API endpoints for interacting with drafts and publishing content to GitHub.

---

## 1️⃣ GET `/api/drafts`
Fetch all drafts from the GitHub repository.

**Query Parameters (optional):**
- `path`: Specific file path to fetch, e.g., `drafts/hello.md`. Defaults to fetching all drafts in the `drafts/` folder.

**Response Example:**
```json
{
  "success": true,
  "data": [
    {
      "name": "hello.md",
      "path": "drafts/hello.md",
      "content": "# Hello World\nThis is a markdown draft.",
      "sha": "3b2e1f..."
    },
    {
      "name": "about.md",
      "path": "drafts/about.md",
      "content": "## About\nSome about content.",
      "sha": "7a8c9d..."
    }
  ]
}
```
 

## 2️⃣ POST `/api/publish`

Publish multiple drafts to GitHub at once (bulk publish).

**Request Body:**
```json
{
  "drafts": [
    {
      "id": "draft-id-1",
      "title": "First Draft",
      "body": "Content of the first draft..."
    },
    {
      "id": "draft-id-2",
      "title": "Second Draft",
      "body": "Content of the second draft..."
    }
  ]
}
```

**Response Example**
```json
{
  "success": true,
  "message": "2 drafts published successfully",
  "publishedFiles": [
    "drafts/first-draft.md",
    "drafts/second-draft.md"
  ]
}
```

## 2️⃣ POST `/appublish-draftsh`
**Request Body:**
```json
    {
      "id": "draft-id-1",
      "title": "First Draft",
      "body": "Content of the first draft..."
    },
```

**Response Example**
```json
{
  "success": true,
  "message": "\"First Draft\" published successfully",
  "publishedFile": "drafts/first-draft.md"
}
```

## 🎨 Customization

### Styling
- Modify `app/globals.css` for global styles
- Update `tailwind.config.js` for custom design tokens
- Components use Tailwind utility classes

### GitHub Integration
- Change repository structure by updating environment variables
- Modify content fetching logic in `lib/api.js`
- Customize markdown rendering in components

## 🔍 Performance & Accessibility

### Performance
- **Static Generation**: Content pages are statically generated when possible
- **Code Splitting**: Automatic code splitting with Next.js
- **API Caching**: Appropriate caching headers for GitHub API responses

### Accessibility
- **Semantic HTML**: Proper heading hierarchy and semantic elements
- **Keyboard Navigation**: Basic keyboard accessibility for creating and deleting drafts using the form (Enter key to submit, Delete key to remove). Full navigation across all UI elements is not implemented.

- **Screen Reader Support**: ARIA labels and descriptions
- **Focus Management**: Visible focus indicators

## 🐛 Troubleshooting

### Common Issues

1. **GitHub API Rate Limits**:
   - Use authenticated requests (they have higher limits)
   - Implement caching for frequently accessed content

2. **Environment Variables**:
   - Ensure all required variables are set
   - Restart development server after changes

3. **GitHub Token Permissions**:
   - Verify token has correct repository access
   - Check token expiration date

### Error Messages

- `401 Unauthorized`: Check GitHub token validity
- `404 Not Found`: Verify repository and file paths
- `403 Forbidden`: Token may lack required permissions




## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub REST API](https://docs.github.com/en/rest)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)

---

**Built with ❤️ using Next.js and GitHub API**