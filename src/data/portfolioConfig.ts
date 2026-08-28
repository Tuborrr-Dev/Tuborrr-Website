import { DeveloperProfile, ProjectItem, FeatureTier, BlogPost, SkillCategory } from '../types/portfolio';

export const developerProfile: DeveloperProfile = {
  name: "Israel Adetubo",
  role: "Software & AI Systems Engineer",
  tagline: "Engineering production grade APIs, automation infrastructures and real-time data services.",
  heroTypewriterPrefix: "Architecting ",
  heroTypewriterTexts: [
    "real-time AI annotation microservices & SSE data feeds.",
    "high-performance FastAPI, Express, Django & Flask backends.",
    "fault-tolerant web scrapers & automated ETL pipelines.",
    "caching backbones with Redis, PostgreSQL & SQLAlchemy.",
    "production systems in the agent-first era."
  ],
  bio: "Backend Engineer specializing in Python (FastAPI, Django, Flask) and JavaScript / Node.js (Express), with 2+ years of software development and automation experience building REST APIs, automation systems, and real-time data services. Proven ability to design SQL database applications, integrate Redis caching, and develop AI-powered microservices using LLMs and live data streams.",
  status: "Open to Backend & AI Engineering Roles",
  location: "Lagos, Nigeria • Remote",
  yearsOfExperience: "2+ Years",
  email: "israeltubo@gmail.com",
  socials: {
    github: "https://github.com/Tuborrr-Dev",
    linkedin: "https://www.linkedin.com/in/adetubo-israel/",
    twitter: "https://x.com/Tuborrr",
    email: "mailto:israeltubo@gmail.com"
  },
  resumeUrl: "https://drive.google.com/file/d/10a5QrAhx1kuBttTu2hNkC8HXMlOPf4jZ/view?usp=drive_link"
};

export const techIcons = [
  { name: "Python", icon: "terminal", category: "Core Language", color: "#3776AB" },
  { name: "JavaScript", icon: "code", category: "Core Language", color: "#F7DF1E" },
  { name: "Node.js", icon: "server", category: "Runtime", color: "#5FA04E" },
  { name: "Express.js", icon: "layers", category: "Framework", color: "#ffffff" },
  { name: "FastAPI", icon: "zap", category: "Framework", color: "#009688" },
  { name: "Django", icon: "server", category: "Framework", color: "#092E20" },
  { name: "Flask", icon: "code", category: "Framework", color: "#ffffff" },
  { name: "Docker", icon: "container", category: "DevOps", color: "#2496ED" },
  { name: "C++", icon: "cpu", category: "Systems", color: "#00599C" },
  { name: "C#", icon: "code", category: "Languages", color: "#68217A" },
  { name: "PostgreSQL", icon: "database", category: "SQL Database", color: "#4169E1" },
  { name: "Redis", icon: "zap", category: "Cache & Broker", color: "#DC382D" },
  { name: "SQLAlchemy", icon: "binary", category: "Async ORM", color: "#D71E00" },
  { name: "Groq / LLMs", icon: "sparkles", category: "AI & Agents", color: "#3186FF" },
  { name: "Selenium", icon: "box", category: "Automation", color: "#43B02A" },
  { name: "BeautifulSoup", icon: "layers", category: "Scraping", color: "#FBBC04" },
  { name: "Pandas / NumPy", icon: "cpu", category: "Data ETL", color: "#150458" },
  { name: "Git", icon: "git-branch", category: "VCS", color: "#F05032" },
  { name: "Pydantic", icon: "shield", category: "Validation", color: "#E92063" },
  { name: "REST APIs", icon: "network", category: "Architecture", color: "#00B95C" },
  { name: "PyTest / Unittest", icon: "radio", category: "Testing", color: "#0A9EDC" }
];

