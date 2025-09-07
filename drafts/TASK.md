# TASK

# GitHub CMS - Next.js Application

A modern content management system built with Next.js that integrates with GitHub for content storage and management.

## 🚀 Live Demo

- **Live Site:** [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/your-username/github-cms-nextjs)
- **Repository:** [GitHub Repo](https://github.com/your-username/github-cms-nextjs)

## ✨ Features

- **GitHub Integration**: Fetch and display Markdown content from GitHub repositories
- **Draft Management**: Create, edit, and delete content drafts locally
- **Bulk Publishing**: Publish all drafts to GitHub with a single click
- **Responsive Design**: Clean, accessible UI built with Tailwind CSS
- **Real-time Updates**: Dynamic content rendering with proper error handling
- **Security**: Environment-based API token management

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **API Integration**: GitHub REST API
- **Deployment**: Vercel (recommended)
- **Version Control**: Git + GitHub

## 📋 Prerequisites

- Node.js 18.0 or later
- A GitHub account and personal access token
- A public GitHub repository for content storage

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/github-cms-nextjs.git
cd github-cms-nextjs
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# GitHub Configuration
GITHUB_TOKEN=your_github_personal_access_token
NEXT_PUBLIC_GITHUB_OWNER=your-github-username
NEXT_PUBLIC_GITHUB_REPO=your-content-repository
NEXT_PUBLIC_GITHUB_BRANCH=main

# Optional: Custom content directory
NEXT_PUBLIC_CONTENT_DIR=content
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
├── content/
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
github-cms-nextjs/
├── app/
│   ├── api/
│   │   ├── github/
│   │   │   ├── content/
│   │   │   │   └── route.ts
│   │   │   └── publish/
│   │   │       └── route.ts
│   │   └── drafts/
│   │       └── route.ts
│   ├── components/
│   │   ├── ContentViewer.tsx
│   │   ├── DraftEditor.tsx
│   │   ├── DraftList.tsx
│   │   └── PublishButton.tsx
│   ├── lib/
│   │   ├── github.ts
│   │   └── utils.ts
│   ├── dashboard/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── types/
│   └── index.ts
├── .env.local.example
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.js
└── README.md
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
2. Content from `content/hello.md` is automatically fetched and displayed
3. Markdown is rendered as HTML with proper styling

### Managing Drafts

1. Go to the Dashboard (`/dashboard`)
2. Use the form to create new drafts with title and body
3. View all drafts in the list below
4. Edit existing drafts by clicking the "Edit" button
5. Delete drafts using the "Delete" button

### Publishing Content

1. Create one or more drafts
2. Click the "Publish All Drafts" button
3. All drafts will be committed to your GitHub repository
4. Drafts are cleared after successful publishing

## 🔧 API Endpoints

### GET `/api/github/content`
Fetch content from GitHub repository.

**Query Parameters:**
- `path` (optional): File path, defaults to `content/hello.md`

### POST `/api/github/publish`
Publish drafts to GitHub repository.

**Body:**
```json
{
  "drafts": [
    {
      "id": "draft-id",
      "title": "Draft Title",
      "body": "Draft content..."
    }
  ]
}
```

### GET/POST/PUT/DELETE `/api/drafts`
Manage local drafts (stored in memory/session).

## 🎨 Customization

### Styling
- Modify `app/globals.css` for global styles
- Update `tailwind.config.js` for custom design tokens
- Components use Tailwind utility classes

### GitHub Integration
- Change repository structure by updating environment variables
- Modify content fetching logic in `lib/github.ts`
- Customize markdown rendering in components

## 🔍 Performance & Accessibility

### Performance
- **Static Generation**: Content pages are statically generated when possible
- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Next.js Image component for optimized images
- **API Caching**: Appropriate caching headers for GitHub API responses

### Accessibility
- **Semantic HTML**: Proper heading hierarchy and semantic elements
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and descriptions
- **Color Contrast**: WCAG compliant color schemes
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

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub REST API](https://docs.github.com/en/rest)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)

---

**Built with ❤️ using Next.js and GitHub API**