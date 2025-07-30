from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime, timedelta

# Import our models and auth
from models import (
    Project, ProjectCreate, ProjectUpdate, 
    AdminUser, AdminLogin, AdminLoginResponse, 
    ContactMessage, ProjectCategory
)
from auth import (
    verify_password, get_password_hash, create_access_token, 
    verify_token, ACCESS_TOKEN_EXPIRE_MINUTES
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Sabrah Soft Portfolio API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Security
security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current authenticated user"""
    token = credentials.credentials
    payload = verify_token(token)
    username = payload.get("sub")
    
    user = await db.admin_users.find_one({"username": username})
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="المستخدم غير موجود"
        )
    return user

# Initialize admin user if not exists
async def create_default_admin():
    """Create default admin user if not exists"""
    existing_admin = await db.admin_users.find_one({"username": "xliunx"})
    if not existing_admin:
        admin_user = AdminUser(
            username="xliunx",
            password=get_password_hash("77290")
        )
        await db.admin_users.insert_one(admin_user.dict())
        print("✅ Default admin user created")

# Initialize sample projects if not exists
async def create_sample_projects():
    """Create sample projects if none exist"""
    existing_count = await db.projects.count_documents({})
    if existing_count == 0:
        sample_projects = [
            ProjectCreate(
                title="نظام إدارة المحتوى الذكي",
                description="نظام متكامل لإدارة المحتوى مع واجهة إدارة متقدمة وتحكم كامل في البيانات",
                category=ProjectCategory.WEB_SYSTEM,
                technologies=["React", "Node.js", "MongoDB", "Express"],
                image="/api/placeholder/600/400",
                demoLink="#",
                githubLink="#",
                featured=True
            ),
            ProjectCreate(
                title="تطبيق التجارة الإلكترونية",
                description="تطبيق أندرويد متكامل للتجارة الإلكترونية مع نظام دفع آمن وواجهة مستخدم سهلة",
                category=ProjectCategory.ANDROID_APP,
                technologies=["Java", "Firebase", "SQLite", "Android Studio"],
                image="/api/placeholder/600/400",
                demoLink="#",
                githubLink="#",
                featured=True
            ),
            ProjectCreate(
                title="منصة التعلم الإلكتروني",
                description="منصة تعليمية تفاعلية مع نظام إدارة الطلاب والمدرسين ومتابعة التقدم",
                category=ProjectCategory.WEB_SYSTEM,
                technologies=["Vue.js", "Laravel", "MySQL", "WebRTC"],
                image="/api/placeholder/600/400",
                demoLink="#",
                githubLink="#",
                featured=False
            )
        ]
        
        for project_data in sample_projects:
            project_dict = project_data.dict()
            project_dict["bg_color"] = "#2a2a2a"
            project = Project(**project_dict)
            await db.projects.insert_one(project.dict())
        
        print("✅ Sample projects created")

# Public Routes
@api_router.get("/")
async def root():
    return {"message": "Sabrah Soft Portfolio API", "version": "1.0.0"}

@api_router.get("/projects", response_model=List[Project])
async def get_projects(category: Optional[str] = None, featured: Optional[bool] = None):
    """Get all projects with optional filtering"""
    query = {}
    if category and category != "الكل":
        query["category"] = category
    if featured is not None:
        query["featured"] = featured
    
    projects = await db.projects.find(query).sort("created_at", -1).to_list(1000)
    return [Project(**project) for project in projects]

@api_router.get("/projects/featured", response_model=List[Project])
async def get_featured_projects():
    """Get only featured projects"""
    projects = await db.projects.find({"featured": True}).sort("created_at", -1).to_list(1000)
    return [Project(**project) for project in projects]

@api_router.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    """Get a single project by ID"""
    project = await db.projects.find_one({"id": project_id})
    if not project:
        raise HTTPException(status_code=404, detail="المشروع غير موجود")
    return Project(**project)

@api_router.post("/contact")
async def send_contact_message(message: ContactMessage):
    """Send a contact message"""
    await db.contact_messages.insert_one(message.dict())
    return {"message": "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً."}

# Admin Authentication
@api_router.post("/admin/login", response_model=AdminLoginResponse)
async def admin_login(login_data: AdminLogin):
    """Admin login endpoint"""
    user = await db.admin_users.find_one({"username": login_data.username})
    if not user or not verify_password(login_data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="اسم المستخدم أو كلمة المرور غير صحيحة"
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["username"]}, expires_delta=access_token_expires
    )
    
    return AdminLoginResponse(
        access_token=access_token,
        token_type="bearer",
        expires_in=ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )

# Admin Protected Routes
@api_router.get("/admin/projects", response_model=List[Project])
async def admin_get_projects(current_user: dict = Depends(get_current_user)):
    """Get all projects for admin"""
    projects = await db.projects.find({}).sort("created_at", -1).to_list(1000)
    return [Project(**project) for project in projects]

@api_router.post("/admin/projects", response_model=Project)
async def admin_create_project(project_data: ProjectCreate, current_user: dict = Depends(get_current_user)):
    """Create a new project"""
    project = Project(**project_data.dict())
    await db.projects.insert_one(project.dict())
    return project

@api_router.put("/admin/projects/{project_id}", response_model=Project)
async def admin_update_project(
    project_id: str, 
    project_data: ProjectUpdate, 
    current_user: dict = Depends(get_current_user)
):
    """Update a project"""
    existing_project = await db.projects.find_one({"id": project_id})
    if not existing_project:
        raise HTTPException(status_code=404, detail="المشروع غير موجود")
    
    update_data = {k: v for k, v in project_data.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await db.projects.update_one({"id": project_id}, {"$set": update_data})
    updated_project = await db.projects.find_one({"id": project_id})
    return Project(**updated_project)

@api_router.delete("/admin/projects/{project_id}")
async def admin_delete_project(project_id: str, current_user: dict = Depends(get_current_user)):
    """Delete a project"""
    result = await db.projects.delete_one({"id": project_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="المشروع غير موجود")
    return {"message": "تم حذف المشروع بنجاح"}

@api_router.get("/admin/contact-messages", response_model=List[ContactMessage])
async def admin_get_contact_messages(current_user: dict = Depends(get_current_user)):
    """Get all contact messages for admin"""
    messages = await db.contact_messages.find({}).sort("created_at", -1).to_list(1000)
    return [ContactMessage(**message) for message in messages]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    """Initialize database on startup"""
    await create_default_admin()
    await create_sample_projects()
    logger.info("🚀 Sabrah Soft Portfolio API started successfully!")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
