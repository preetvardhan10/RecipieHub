# OpenAI API Key Setup

## Issue: AI Suggestions Not Working

The AI suggestions feature requires a valid OpenAI API key. Currently, the placeholder key is set in the `.env` file.

## Steps to Fix:

1. **Get an OpenAI API Key:**
   - Go to https://platform.openai.com/api-keys
   - Sign up or log in
   - Create a new API key
   - Copy the key (starts with `sk-`)

2. **Update the `.env` file:**
   ```bash
   cd backend
   # Edit .env file and replace:
   OPENAI_API_KEY=sk-your-openai-api-key-here
   # With your actual key:
   OPENAI_API_KEY=sk-your-actual-key-here
   ```

3. **Restart the backend server:**
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

## Testing AI Suggestions:

Once the API key is set, test the endpoint:

```bash
curl -X POST http://localhost:5001/api/ai/suggest \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "ingredients": ["chicken", "tomatoes", "onions"],
    "dietaryPreferences": ""
  }'
```

## Cost Note:

OpenAI API usage is pay-as-you-go. Check pricing at: https://openai.com/pricing

For testing, the free tier or low-cost tier should be sufficient.

