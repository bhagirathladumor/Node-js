# 🚀 Quick Setup Guide

## Installation Steps

1. **Install Dependencies**
```bash
npm install
```

2. **Start MongoDB**
```bash
mongod
```

3. **Start Server**
```bash
npm start
```

4. **Access Application**
```
http://localhost:9000
```

---

## First Time Setup

### Step 1: Create First Admin
You need to manually insert the first admin in MongoDB:

```javascript
use Admin-Penel

db.admins.insertOne({
  fname: "Admin",
  lname: "User",
  email: "admin@example.com",
  password: "admin123",
  phone: 1234567890,
  gander: "male",
  hobby: ["coding"],
  city: "Mumbai",
  about: "System Administrator"
})
```

### Step 2: Login
- Email: `admin@example.com`
- Password: `admin123`

---

## Usage Flow

### 1. Setup Category Hierarchy
```
Categories → Subcategories → Extra Categories → Products
```

**Example:**
1. Create Category: "Electronics"
2. Create Subcategory: "Mobile Phones" (under Electronics)
3. Create Extra Category: "Smartphones" (under Mobile Phones)
4. Create Product: "iPhone 15" (under all three)

### 2. Add Products
1. Go to Products → Add Product
2. Select Category (dropdown)
3. Select Subcategory (loads automatically)
4. Select Extra Category (loads automatically)
5. Fill product details
6. Upload images (max 5)
7. Save

---

## Important Routes

### Admin Management
- Dashboard: `/dashboard`
- View Admins: `/viewAdmin`
- Add Admin: `/addAdmin`
- Profile: `/profile`

### Catalog Management
- Categories: `/viewCategories`
- Subcategories: `/viewSubcategories`
- Extra Categories: `/viewExtracategories`
- Products: `/viewProducts`

### Authentication
- Login: `/`
- Logout: `/logout`
- Change Password: `/change-password`
- Forgot Password: `/forgot-pass`

---

## File Upload Locations

```
uploads/
├── admin/          # Admin profile pictures
├── category/       # Category images
├── subcategory/    # Subcategory images
├── extracategory/  # Extra category images
└── product/        # Product images (multiple per product)
```

---

## Common Issues & Solutions

### Issue: MongoDB Connection Error
**Solution:** Make sure MongoDB is running
```bash
mongod
```

### Issue: Port Already in Use
**Solution:** Change port in `server.js`
```javascript
const PORT = 9000; // Change to another port
```

### Issue: Images Not Uploading
**Solution:** Check if upload directories exist
```bash
cd uploads
mkdir category subcategory extracategory product
```

### Issue: Flash Messages Not Showing
**Solution:** Make sure session is configured properly in `server.js`

---

## Development Tips

1. **Use Nodemon** - Already configured, auto-restarts on changes
2. **Check Console** - All errors are logged to console
3. **MongoDB Compass** - Use for easy database viewing
4. **Postman** - Test API routes easily

---

## Email Configuration

To enable email functionality (OTP, password reset):

1. Open `controller/admin.controller.js`
2. Update Nodemailer configuration:
```javascript
let transporter = nodemailer.createTransporter({
    service: "gmail",
    auth: {
        user: "your-email@gmail.com",
        pass: "your-app-password"
    }
});
```

---

## Production Checklist

Before deploying to production:

- [ ] Add bcrypt for password hashing
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Implement CSRF protection
- [ ] Add input validation
- [ ] Set up proper error handling
- [ ] Configure MongoDB Atlas for cloud database
- [ ] Add image compression
- [ ] Implement caching

---

## Features Summary

✅ Admin Management (CRUD)
✅ Category Management (CRUD)
✅ Subcategory Management (CRUD)
✅ Extra Category Management (CRUD)
✅ Product Management (CRUD)
✅ Multiple Image Upload
✅ Dynamic Dropdowns
✅ Session Authentication
✅ Email OTP Verification
✅ Password Recovery
✅ Flash Messages
✅ Responsive Design

---

## Need Help?

1. Check README.md for detailed documentation
2. Review code comments in controllers
3. Check MongoDB for data issues
4. Review browser console for frontend errors
5. Check server console for backend errors

---

**Happy Coding! 🎉**
