# AI Knowledge Base - Deployment Guide

## 📋 Prerequisites

Before deploying, ensure you have:

1. **MongoDB Atlas Account** - [Sign up here](https://www.mongodb.com/cloud/atlas/register)
2. **OpenAI API Key** - Get from [OpenAI Platform](https://platform.openai.com/api-keys)
3. **Vercel Account** (for frontend) - [Sign up here](https://vercel.com/signup)
4. **Render/Railway Account** (for backend & LLM service)

## 🗄️ MongoDB Atlas Setup

1. Create a new cluster on MongoDB Atlas
2. Create a database named `ai-knowledge-base`
3. Create a database user with read/write permissions
4. Whitelist IP addresses (0.0.0.0/0 for all IPs or specific IPs)
5. Get your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/ai-knowledge-base
   ```

## 🚀 Deployment Instructions

### 1. Deploy Frontend to Vercel

#### Option A: Using Vercel CLI

```bash
cd frontend
npm install -g vercel
vercel login
vercel
```

#### Option B: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Import Project"
3. Import your GitHub repo
4. Set root directory to `frontend`
5. Add environment variable:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL (e.g., `https://your-backend.onrender.com`)
6. Click "Deploy"

### 2. Deploy Backend to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `ai-knowledge-base-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Instance Type**: Free or paid tier

5. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your-super-secret-key-change-this
   JWT_EXPIRATION=7d
   LLM_SERVICE_URL=https://your-llm-service.onrender.com
   FRONTEND_URL=https://your-frontend.vercel.app
   PORT=4000
   ```

6. Click "Create Web Service"

### 3. Deploy LLM Service to Render

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `ai-knowledge-base-llm`
   - **Root Directory**: `llm-service`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: Free or paid tier

4. Add Environment Variables:
   ```
   OPENAI_API_KEY=sk-...
   MONGODB_URI=mongodb+srv://...
   PORT=8000
   ```

5. Click "Create Web Service"

### Alternative: Deploy to Railway

Railway is similar to Render and easier for beginners.

1. Go to [Railway](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add 3 services:
   - Frontend (Next.js)
   - Backend (NestJS)
   - LLM Service (Python)

5. Configure each service with appropriate environment variables

## 🔧 Post-Deployment Configuration

### Update Frontend Environment

After deploying backend and LLM service, update your frontend environment:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update `NEXT_PUBLIC_API_URL` with your actual backend URL
3. Redeploy the frontend

### Update Backend Environment

1. Update `LLM_SERVICE_URL` with your actual LLM service URL
2. Update `FRONTEND_URL` with your actual frontend URL
3. Redeploy the backend

## 🧪 Testing Your Deployment

1. **Test Frontend**: Visit your Vercel URL
2. **Test Backend**: 
   ```bash
   curl https://your-backend.onrender.com/health
   ```
3. **Test LLM Service**:
   ```bash
   curl https://your-llm-service.onrender.com/health
   ```

## 📊 Monitoring

### Frontend (Vercel)
- Analytics available in Vercel Dashboard
- Error tracking via Vercel Logs

### Backend & LLM Service (Render)
- Logs available in Render Dashboard
- Set up metrics and alerts

## 💰 Cost Estimation

### Free Tier Setup
- **MongoDB Atlas**: 512MB free (sufficient for development)
- **Vercel**: Free for hobby projects
- **Render**: 750 hours/month free (both services)
- **OpenAI API**: Pay per use (approximately $0.002 per 1K tokens)

### Estimated Monthly Cost (Low Traffic)
- **Free tier**: $0 + OpenAI API usage (~$5-10/month)
- **Paid tier**: ~$20-30/month + OpenAI API usage

## 🔒 Security Best Practices

1. Never commit `.env` files
2. Use strong JWT secrets (32+ characters)
3. Enable MongoDB IP whitelisting
4. Use HTTPS for all services
5. Rotate API keys regularly
6. Set up rate limiting
7. Monitor API usage

## 🐛 Troubleshooting

### CORS Issues
- Ensure `FRONTEND_URL` is correctly set in backend
- Check CORS configuration in `main.ts`

### MongoDB Connection Failed
- Verify connection string
- Check IP whitelist
- Ensure database user permissions

### OpenAI API Errors
- Verify API key is valid
- Check API usage limits
- Monitor rate limits

### Build Failures
- Check Node.js/Python versions
- Verify all dependencies are in package.json/requirements.txt
- Review build logs

## 📝 Environment Variables Reference

### Frontend (.env)
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

### Backend (.env)
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
JWT_EXPIRATION=7d
LLM_SERVICE_URL=https://your-llm-service.onrender.com
FRONTEND_URL=https://your-frontend.vercel.app
PORT=4000
```

### LLM Service (.env)
```
OPENAI_API_KEY=sk-...
MONGODB_URI=mongodb+srv://...
PORT=8000
```

## 🎉 Success!

Your AI Knowledge Base should now be live and accessible!

Visit your frontend URL and:
1. Register a new account
2. Upload a PDF document
3. Chat with your document
4. Try semantic search
5. Generate summaries