export const featureTiers: FeatureTier[] = [
  {
    id: "pitchline-ai",
    title: "AI Annotation Microservice",
    subtitle: "Pitchline: Live Win Probability Terminal (2026)",
    badge: "LLM & SSE Streaming",
    description: "Backend owner on a 3-engineer hackathon team. Developed the real-time AI annotation engine for football fans, using rule-based significance detection and LLM-driven match annotations (Groq Llama 3.3 70B) over a live Server-Sent Events (SSE) data stream.",
    language: "python",
    actionText: "Open Pitchline Web App",
    features: [
      "Live Server-Sent Events (SSE) match event streaming",
      "Groq Llama 3.3 70B integration for instant tactical commentary",
      "Rule-based significance detection algorithm with zero latency",
      "FastAPI + Redis + PostgreSQL backend architecture"
    ],
    codeSnippet: `import asyncio
from fastapi import FastAPI
from sse_starlette.sse import EventSourceResponse
from groq import AsyncGroq
import redis.asyncio as aioredis

app = FastAPI(title="Pitchline AI Match Annotator")
groq_client = AsyncGroq(api_key="GROQ_API_KEY")
redis_client = aioredis.from_url("redis://localhost:6379")

async def generate_match_annotation(event_data: dict) -> str:
    """Evaluates match significance and triggers Groq Llama 3.3 70B commentary."""
    if event_data.get("xG_delta", 0) > 0.35 or event_data.get("is_red_card"):
        prompt = f"Summarize key shift: {event_data['event_desc']} (Win Prob: {event_data['win_prob']}%)"
        completion = await groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=60
        )
        return completion.choices[0].message.content
    return "Standard possession progression."

@app.get("/stream/match/{match_id}")
async def match_stream(match_id: str):
    async def event_generator():
        pubsub = redis_client.pubsub()
        await pubsub.subscribe(f"match_events:{match_id}")
        async for message in pubsub.listen():
            if message["type"] == "message":
                yield {"event": "annotation", "data": message["data"].decode("utf-8")}
    return EventSourceResponse(event_generator())`
  },
  {
    id: "weather-cache",
    title: "Typed Geocoding & Weather Cache",
    subtitle: "FastAPI + Redis In-Memory Microservice (2025)",
    badge: "FastAPI & Redis",
    description: "Implemented a clean, typed weather service wrapping the OpenWeatherMap API using Python, Pydantic, and requests. Features in-built geocoding resolution and an in-memory Redis caching layer with a 60-second TTL window to eliminate redundant upstream calls.",
    language: "python",
    actionText: "Open Weather App",
    actionUrl: "https://tuborrr-dev.github.io/Weather-API-Wrapper/",
    actionExternal: true,
    features: [
      "Pydantic strict schema validation & response models",
      "Redis TTL caching layer preventing redundant upstream API calls",
      "Automated coordinate geocoding fallback resolution",
      "Sub-5ms response time on cached requests"
    ],
    codeSnippet: `from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field
import redis.asyncio as redis
import httpx
import json

app = FastAPI(title="Weather Geocoding Microservice")
cache = redis.from_url("redis://localhost:6379", decode_responses=True)

class WeatherResponse(BaseModel):
    city: str
    temperature_celsius: float
    condition: str
    humidity: int
    cached: bool = False

@app.get("/weather", response_model=WeatherResponse)
async def get_weather(city: str):
    cache_key = f"weather:{city.lower().strip()}"
    cached_data = await cache.get(cache_key)
    
    if cached_data:
        res = json.loads(cached_data)
        res["cached"] = True
        return res
        
    # Upstream OpenWeatherMap query
    async with httpx.AsyncClient() as client:
        resp = await client.get(f"https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid=KEY")
        if resp.status_code != 200:
            raise HTTPException(status_code=404, detail="City not found")
        data = resp.json()
        
    result = {
        "city": data["name"],
        "temperature_celsius": data["main"]["temp"],
        "condition": data["weather"][0]["description"],
        "humidity": data["main"]["humidity"],
        "cached": False
    }
    
    # Cache for 60 seconds
    await cache.setex(cache_key, 60, json.dumps(result))
    return result`
  },
  {
    id: "lsa-booking",
    title: "LSA Booking REST Platform",
    subtitle: "Multi-Role Auth & Idempotent Webhook Engine (2026)",
    badge: "Flask & Async SQLAlchemy",
    description: "Assembled a high-reliability Flask REST API connecting parents with Learning Support Assistants (LSAs). Implemented Flask JWT extended multi-role authentication, Razorpay-style HMAC signature verification webhooks with idempotent processing to prevent double charges, and query optimization eliminating N+1 bottlenecks.",
    language: "python",
    actionText: "View GitHub Repo",
    features: [
      "Flask-JWT-Extended role-based access control (RBAC)",
      "HMAC SHA256 webhook signature validation & replay protection",
      "Idempotent event processing database layer for payment safety",
      "Compound SQL indexing and joinedload to eradicate N+1 queries"
    ],
    codeSnippet: `import hmac
import hashlib
from flask import Blueprint, request, jsonify
from sqlalchemy.orm import joinedload
from models import db, Booking, PaymentLog, User

booking_bp = Blueprint('booking', __name__)

@booking_bp.route('/webhooks/payment', methods=['POST'])
def handle_payment_webhook():
    signature = request.headers.get('X-Razorpay-Signature')
    payload = request.get_data()
    secret = b"WEBHOOK_SECRET_KEY"
    
    # 1. Verify HMAC SHA256 Signature
    expected = hmac.new(secret, payload, hashlib.sha256).hexdigest()
    if not hmac.compare_digest(signature, expected):
        return jsonify({"error": "Invalid signature"}), 400
        
    event = request.json
    event_id = event.get('id')
    
    # 2. Idempotency Guard
    if PaymentLog.query.filter_by(event_id=event_id).first():
        return jsonify({"status": "already_processed"}), 200
        
    # 3. Process Booking State Update in Transaction
    booking = Booking.query.options(joinedload(Booking.parent), joinedload(Booking.lsa)).filter_by(id=event['booking_id']).first()
    booking.status = "CONFIRMED"
    db.session.add(PaymentLog(event_id=event_id, amount=event['amount']))
    db.session.commit()
    return jsonify({"status": "success"}), 200`
  },
  {
    id: "node-express",
    title: "Node.js & Express REST APIs",
    subtitle: "High-Throughput Microservices & Real-Time Handlers",
    badge: "Node.js & Express",
    description: "Designing lightweight asynchronous REST routes, JWT middleware, rate limiters, and real-time WebSockets event listeners using Node.js and Express.",
    language: "typescript",
    actionText: "View Express Service",
    features: [
      "Modular Express router pipelines with error-handling middleware",
      "Asynchronous I/O with non-blocking event loops",
      "JWT token validation & CORS configuration",
      "Redis session store integration"
    ],
    codeSnippet: `import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { createClient } from 'redis';

const app = express();
const redis = createClient({ url: process.env.REDIS_URL });

app.use(cors());
app.use(express.json());

// Real-time Event Route with Redis In-Memory Cache
app.get('/api/v1/telemetry/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const cached = await redis.get(\`telemetry:\${id}\`);
    
    if (cached) {
      return res.status(200).json({ data: JSON.parse(cached), source: 'cache' });
    }
    
    const payload = { id, timestamp: Date.now(), status: 'ONLINE', metrics: { latency: 4.2 } };
    await redis.setEx(\`telemetry:\${id}\`, 30, JSON.stringify(payload));
    
    return res.status(200).json({ data: payload, source: 'live' });
  } catch (err) {
    next(err);
  }
});`
  }
];

