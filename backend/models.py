from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid
from enum import Enum

class ProjectCategory(str, Enum):
    WEB_SYSTEM = "نظام ويب"
    ANDROID_APP = "تطبيق أندرويد"

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    category: ProjectCategory
    technologies: List[str]
    image: str
    demoLink: str
    githubLink: str
    featured: bool = False
    bg_color: str = Field(default_factory=lambda: f"#{uuid.uuid4().hex[:6]}")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ProjectCreate(BaseModel):
    title: str
    description: str
    category: ProjectCategory
    technologies: List[str]
    image: str
    demoLink: str
    githubLink: str
    featured: bool = False

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[ProjectCategory] = None
    technologies: Optional[List[str]] = None
    image: Optional[str] = None
    demoLink: Optional[str] = None
    githubLink: Optional[str] = None
    featured: Optional[bool] = None
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class AdminUser(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    password: str  # This will be hashed
    created_at: datetime = Field(default_factory=datetime.utcnow)

class AdminLogin(BaseModel):
    username: str
    password: str

class AdminLoginResponse(BaseModel):
    access_token: str
    token_type: str
    expires_in: int

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)