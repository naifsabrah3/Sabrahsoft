# API Contracts - Sabrah Soft Portfolio

## مقدمة
هذا الملف يحدد العقود بين Frontend و Backend لموقع صبره سوفت.

## البيانات المموهة (Mock Data) في Frontend
الملف `/app/frontend/src/mock.js` يحتوي على:
- `portfolioData.projects` - قائمة المشاريع مع 6 مشاريع تجريبية
- `portfolioData.owner` - معلومات المطور
- `portfolioData.services` - الخدمات المقدمة
- `portfolioData.contact` - معلومات التواصل
- `adminCredentials` - بيانات تسجيل الدخول للإدارة

## المطلوب تطويره في Backend

### 1. نماذج البيانات (Models)

#### Project Model
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String, // "نظام ويب" | "تطبيق أندرويد"
  technologies: [String],
  image: String,
  demoLink: String,
  githubLink: String,
  featured: Boolean,
  bgColor: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### Admin User Model
```javascript
{
  _id: ObjectId,
  username: String,
  password: String (hashed),
  createdAt: Date
}
```

### 2. API Endpoints المطلوبة

#### Public APIs (لا تحتاج مصادقة)
- `GET /api/projects` - جلب جميع المشاريع
- `GET /api/projects/featured` - جلب المشاريع المميزة فقط
- `GET /api/projects/:id` - جلب مشروع واحد
- `POST /api/contact` - إرسال رسالة تواصل

#### Admin APIs (تحتاج مصادقة)
- `POST /api/admin/login` - تسجيل دخول الإدارة
- `POST /api/admin/logout` - تسجيل خروج
- `GET /api/admin/projects` - جلب المشاريع للإدارة
- `POST /api/admin/projects` - إضافة مشروع جديد
- `PUT /api/admin/projects/:id` - تعديل مشروع
- `DELETE /api/admin/projects/:id` - حذف مشروع

### 3. Authentication المطلوب
- JWT tokens لحماية admin routes
- Session management للوحة الإدارة
- Password hashing باستخدام bcrypt

### 4. التغييرات المطلوبة في Frontend

#### إزالة Mock Data من:
- `ProjectsSection.jsx` - استخدام API بدلاً من `portfolioData.projects`
- `AdminPanel.jsx` - ربط العمليات بـ backend APIs
- `LoginForm.jsx` - إرسال بيانات التسجيل للبكند

#### إضافة API Services:
- `api/projects.js` - خدمات API للمشاريع
- `api/admin.js` - خدمات API للإدارة
- `api/auth.js` - خدمات المصادقة

### 5. Validation المطلوب
- التحقق من البيانات في Backend
- رسائل خطأ باللغة العربية
- التحقق من صحة روابط الصور

### 6. Error Handling
- معالجة أخطاء شبكة في Frontend
- رسائل خطأ واضحة للمستخدم
- Fallback للبيانات عند فشل API

## خطة التنفيذ
1. إنشاء Models في MongoDB
2. تطوير API endpoints
3. إضافة Authentication middleware
4. تطوير API services في Frontend
5. ربط Components بـ Backend APIs
6. اختبار التكامل

## ملاحظات مهمة
- الحفاظ على التصميم والانيميشن الحالي
- دعم اللغة العربية في جميع الرسائل
- التأكد من أمان لوحة الإدارة
- اختبار جميع العمليات (CRUD) للمشاريع