export const projectItems: ProjectItem[] = [
  {
    id: "pitchline-terminal",
    title: "Pitchline AI Match Annotation Microservice",
    category: "AI Agents",
    tagline: "Real-time win probability & LLM match annotations for football fans (2026)",
    description: "A real-time win probability terminal and AI commentary service utilizing FastAPI, Redis, PostgreSQL, and Groq Llama 3.3 70B over live Server-Sent Events (SSE).",
    longDescription: "Built as backend owner on a 3-engineer hackathon team. Engineered the significance detection algorithm that evaluates live football telemetry and triggers rule-based and LLM-driven (Groq Llama 3.3 70B) tactical match commentary streamed directly to clients over SSE.",
    highlights: [
      "Real-time Server-Sent Events (SSE) data stream pipeline",
      "Integrated Groq Llama 3.3 70B for sub-second match commentary generation",
      "Redis pub/sub broker coordinating multi-client event broadcasting",
      "PostgreSQL persistence layer with optimized indexing for live statistics"
    ],
    techStack: ["Python", "FastAPI", "Redis", "PostgreSQL", "Groq Llama 3.3", "SSE"],
    image: "/tech/pitchline-preview.png",
    featured: true,
    metrics: [
      { label: "LLM Model", value: "Llama 3.3 70B" },
      { label: "Protocol", value: "Live SSE" },
      { label: "Stack", value: "FastAPI+Redis" }
    ],
    demoUrl: "https://pitchline-five.vercel.app/",
    githubUrl: "https://github.com/Tuborrr-Dev"
  },
  {
    id: "weather-caching-service",
    title: "OpenWeatherMap Typed Caching Microservice",
    category: "Systems",
    tagline: "FastAPI geocoding and Redis in-memory cached weather API (2025)",
    description: "A high-performance weather endpoint wrapping OpenWeatherMap with Pydantic request/response validation, in-built geocoding, and a 60s Redis caching layer.",
    longDescription: "Implemented a typed backend service that abstracts upstream weather APIs. Employs Pydantic schemas for data integrity and an in-memory Redis cache with 60-second TTL to eliminate redundant network roundtrips and protect against API rate limits.",
    highlights: [
      "Redis TTL caching window saving upstream API costs",
      "Strict schema enforcement and error handling with Pydantic",
      "Sub-5ms response latency for cached city queries",
      "Fully containerized with Docker for seamless deployment"
    ],
    techStack: ["Python", "FastAPI", "Redis", "Pydantic", "Docker", "REST API"],
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    metrics: [
      { label: "Cache TTL", value: "60 Seconds" },
      { label: "Response", value: "<5ms Cached" },
      { label: "Validation", value: "Pydantic" }
    ],
    demoUrl: "https://tuborrr-dev.github.io/Weather-API-Wrapper/",
    githubUrl: "https://github.com/Tuborrr-Dev"
  },
  {
    id: "lsa-booking-platform",
    title: "LSA Booking Platform REST API",
    category: "Fullstack",
    tagline: "Flask REST API connecting parents with Learning Support Assistants (2026)",
    description: "High-security booking backend featuring Flask JWT extended multi-role authentication, Razorpay HMAC verified webhooks, and idempotent payment processing.",
    longDescription: "Assembled a robust REST API connecting parents with Learning Support Assistants. Designed multi-role authorization schemes, integrated payment webhooks with cryptographic HMAC signature verification, and optimized database queries with compound indexing to eliminate N+1 latency.",
    highlights: [
      "Flask-JWT-Extended role-based authorization for parents and assistants",
      "HMAC signature verification with idempotency protection against duplicate charges",
      "SQLAlchemy async ORM query optimization with eager loading (zero N+1 queries)",
      "Automated test coverage with PyTest and Unittest"
    ],
    techStack: ["Python", "Flask", "PostgreSQL", "SQLAlchemy", "Flask-JWT", "PyTest"],
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    metrics: [
      { label: "Auth", value: "JWT RBAC" },
      { label: "Webhooks", value: "HMAC SHA256" },
      { label: "Optimization", value: "0 N+1 Queries" }
    ],
    demoUrl: "https://github.com/Tuborrr-Dev/HabotConnect-LSA",
    githubUrl: "https://github.com/Tuborrr-Dev/HabotConnect-LSA"
  },
  {
    id: "selenium-audit-automation",
    title: "Google Search Automation & Audit Pipeline",
    category: "Systems",
    tagline: "Python & Selenium automation parsing dynamic DOM into structured Excel data (2025)",
    description: "Automated browser interaction tool extracting search result titles and target URLs for quantitative marketing and SEO auditing.",
    longDescription: "Designed an automated extraction pipeline using Python and Selenium. Overcomes unorganized DOM structures and dynamic page renders, sanitizing extracted data directly into formatted Excel spreadsheets for auditing and analytics.",
    highlights: [
      "Automates browser interactions and parses unorganized DOM trees",
      "Exports sanitized, structured data directly into Xlsx databases with Pandas",
      "Resilient error handling and explicit waits for dynamic JavaScript renders"
    ],
    techStack: ["Python", "Selenium", "Pandas", "Openpyxl", "DOM Parsing"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    metrics: [
      { label: "Output", value: "Formatted Xlsx" },
      { label: "Engine", value: "Selenium" },
      { label: "Data Integrity", value: "100%" }
    ],
    demoUrl: "https://github.com/Tuborrr-Dev",
    githubUrl: "https://github.com/Tuborrr-Dev"
  },
  {
    id: "multipage-crawler-etl",
    title: "Multi-Page Web Crawler & ETL Pipeline",
    category: "Systems",
    tagline: "Python, Selenium, BeautifulSoup & Requests pagination ETL pipeline (2024)",
    description: "Scalable scraping engine extracting structured text data across dynamic pagination systems with automated data cleaning in Pandas.",
    longDescription: "Bundled a resilient web crawler utilizing Python, Selenium, BeautifulSoup, and Requests. Features automated network timeout recovery, missing element handling, and a custom Pandas serialization pipeline for high data integrity.",
    highlights: [
      "Dynamic pagination traversal with network timeout resilience",
      "Automated HTML serialization into structured Excel databases",
      "Error handling routines cutting pipeline failures by ~80%"
    ],
    techStack: ["Python", "BeautifulSoup", "Selenium", "Requests", "Pandas"],
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    metrics: [
      { label: "Reliability", value: "99%+" },
      { label: "Failure Drop", value: "-80%" },
      { label: "Tooling", value: "BeautifulSoup" }
    ],
    demoUrl: "https://github.com/Tuborrr-Dev",
    githubUrl: "https://github.com/Tuborrr-Dev"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Backend Architecture & REST APIs",
    description: "Designing clean, schema-validated REST APIs, asynchronous microservices, and database layers.",
    skills: [
      { name: "Python", level: "Expert", icon: "terminal", category: "Backend", featured: true },
      { name: "JavaScript / Node.js", level: "Proficient", icon: "code", category: "Backend", featured: true },
      { name: "Express.js", level: "Proficient", icon: "layers", category: "Backend", featured: true },
      { name: "FastAPI / Pydantic", level: "Expert", icon: "zap", category: "Backend", featured: true },
      { name: "Django / Flask", level: "Expert", icon: "server", category: "Backend", featured: true },
      { name: "SQLAlchemy (Async ORM)", level: "Expert", icon: "binary", category: "Backend", featured: true }
    ]
  },
  {
    title: "Databases, Caching & Real-Time",
    description: "Designing relational schemas, indexing strategies, in-memory caching, and streaming protocols.",
    skills: [
      { name: "PostgreSQL", level: "Expert", icon: "database", category: "Database", featured: true },
      { name: "Redis (Cache & Pub/Sub)", level: "Expert", icon: "zap", category: "Database", featured: true },
      { name: "MySQL / SQLite", level: "Advanced", icon: "database", category: "Database" },
      { name: "Server-Sent Events (SSE)", level: "Advanced", icon: "radio", category: "Realtime", featured: true },
      { name: "Database Design & ORM", level: "Expert", icon: "binary", category: "Database" }
    ]
  },
  {
    title: "AI Integration & Automation ETL",
    description: "LLM API integrations, headless browser automation, dynamic scraping, and data parsing.",
    skills: [
      { name: "Groq / Llama 3.3 / LLM APIs", level: "Advanced", icon: "sparkles", category: "AI", featured: true },
      { name: "Docker Containerization", level: "Advanced", icon: "container", category: "DevOps", featured: true },
      { name: "Selenium Automation", level: "Expert", icon: "box", category: "Automation", featured: true },
      { name: "BeautifulSoup & Requests", level: "Expert", icon: "layers", category: "Automation", featured: true },
      { name: "Pandas & NumPy ETL", level: "Expert", icon: "cpu", category: "Data", featured: true }
    ]
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "medium-featured-article",
    title: "Engineering Insights & Backend Architecture",
    summary: "Featured technical writing by Israel Adetubo covering Python backend systems, microservice patterns, and AI integration.",
    date: "Aug 2026",
    readTime: "5 min read",
    tags: ["Medium", "Backend", "Python", "Architecture"],
    image: "/tech/backend-architecture-pillars.webp",
    slug: "medium-article",
    link: "https://medium.com/@israeltubo/e047b9393f67?sharedUserId=israeltubo"
  },
  {
    id: "realtime-sse-llm-annotations",
    title: "Building Real-Time Match Annotation Terminals with FastAPI & Groq LLMs",
    summary: "How we architected Pitchline to evaluate match significance and stream LLM commentary over Server-Sent Events with sub-second latency.",
    date: "Jul 2026",
    readTime: "6 min read",
    tags: ["FastAPI", "Groq Llama 3.3", "SSE", "Redis"],
    image: "/tech/match-annotations-terminal.jpg",
    slug: "realtime-sse-llm-annotations"
  },
  {
    id: "preventing-duplicate-webhook-charges",
    title: "Idempotent Event Processing & HMAC Verification in Flask",
    summary: "Designing bulletproof webhook ingestion pipelines with cryptographic signature validation and zero duplicate payment charges.",
    date: "Jun 2026",
    readTime: "7 min read",
    tags: ["Flask", "PostgreSQL", "Security", "Webhooks"],
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
    slug: "preventing-duplicate-webhook-charges"
  },
  {
    id: "resilient-selenium-scraping",
    title: "Scaling Selenium & BeautifulSoup Pipelines to 99%+ Reliability",
    summary: "Overcoming dynamic DOM shifts, network timeouts, and anti-bot obstacles to automate enterprise reporting workflows.",
    date: "May 2026",
    readTime: "5 min read",
    tags: ["Selenium", "BeautifulSoup", "Pandas", "Automation"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    slug: "resilient-selenium-scraping"
  }
];
