# 🧪 Testing Guide

## Complete Testing Workflow

### Step 1: Start the Application

```bash
# Terminal 1 - Start MongoDB
mongod

# Terminal 2 - Start Application
npm start
```

Access: `http://localhost:9000`

---

## Step 2: Create First Admin (If Not Exists)

Open MongoDB Compass or Mongo Shell:

```javascript
use Admin-Penel

db.admins.insertOne({
  fname: "Test",
  lname: "Admin",
  email: "test@admin.com",
  password: "test123",
  phone: 9876543210,
  gander: "male",
  hobby: ["testing"],
  city: "Mumbai",
  about: "Test Administrator"
})
```

---

## Step 3: Test Authentication

### Login Test
1. Go to `http://localhost:9000`
2. Enter credentials:
   - Email: `test@admin.com`
   - Password: `test123`
3. Click Login
4. ✅ Should redirect to dashboard

### Logout Test
1. Click "Logout" in sidebar
2. ✅ Should redirect to login page

---

## Step 4: Test Category Management

### Add Category
1. Click "Categories" in sidebar
2. Click "+ Add New Category"
3. Fill form:
   - Name: "Electronics"
   - Description: "Electronic items and gadgets"
   - Upload an image
   - Status: Active
4. Click "Add Category"
5. ✅ Should show success message
6. ✅ Should redirect to view categories
7. ✅ Category should appear in table

### Edit Category
1. Click "Edit" button on a category
2. Change name to "Electronics & Gadgets"
3. Click "Update Category"
4. ✅ Should show success message
5. ✅ Changes should be reflected

### Delete Category
1. Click "Delete" on a category
2. Confirm deletion
3. ✅ Category should be removed
4. ✅ Image should be deleted from uploads folder

---

## Step 5: Test Subcategory Management

### Add Subcategory
1. First, ensure you have at least one active category
2. Click "Subcategories" in sidebar
3. Click "+ Add New Subcategory"
4. Fill form:
   - Category: Select "Electronics"
   - Name: "Mobile Phones"
   - Description: "Smartphones and feature phones"
   - Upload an image
   - Status: Active
5. Click "Add Subcategory"
6. ✅ Should show success message
7. ✅ Should show parent category name in table

### Test Dynamic Dropdown
1. Go to Add Subcategory
2. Change category dropdown
3. ✅ Form should remain functional

### Edit Subcategory
1. Click "Edit" on a subcategory
2. Change category or name
3. ✅ Should update successfully

### Delete Subcategory
1. Click "Delete" on a subcategory
2. ✅ Should be removed

---

## Step 6: Test Extra Category Management

### Add Extra Category
1. Ensure you have:
   - At least one active category
   - At least one active subcategory
2. Click "Extra Categories" in sidebar
3. Click "+ Add New Extra Category"
4. Fill form:
   - Category: Select "Electronics"
   - **Wait for subcategories to load** ⏳
   - Subcategory: Select "Mobile Phones"
   - Name: "Smartphones"
   - Description: "Smart mobile devices"
   - Upload an image
   - Status: Active
5. Click "Add Extra Category"
6. ✅ Should show success message

### Test Dynamic Subcategory Loading
1. Go to Add Extra Category
2. Select a category
3. ✅ Subcategory dropdown should:
   - Enable automatically
   - Load subcategories for selected category
   - Show "No subcategories available" if none exist

### Change Category
1. Select different category
2. ✅ Subcategory dropdown should:
   - Reset
   - Load new subcategories

### Edit Extra Category
1. Click "Edit" on an extra category
2. ✅ Dropdowns should be pre-filled
3. Change values and save
4. ✅ Should update successfully

---

## Step 7: Test Product Management (Most Important!)

### Add Product - Full Test
1. Ensure you have complete hierarchy:
   - Category: "Electronics"
   - Subcategory: "Mobile Phones"
   - Extra Category: "Smartphones"
2. Click "Products" in sidebar
3. Click "+ Add New Product"
4. Fill form:
   - Title: "iPhone 15 Pro Max"
   - Category: Select "Electronics"
   - **Wait** ⏳ - Subcategory dropdown should enable
   - Subcategory: Select "Mobile Phones"
   - **Wait** ⏳ - Extra Category dropdown should enable
   - Extra Category: Select "Smartphones"
   - Price: 129999
   - Discount: 10
   - Stock: 50
   - Status: Available
   - Description: "Latest iPhone with A17 Pro chip"
   - Images: Select 3-5 images
5. Click "Add Product"
6. ✅ Should show success message
7. ✅ Product should appear in table with:
   - All images displayed
   - Correct category hierarchy
   - Price and discount
   - Stock quantity
   - Status badge

### Test Dynamic Dropdowns in Product
1. Go to Add Product
2. **Test Category Change:**
   - Select "Electronics"
   - ✅ Subcategory dropdown enables
   - ✅ Extra category dropdown stays disabled
3. **Test Subcategory Change:**
   - Select "Mobile Phones"
   - ✅ Extra category dropdown enables
   - ✅ Extra categories load
4. **Test Category Re-selection:**
   - Change category
   - ✅ Subcategory resets
   - ✅ Extra category resets and disables

### Test Multiple Image Upload
1. Add product with 5 images
2. ✅ All 5 should upload
3. Try adding 6 images
4. ✅ Should only accept 5

