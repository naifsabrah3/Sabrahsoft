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
    demo_link: str = Field(alias="demoLink")
    github_link: str = Field(alias="githubLink")
    featured: bool = False
    bg_color: str = Field(default_factory=lambda: f"#{uuid.uuid4().hex[:6]}")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True

class ProjectCreate(BaseModel):
    title: str
    description: str
    category: ProjectCategory
    technologies: List[str]
    image: str
    demo_link: str = Field(alias="demoLink")
    github_link: str = Field(alias="githubLink")
    featured: bool = False

    class Config:
        allow_population_by_field_name = True

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[ProjectCategory] = None
    technologies: Optional[List[str]] = None
    image: Optional[str] = None
    demo_link: Optional[str] = Field(None, alias="demoLink")
    github_link: Optional[str] = Field(None, alias="githubLink")
    featured: Optional[bool] = None
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True

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