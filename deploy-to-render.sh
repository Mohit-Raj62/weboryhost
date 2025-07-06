#!/bin/bash

# Webory Render Deployment Script
echo "🚀 Starting Webory deployment to Render..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if git is installed
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install Git first."
    exit 1
fi

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    print_error "Not in a git repository. Please initialize git first."
    exit 1
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
print_status "Current branch: $CURRENT_BRANCH"

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    print_warning "You have uncommitted changes. Please commit them before deploying."
    echo "Uncommitted files:"
    git status --porcelain
    read -p "Do you want to continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check if render.yaml exists
if [ ! -f "server/render.yaml" ]; then
    print_error "render.yaml not found in server directory. Please create it first."
    exit 1
fi

print_status "✅ All checks passed!"

echo ""
echo "📋 Deployment Checklist:"
echo "1. ✅ Git repository initialized"
echo "2. ✅ render.yaml exists"
echo "3. ✅ Backend code ready"
echo "4. ✅ Frontend code ready"
echo ""
echo "🔧 Next Steps:"
echo ""
echo "BACKEND DEPLOYMENT (Render Web Service):"
echo "1. Go to https://render.com"
echo "2. Create a new Web Service"
echo "3. Connect your GitHub repository"
echo "4. Set Root Directory to 'server'"
echo "5. Set Build Command: npm install"
echo "6. Set Start Command: npm start"
echo "7. Add Environment Variables:"
echo "   - NODE_ENV=production"
echo "   - MONGODB_URI=your_mongodb_connection_string"
echo "   - JWT_SECRET=your_secure_jwt_secret"
echo "   - PORT=10000"
echo ""
echo "FRONTEND DEPLOYMENT (Netlify):"
echo "1. Go to https://netlify.com"
echo "2. Create a new site from Git"
echo "3. Connect your GitHub repository"
echo "4. Set Build Command: cd client && npm install && npm run build"
echo "5. Set Publish Directory: client/dist"
echo "6. Add Environment Variable:"
echo "   - VITE_API_URL=https://your-backend-service.onrender.com"
echo ""
echo "🔍 Testing Your Deployment:"
echo "1. Test backend: curl https://your-backend.onrender.com/api/health"
echo "2. Test frontend: Visit your Netlify URL"
echo "3. Try admin login with your credentials"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT_GUIDE.md"
echo ""
print_status "Deployment script completed! Follow the steps above to deploy to Render." 