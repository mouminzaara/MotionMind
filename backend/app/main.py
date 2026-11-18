"""FastAPI application entrypoint for MotionMind Movement Intelligence Platform."""

import os
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# Ensure SQLAlchemy pure Python execution
os.environ.setdefault("DISABLE_SQLALCHEMY_CEXT", "1")

from app.core.config import settings
from app.api.v1.api import api_router

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL.upper(), logging.INFO),
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("motionmind")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application startup and shutdown lifecycle management."""
    logger.info("Initializing MotionMind API v%s [%s]", settings.APP_VERSION, settings.ENVIRONMENT)
    logger.info("CORS allowed origins: %s", settings.ALLOWED_ORIGINS)
    yield
    logger.info("Shutting down MotionMind API")


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description=(
        "MotionMind API: Production-oriented backend for webcam-based movement measurement, "
        "sit-to-stand kinematics tracking, and reviewer synchronization. "
        "Strictly a movement measurement tool; non-diagnostic."
    ),
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan,
)

# Configure CORS Middleware for local frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API v1 router
app.include_router(api_router, prefix=settings.API_V1_PREFIX)


@app.get("/", tags=["Root"])
def root_info() -> dict:
    """Root info endpoint providing basic platform descriptor and links."""
    return {
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "environment": settings.ENVIRONMENT,
        "status": "online",
        "documentation": "/docs",
        "health": f"{settings.API_V1_PREFIX}/health",
        "notice": "MotionMind is an objective movement measurement product; strictly non-diagnostic.",
    }