### Edit Product
1. Click "Edit" on a product
2. ✅ All fields should be pre-filled
3. ✅ Current images should display
4. Change some fields
5. Upload new images (optional)
6. Click "Update Product"
7. ✅ Should update successfully
8. ✅ If new images uploaded, old ones should be deleted

### Delete Product
1. Click "Delete" on a product
2. Confirm deletion
3. ✅ Product should be removed
4. ✅ All product images should be deleted from uploads folder

---

## Step 8: Test Image Management

### Check Upload Folders
```bash
cd uploads
dir  # Windows
ls   # Mac/Linux
```

✅ Should see folders:
- admin/
- category/
- subcategory/
- extracategory/
- product/

### Test Image Deletion
1. Add a category with image
2. Note the image filename
3. Delete the category
4. Check `uploads/category/` folder
5. ✅ Image should be deleted

### Test Image Update
1. Edit a category
2. Upload new image
3. Check `uploads/category/` folder
4. ✅ Old image should be deleted
5. ✅ New image should exist

---

## Step 9: Test Error Handling

### Test Duplicate Category
1. Add category "Electronics"
2. Try adding another "Electronics"
3. ✅ Should show error message

### Test Missing Required Fields
1. Try submitting forms without required fields
2. ✅ Browser validation should prevent submission

### Test Invalid Category Selection
1. Try adding subcategory without selecting category
2. ✅ Should show validation error

### Test Cascade Relationships
1. Create: Category → Subcategory → Extra Category → Product
2. Try deleting the category
3. ✅ Should delete (or show error if you add cascade protection)

---

## Step 10: Test Navigation & UI

### Sidebar Navigation
1. Click each menu item
2. ✅ Active state should highlight correctly
3. ✅ All pages should load

### Flash Messages
1. Perform any action (add, edit, delete)
2. ✅ Success/error message should appear
3. ✅ Message should auto-dismiss (if using SweetAlert)

### Responsive Design
1. Resize browser window
2. ✅ Layout should adapt
3. ✅ Tables should be scrollable on mobile

---

## Step 11: Test Complete Workflow

### End-to-End Test
1. **Create Category:**
   - Name: "Fashion"
   - Upload image
   - Status: Active

2. **Create Subcategory:**
   - Category: Fashion
   - Name: "Men's Clothing"
   - Upload image
   - Status: Active

3. **Create Extra Category:**
   - Category: Fashion
   - Subcategory: Men's Clothing
   - Name: "T-Shirts"
   - Upload image
   - Status: Active

4. **Create Product:**
   - Title: "Cotton Round Neck T-Shirt"
   - Category: Fashion
   - Subcategory: Men's Clothing
   - Extra Category: T-Shirts
   - Price: 499
   - Discount: 20
   - Stock: 100
   - Status: Available
   - Description: "Comfortable cotton t-shirt"
   - Upload 3 images

5. **Verify:**
   - ✅ Product appears in list
   - ✅ All relationships correct
   - ✅ Images display properly
   - ✅ Price and discount shown
   - ✅ Stock quantity visible

6. **Edit Product:**
   - Change price to 599
   - Update stock to 150
   - ✅ Changes saved

7. **Delete Product:**
   - ✅ Product removed
   - ✅ Images deleted

---

## Common Issues & Solutions

### Issue: Subcategories not loading
**Check:**
- Is category selected?
- Are there active subcategories for that category?
- Check browser console for errors
- Check network tab for API response

### Issue: Images not uploading
**Check:**
- Do upload folders exist?
- Check folder permissions
- Check file size limits
- Check file type (should be images)

### Issue: Flash messages not showing
**Check:**
- Is connect-flash configured?
- Is session middleware working?
- Check browser console

### Issue: Dropdown stays disabled
**Check:**
- JavaScript errors in console
- API endpoint returning data
- Network connectivity

---

## Performance Testing

### Test with Large Dataset
1. Add 50+ categories
2. Add 100+ subcategories
3. Add 200+ products
4. ✅ Pages should load reasonably fast
5. ✅ Dropdowns should work smoothly

### Test Image Loading
1. Add products with 5 images each
2. View products page
3. ✅ Images should load
4. ✅ Consider lazy loading for optimization

---

## Security Testing

### Test Authentication
1. Try accessing `/dashboard` without login
2. ✅ Should redirect to login

### Test File Upload
1. Try uploading non-image files
2. ✅ Should validate file type

### Test SQL Injection (Mongoose protects)
1. Try entering special characters in forms
2. ✅ Should handle safely

---

## Final Checklist

- [ ] All CRUD operations work for categories
- [ ] All CRUD operations work for subcategories
- [ ] All CRUD operations work for extra categories
- [ ] All CRUD operations work for products
- [ ] Dynamic dropdowns work correctly
- [ ] Multiple image upload works
- [ ] Image deletion works on update/delete
- [ ] Flash messages appear
- [ ] Navigation works
- [ ] Authentication works
- [ ] Logout works
- [ ] Forms validate properly
- [ ] Error handling works
- [ ] UI is responsive

---

## Success Criteria

✅ **All tests pass**
✅ **No console errors**
✅ **Images upload and delete properly**
✅ **Dynamic dropdowns work smoothly**
✅ **Data relationships are correct**
✅ **Flash messages appear**
✅ **Navigation is smooth**

---

**If all tests pass, your system is ready to use! 🎉**
