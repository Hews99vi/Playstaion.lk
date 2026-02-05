# MongoDB Atlas Data API Integration Guide

## Setup Instructions

### 1. Enable MongoDB Data API
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Select your cluster
3. Click "Data API" in the left sidebar
4. Click "Enable Data API"
5. Create an API Key and copy it

### 2. Get Your Configuration
You need these values:
- **Data API URL**: Found in Data API settings (e.g., `https://data.mongodb-api.com/app/data-xxxxx/endpoint/data/v1`)
- **API Key**: The key you just created
- **Database Name**: Your database name (e.g., `playstation_db`)
- **Collection Name**: `products`

### 3. Update Environment Variables
Edit `.env` file with your values:
```env
VITE_MONGODB_DATA_API_URL=https://data.mongodb-api.com/app/data-xxxxx/endpoint/data/v1
VITE_MONGODB_API_KEY=your-api-key-here
VITE_MONGODB_DATABASE=playstation_db
VITE_MONGODB_COLLECTION=products
```

### 4. Update Cluster Name (if different)
If your cluster name is not "Cluster0", update it in `services/mongoService.ts`:
```typescript
dataSource: 'YourClusterName', // Line appears in each function
```

### 5. Build and Deploy
```bash
npm run build
```

## How It Works

- **On first load**: If MongoDB is empty, it seeds with mock products from `constants.tsx`
- **Admin changes**: All CRUD operations (add/edit/delete) save directly to MongoDB
- **Cross-browser sync**: All browsers/devices instantly see the same inventory
- **No localStorage**: Products are fetched from MongoDB on every page load

## API Operations

| Operation | MongoDB Action | File |
|-----------|---------------|------|
| Load products | `find` | App.tsx |
| Add product | `insertOne` | Admin panel |
| Update product | `updateOne` | Admin panel |
| Delete product | `deleteOne` | Admin panel |
| Seed initial data | `insertMany` | First load |

## Security Notes

⚠️ **Important**: 
- API Key is exposed in frontend (normal for Data API with IP whitelisting)
- Use MongoDB Atlas IP Access List to restrict access
- Never use admin API keys - use Data API keys only
- For production, add proper authentication

## Deployment

1. Build: `npm run build`
2. Upload `dist/` folder to Namecheap public_html
3. Ensure `.env` variables are set correctly before building
4. All users will now sync via MongoDB!

## Troubleshooting

**Products not loading?**
- Check browser console for errors
- Verify API URL and Key in `.env`
- Ensure Data API is enabled in Atlas
- Check your cluster name matches code

**CORS errors?**
- MongoDB Data API supports CORS by default
- Ensure your domain is whitelisted in Atlas

**Changes not syncing?**
- Hard refresh browser (Ctrl+F5)
- Check MongoDB Atlas dashboard to verify data
- Verify API calls in Network tab
