"""Pydantic schemas for User entities."""

import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class UserBase(BaseModel):
    """Base user schema."""

    email: str = Field(..., description="User email address")
    full_name: str = Field(..., description="Full display name")
    role: str = Field(default="participant", description="User access role")
    is_active: bool = Field(default=True, description="Account active status")


class UserCreate(UserBase):
    """User creation schema (preview)."""

    password: str = Field(..., min_length=8, description="Plaintext password")


class UserRead(UserBase):
    """User read schema."""

    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
