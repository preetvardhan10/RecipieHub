# Production Checklist

Use this checklist before deploying RecipeHub to production.

## Backend Checklist

### Environment Variables
- [ ] `MONGODB_URI` is set and valid
- [ ] `JWT_SECRET` is strong and unique (use a random string generator)
- [ ] `JWT_EXPIRES_IN` is set appropriately (e.g., "7d")
- [ ] `OPENAI_API_KEY` is valid and has credits
- [ ] `FRONTEND_URL` matches your Vercel deployment URL exactly
- [ ] `NODE_ENV` is set to "production"
- [ ] `PORT` is set (Render uses 10000 by default)

### Security
- [ ] All environment variables are set in Render (not in code)
- [ ] CORS is configured correctly
- [ ] Password hashing is working (bcrypt)
- [ ] JWT tokens expire properly
- [ ] Input validation is enabled on all routes
- [ ] Error messages don't expose sensitive information

### Database
- [ ] MongoDB Atlas cluster is created
- [ ] Database user is created with appropriate permissions
- [ ] IP whitelist includes Render IPs (or 0.0.0.0/0 for all)
- [ ] Connection string is correct
- [ ] Database indexes are created (automatic via Mongoose)

### API Endpoints
- [ ] All routes are working
- [ ] Authentication middleware is applied correctly
- [ ] Authorization (owner/admin) is working
- [ ] Error handling is consistent
- [ ] Response format is standardized

### Testing
- [ ] Test user registration
- [ ] Test user login
- [ ] Test recipe CRUD operations
- [ ] Test filtering, searching, sorting, pagination
- [ ] Test reviews and ratings
- [ ] Test meal plans
- [ ] Test AI suggestions
- [ ] Test user profile updates
- [ ] Test follow/favorite features

## Frontend Checklist

### Environment Variables
- [ ] `VITE_API_URL` points to your Render backend URL + `/api`
- [ ] Environment variable is set in Vercel

### Build
- [ ] `npm run build` completes without errors
- [ ] All dependencies are in package.json
- [ ] No console errors in production build

### Functionality
- [ ] User registration works
- [ ] User login works
- [ ] Protected routes redirect to login
- [ ] Recipe creation/editing works
- [ ] Recipe filtering/searching works
- [ ] Pagination works
- [ ] Reviews and ratings work
- [ ] Meal planning works
- [ ] AI suggestions work
- [ ] Profile updates work
- [ ] Favorites work
- [ ] Follow/unfollow works

### UI/UX
- [ ] Responsive design works on mobile
- [ ] Loading states are shown
- [ ] Error messages are user-friendly
- [ ] Navigation works correctly
- [ ] Forms validate input
- [ ] Images load correctly

### Performance
- [ ] Page load times are acceptable
- [ ] API calls are optimized
- [ ] Images are optimized (if applicable)
- [ ] No unnecessary re-renders

## Deployment Checklist

### Render (Backend)
- [ ] Service is deployed and running
- [ ] Health check endpoint (`/api/health`) responds
- [ ] Logs show no errors
- [ ] Service doesn't spin down unexpectedly
- [ ] Custom domain is configured (if applicable)

### Vercel (Frontend)
- [ ] Deployment is successful
- [ ] Build logs show no errors
- [ ] Site is accessible
- [ ] Custom domain is configured (if applicable)
- [ ] HTTPS is enabled (automatic)

### Integration
- [ ] Frontend can communicate with backend
- [ ] CORS is working correctly
- [ ] Authentication flow works end-to-end
- [ ] All features work in production

## Post-Deployment Testing

### User Flow
1. [ ] Register a new account
2. [ ] Login with the account
3. [ ] Create a recipe
4. [ ] View the recipe
5. [ ] Edit the recipe
6. [ ] Rate the recipe
7. [ ] Add a review
8. [ ] Search for recipes
9. [ ] Filter recipes
10. [ ] Create a meal plan
11. [ ] Get AI suggestions
12. [ ] Update profile
13. [ ] Add recipe to favorites
14. [ ] Follow another user

### Error Scenarios
- [ ] Invalid login credentials show error
- [ ] Unauthorized access is blocked
- [ ] Invalid form data shows validation errors
- [ ] Network errors are handled gracefully
- [ ] 404 pages are handled

## Monitoring

### Set Up
- [ ] Monitor Render service logs
- [ ] Monitor Vercel deployment logs
- [ ] Set up error tracking (optional: Sentry)
- [ ] Monitor MongoDB Atlas usage
- [ ] Monitor OpenAI API usage

### Alerts
- [ ] Service downtime alerts (Render)
- [ ] Deployment failure alerts (Vercel)
- [ ] Database connection alerts
- [ ] API error rate alerts

## Documentation

- [ ] README.md is complete
- [ ] API_GUIDE.md is complete
- [ ] DEPLOYMENT.md is complete
- [ ] Environment variables are documented
- [ ] API endpoints are documented

## Security Review

- [ ] No secrets in code
- [ ] All environment variables are secure
- [ ] HTTPS is enabled
- [ ] CORS is properly configured
- [ ] Input validation is in place
- [ ] SQL injection is not applicable (MongoDB)
- [ ] XSS protection is in place (React)
- [ ] CSRF protection (JWT tokens)

## Performance Review

- [ ] Database queries are optimized
- [ ] API responses are fast (< 1s for most endpoints)
- [ ] Frontend loads quickly
- [ ] Images are optimized
- [ ] Pagination limits are reasonable

## Final Steps

1. [ ] Test all features in production
2. [ ] Verify all environment variables
3. [ ] Check all logs for errors
4. [ ] Test on multiple devices/browsers
5. [ ] Get feedback from beta users
6. [ ] Monitor for 24-48 hours
7. [ ] Document any issues found
8. [ ] Create backup of database
9. [ ] Set up regular backups (MongoDB Atlas)

## Rollback Plan

If issues occur:
1. [ ] Know how to rollback Vercel deployment
2. [ ] Know how to rollback Render deployment
3. [ ] Have database backup ready
4. [ ] Have previous working commit hash

---

**Status**: ⬜ Not Started | 🟡 In Progress | ✅ Complete

Update this checklist as you complete each item.

