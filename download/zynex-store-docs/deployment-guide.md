# 🚀 دليل نشر مشروع Zynex Store

> دليل شامل لنشر مشروع Zynex Store في بيئة الإنتاج
> يشمل: Vercel, VPS, Docker, Nginx, SSL, CI/CD, والمراقبة

---

## 📑 جدول المحتويات

1. [النشر على Vercel](#1-النشر-على-vercel)
2. [النشر على VPS](#2-النشر-على-vps)
3. [النشر باستخدام Docker](#3-النشر-باستخدام-docker)
4. [إعداد Nginx](#4-إعداد-nginx)
5. [SSL/TLS مع Let's Encrypt](#5-ssltls-مع-lets-encrypt)
6. [CI/CD مع GitHub Actions](#6-cicd-مع-github-actions)
7. [متغيرات البيئة للإنتاج](#7-متغيرات-البيئة-للإنتاج)
8. [استراتيجية نسخ قاعدة البيانات](#8-استراتيجية-نسخ-قاعدة-البيانات)
9. [المراقبة والتسجيل](#9-المراقبة-والتسجيل)

---

## 1. النشر على Vercel

### المتطلبات
- حساب Vercel (مجاني للبداية)
- المشروع على GitHub

### خطوات النشر

#### الخطوة 1: إعداد المشروع

```bash
# تأكد من أن المشروع يعمل محلياً
bun install
bun run build
```

#### الخطوة 2: إنشاء حساب Vercel

1. اذهب إلى [vercel.com](https://vercel.com)
2. سجّل باستخدام حساب GitHub
3. انقر على "New Project"

#### الخطوة 3: استيراد المشروع

1. اختر المستودع من GitHub
2. إعدادات البناء:
   - **Framework Preset**: Next.js
   - **Build Command**: `bun run build`
   - **Output Directory**: `.next`
   - **Install Command**: `bun install`

#### الخطوة 4: إضافة متغيرات البيئة

في صفحة إعدادات المشروع → Environment Variables:

```
DATABASE_URL=file:./db/custom.db
NEXT_PUBLIC_APP_URL=https://zynex.store
NEXTAUTH_SECRET=<generate-a-secret>
NEXTAUTH_URL=https://zynex.store
```

#### الخطوة 5: النشر

```bash
# تثبيت Vercel CLI
npm i -g vercel

# النشر
vercel --prod
```

#### ملاحظات لـ Vercel مع SQLite

> ⚠️ **تحذير مهم**: Vercel يستخدم بيئة Serverless حيث لا يُحفظ نظام الملفات بين الطلبات. SQLite غير مناسب لـ Vercel في الإنتاج.

**الحل**: الانتقال إلى قاعدة بيانات خارجية:
- **Vercel Postgres** (مُوصى به)
- **Supabase** (بديل مجاني)
- **PlanetScale** (MySQL متوافق)

**تعديل المخطط**:
```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"    // تغيير من sqlite إلى postgresql
  url      = env("DATABASE_URL")
}
```

---

## 2. النشر على VPS

### المتطلبات
- خادم Ubuntu 22.04 LTS (أو أحدث)
- 2GB RAM كحد أدنى
- 20GB مساحة تخزين
- وصول SSH كمسؤول

### الخطوة 1: إعداد الخادم

```bash
# تحديث النظام
sudo apt update && sudo apt upgrade -y

# تثبيت الأدوات الأساسية
sudo apt install -y curl git unzip build-essential

# تثبيت Bun
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc

# تثبيت Node.js (كبديل)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# تأكيد التثبيت
bun --version
node --version
```

### الخطوة 2: إعداد جدار الحماية

```bash
# تثبيت UFW
sudo apt install -y ufw

# السماح بالاتصالات المطلوبة
sudo ufw allow ssh          # المنفذ 22
sudo ufw allow http         # المنفذ 80
sudo ufw allow https        # المنفذ 443

# تفعيل جدار الحماية
sudo ufw enable

# التحقق من الحالة
sudo ufw status
```

### الخطوة 3: إنشاء مستخدم للتطبيق

```bash
# إنشاء مستخدم جديد
sudo adduser zynex

# إضافة الصلاحيات
sudo usermod -aG sudo zynex

# التبديل للمستخدم
su - zynex
```

### الخطوة 4: استنساخ المشروع

```bash
# استنساخ المستودع
git clone https://github.com/zynex-store/zynex-store.git
cd zynex-store

# تثبيت الاعتماديات
bun install
```

### الخطوة 5: إعداد متغيرات البيئة

```bash
# إنشاء ملف البيئة
cp .env.example .env

# تعديل المتغيرات
nano .env
```

محتوى ملف `.env`:
```env
DATABASE_URL="file:./db/custom.db"
NEXT_PUBLIC_APP_URL="https://zynex.store"
NEXTAUTH_SECRET="your-super-secret-key-here"
NEXTAUTH_URL="https://zynex.store"
NODE_ENV="production"
```

### الخطوة 6: بناء المشروع

```bash
# إعداد قاعدة البيانات
bun run db:push
bun run prisma/seed.ts

# بناء المشروع
bun run build
```

### الخطوة 7: إعداد PM2 (مدير العمليات)

```bash
# تثبيت PM2
npm install -g pm2

# إنشاء ملف التكوين
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'zynex-store',
    script: 'node_modules/.bin/next',
    args: 'start -p 3000',
    cwd: '/home/zynex/zynex-store',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
EOF

# تشغيل التطبيق
pm2 start ecosystem.config.js

# حفظ التكوين
pm2 save
pm2 startup
```

### الخطوة 8: أوامر PM2 المفيدة

```bash
pm2 status           # عرض حالة العمليات
pm2 logs zynex-store # عرض السجلات
pm2 restart zynex-store  # إعادة التشغيل
pm2 stop zynex-store     # إيقاف
pm2 monit            # مراقبة الموارد
```

---

## 3. النشر باستخدام Docker

### Dockerfile

```dockerfile
# ===========================================
# المرحلة 1: الاعتماديات
# ===========================================
FROM oven/bun:1 AS deps
WORKDIR /app

# نسخ ملفات الاعتماديات
COPY package.json bun.lockb ./
COPY prisma ./prisma/

# تثبيت الاعتماديات
RUN bun install --frozen-lockfile

# ===========================================
# المرحلة 2: البناء
# ===========================================
FROM oven/bun:1 AS builder
WORKDIR /app

# نسخ الاعتماديات
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# إعداد متغيرات البيئة للبناء
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# بناء المشروع
RUN bun run db:generate
RUN bun run build

# ===========================================
# المرحلة 3: الإنتاج
# ===========================================
FROM oven/bun:1 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# إنشاء مستخدم غير جذر
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# نسخ الملفات المبنية
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/db ./db

# تغيير الملكية
RUN chown -R nextjs:nodejs /app

# التبديل للمستخدم
USER nextjs

# المنفذ
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# التشغيل
CMD ["bun", "server.js"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: zynex-store
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=file:./db/custom.db
      - NEXT_PUBLIC_APP_URL=https://zynex.store
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=https://zynex.store
      - NODE_ENV=production
    volumes:
      - zynex-db:/app/db
      - zynex-uploads:/app/public/uploads
    networks:
      - zynex-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # إذا كنت تستخدم PostgreSQL بدلاً من SQLite
  # postgres:
  #   image: postgres:16-alpine
  #   container_name: zynex-postgres
  #   restart: unless-stopped
  #   environment:
  #     POSTGRES_DB: zynex_store
  #     POSTGRES_USER: zynex
  #     POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
  #   volumes:
  #     - postgres-data:/var/lib/postgresql/data
  #   networks:
  #     - zynex-network

volumes:
  zynex-db:
    driver: local
  zynex-uploads:
    driver: local
  # postgres-data:
  #   driver: local

networks:
  zynex-network:
    driver: bridge
```

### أوامر Docker

```bash
# بناء الصورة
docker compose build

# تشغيل الحاويات
docker compose up -d

# عرض السجلات
docker compose logs -f app

# إعادة البناء والنشر
docker compose up -d --build

# إيقاف الحاويات
docker compose down

# إيقاف مع حذف البيانات
docker compose down -v
```

---

## 4. إعداد Nginx

### تثبيت Nginx

```bash
sudo apt install -y nginx
```

### ملف التكوين

```nginx
# /etc/nginx/sites-available/zynex.store

# إعادة توجيه HTTP إلى HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name zynex.store www.zynex.store;
    
    # Let's Encrypt challenge
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    return 301 https://zynex.store$request_uri;
}

# إعادة توجيه www إلى بدون www
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.zynex.store;
    
    ssl_certificate /etc/letsencrypt/live/zynex.store/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/zynex.store/privkey.pem;
    
    return 301 https://zynex.store$request_uri;
}

# الخادم الرئيسي
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name zynex.store;

    # شهادات SSL
    ssl_certificate /etc/letsencrypt/live/zynex.store/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/zynex.store/privkey.pem;

    # إعدادات SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # HSTS
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

    # أمان Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip ضغط
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/xml+rss application/atom+xml image/svg+xml;

    # الملفات الثابتة (Next.js)
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, immutable";
        expires 365d;
    }

    # الصور والوسائط
    location /images/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 200 30d;
        add_header Cache-Control "public, max-age=2592000";
        expires 30d;
    }

    # API Routes
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Rate limiting (بسيط)
        limit_req zone=api burst=20 nodelay;
    }

    # باقي الطلبات
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # حجم الطلب الأقصى
    client_max_body_size 10M;

    # مهلة الاتصال
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;
}
```

### تفعيل الموقع

```bash
# إنشاء الرابط الرمزي
sudo ln -s /etc/nginx/sites-available/zynex.store /etc/nginx/sites-enabled/

# حذف الموقع الافتراضي
sudo rm /etc/nginx/sites-enabled/default

# إضافة Rate Limiting في http block
sudo nano /etc/nginx/nginx.conf
```

أضف داخل `http { ... }`:
```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=30r/m;
```

```bash
# اختبار التكوين
sudo nginx -t

# إعادة تحميل Nginx
sudo systemctl reload nginx
```

---

## 5. SSL/TLS مع Let's Encrypt

### تثبيت Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### الحصول على الشهادة

```bash
# إنشاء مجلد Certbot
sudo mkdir -p /var/www/certbot

# الحصول على الشهادة (أولاً عدّل Nginx للسماح بـ HTTP مؤقتاً)
sudo certbot certonly --webroot \
  -w /var/www/certbot \
  -d zynex.store \
  -d www.zynex.store \
  --email admin@zynex.store \
  --agree-tos \
  --no-eff-email

# الشهادات ستكون في:
# /etc/letsencrypt/live/zynex.store/fullchain.pem
# /etc/letsencrypt/live/zynex.store/privkey.pem
```

### التجديد التلقائي

```bash
# اختبار التجديد
sudo certbot renew --dry-run

# إضافة cron job للتجديد التلقائي
sudo crontab -e
```

أضف:
```
0 3 * * * certbot renew --quiet --post-hook "systemctl reload nginx"
```

### شهادة SSL ذاتية (للتطوير)

```bash
# إنشاء شهادة ذاتية
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/zynex-selfsigned.key \
  -out /etc/ssl/certs/zynex-selfsigned.crt \
  -subj "/C=YE/ST=Sanaa/L=Sanaa/O=Zynex Store/CN=zynex.store"
```

---

## 6. CI/CD مع GitHub Actions

### ملف Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy Zynex Store

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'

jobs:
  # ===========================================
  # وظيفة الفحص
  # ===========================================
  lint:
    name: فحص الكود
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: تثبيت Bun
        uses: oven-sh/setup-bun@v1

      - name: تثبيت الاعتماديات
        run: bun install

      - name: فحص ESLint
        run: bun run lint

      - name: فحص TypeScript
        run: bunx tsc --noEmit

  # ===========================================
  # وظيفة البناء
  # ===========================================
  build:
    name: بناء المشروع
    needs: lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: تثبيت Bun
        uses: oven-sh/setup-bun@v1

      - name: تثبيت الاعتماديات
        run: bun install

      - name: توليد Prisma Client
        run: bun run db:generate

      - name: بناء المشروع
        run: bun run build
        env:
          DATABASE_URL: "file:./db/test.db"
          NEXT_PUBLIC_APP_URL: "http://localhost:3000"

  # ===========================================
  # وظيفة النشر (الإنتاج فقط)
  # ===========================================
  deploy:
    name: نشر الإنتاج
    needs: build
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    steps:
      - name: النشر عبر SSH
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /home/zynex/zynex-store
            
            # سحب آخر التحديثات
            git pull origin main
            
            # تثبيت الاعتماديات
            bun install
            
            # تحديث قاعدة البيانات
            bun run db:push
            
            # بناء المشروع
            bun run build
            
            # إعادة تشغيل التطبيق
            pm2 restart zynex-store
            
            # تنظيف الملفات القديمة
            pm2 flush
            
            echo "✅ تم النشر بنجاح!"
```

### إعداد الأسرار في GitHub

اذهب إلى Settings → Secrets and variables → Actions:

| السر | الوصف |
|---|---|
| `SERVER_HOST` | عنوان IP الخادم |
| `SERVER_USER` | اسم المستخدم (zynex) |
| `SSH_PRIVATE_KEY` | مفتاح SSH الخاص |

### إنشاء مفتاح SSH للنشر

```bash
# على الخادم
ssh-keygen -t ed25519 -C "github-actions@zynex.store" -f ~/.ssh/github_actions

# إضافة المفتاح العام
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys

# نسخ المفتاح الخاص لإضافته في GitHub Secrets
cat ~/.ssh/github_actions
```

---

## 7. متغيرات البيئة للإنتاج

### ملف `.env.production`

```env
# ===========================================
# قاعدة البيانات
# ===========================================
DATABASE_URL="file:./db/custom.db"
# أو لـ PostgreSQL:
# DATABASE_URL="postgresql://zynex:password@localhost:5432/zynex_store?schema=public"

# ===========================================
# التطبيق
# ===========================================
NEXT_PUBLIC_APP_URL=https://zynex.store
NODE_ENV=production
PORT=3000

# ===========================================
# المصادقة
# ===========================================
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
NEXTAUTH_URL=https://zynex.store

# ===========================================
# البريد الإلكتروني (اختياري)
# ===========================================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@zynex.store
SMTP_PASSWORD=<app-password>

# ===========================================
# الدفع (اختياري)
# ===========================================
PAYPAL_CLIENT_ID=<paypal-client-id>
PAYPAL_CLIENT_SECRET=<paypal-client-secret>
STRIPE_SECRET_KEY=<stripe-secret-key>
STRIPE_WEBHOOK_SECRET=<stripe-webhook-secret>

# ===========================================
# المراقبة (اختياري)
# ===========================================
SENTRY_DSN=<sentry-dsn>
NEXT_PUBLIC_SENTRY_DSN=<sentry-dsn>

# ===========================================
# التخزين (اختياري)
# ===========================================
# S3_BUCKET=zynex-store-uploads
# S3_REGION=me-south-1
# S3_ACCESS_KEY=<access-key>
# S3_SECRET_KEY=<secret-key>
```

### توليد NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

---

## 8. استراتيجية نسخ قاعدة البيانات

### نسخ SQLite احتياطياً

```bash
#!/bin/bash
# backup-db.sh — سكريبت النسخ الاحتياطي

# إعدادات
DB_PATH="/home/zynex/zynex-store/db/custom.db"
BACKUP_DIR="/home/zynex/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/zynex_db_$DATE.db"

# إنشاء مجلد النسخ
mkdir -p $BACKUP_DIR

# نسخ قاعدة البيانات (باستخدام sqlite3 لضمان الاتساق)
sqlite3 $DB_PATH ".backup '$BACKUP_FILE'"

# ضغط النسخة
gzip $BACKUP_FILE

# حذف النسخ القديمة (أكثر من 30 يوم)
find $BACKUP_DIR -name "zynex_db_*.db.gz" -mtime +30 -delete

echo "✅ تم النسخ الاحتياطي: $BACKUP_FILE.gz"
```

### جدولة النسخ الاحتياطي

```bash
# إضافة cron job
crontab -e

# نسخ احتياطي يومي في الساعة 2 صباحاً
0 2 * * * /home/zynex/zynex-store/backup-db.sh >> /home/zynex/logs/backup.log 2>&1
```

### نسخ PostgreSQL احتياطياً (بديل)

```bash
#!/bin/bash
# backup-pg.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/zynex/backups"
BACKUP_FILE="$BACKUP_DIR/zynex_pg_$DATE.sql.gz"

mkdir -p $BACKUP_DIR

pg_dump -U zynex -d zynex_store | gzip > $BACKUP_FILE

find $BACKUP_DIR -name "zynex_pg_*.sql.gz" -mtime +30 -delete

echo "✅ تم النسخ الاحتياطي: $BACKUP_FILE"
```

### استعادة النسخة الاحتياطية

```bash
# SQLite
gunzip -c /home/zynex/backups/zynex_db_20250122_020000.db.gz > /home/zynex/zynex-store/db/custom.db

# PostgreSQL
gunzip -c /home/zynex/backups/zynex_pg_20250122_020000.sql.gz | psql -U zynex -d zynex_store
```

### نسخ احتياطي خارجي (S3)

```bash
# تثبيت AWS CLI
pip install awscli

# إعداد AWS
aws configure

# رفع النسخة الاحتياطية
aws s3 cp /home/zynex/backups/zynex_db_$DATE.db.gz s3://zynex-backups/daily/
```

---

## 9. المراقبة والتسجيل

### 9.1 سجلات التطبيق

```bash
# سجلات PM2
pm2 logs zynex-store

# سجلات Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# سجلات النظام
sudo journalctl -u nginx -f
```

### 9.2 مراقبة الأداء

#### تثبيت مراقب النظام

```bash
# تثبيت htop
sudo apt install -y htop

# مراقبة الموارد
htop

# مراقبة القرص
df -h

# مراقبة الذاكرة
free -m

# مراقبة الشبكة
ss -tulpn
```

#### إعداد Prometheus + Grafana (اختياري)

```yaml
# docker-compose.monitoring.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    container_name: zynex-prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    networks:
      - zynex-network

  grafana:
    image: grafana/grafana:latest
    container_name: zynex-grafana
    ports:
      - "3001:3000"
    volumes:
      - grafana-data:/var/lib/grafana
    networks:
      - zynex-network
    depends_on:
      - prometheus

volumes:
  prometheus-data:
  grafana-data:

networks:
  zynex-network:
    external: true
```

### 9.3 مراقبة وقت التشغيل (Uptime Monitoring)

#### خيارات مجانية
- **UptimeRobot** — 50 مراقب مجاني، تنبيهات عبر البريد/Telegram
- **BetterStack** — مراقبة مجانية مع صفحات حالة

#### إعداد UptimeRobot

1. سجّل في [uptimerobot.com](https://uptimerobot.com)
2. أضف مراقب جديد:
   - **النوع**: HTTP(s)
   - **الرابط**: `https://zynex.store/api`
   - **الفاصل**: 5 دقائق
3. أضف تنبيهات:
   - البريد الإلكتروني
   - Telegram bot
   - Slack webhook

### 9.4 تتبع الأخطاء مع Sentry

```bash
# تثبيت Sentry SDK
bun add @sentry/nextjs

# إعداد Sentry
bunx @sentry/wizard@latest -i nextjs
```

التهيئة في `sentry.client.config.ts`:
```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  debug: false,
});
```

### 9.5 تحليلات الأداء

#### Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: treosh/lighthouse-ci-action@v11
        with:
          urls: |
            https://zynex.store
          uploadArtifacts: true
          budgetPath: ./budget.json
```

#### ميزانية الأداء (`budget.json`)

```json
[
  {
    "path": "/*",
    "options": {
      "firstContentfulPaint": 1500,
      "largestContentfulPaint": 2500,
      "cumulativeLayoutShift": 0.1,
      "totalBlockingTime": 600
    }
  }
]
```

### 9.6 لوحة المراقبة الموصى بها

| المؤشر | الأداة | الفاصل |
|---|---|---|
| Uptime | UptimeRobot | 5 دقائق |
| الأداء | Lighthouse CI | كل push |
| الأخطاء | Sentry | فوري |
| الموارد | PM2 Plus / Grafana | 10 ثوانٍ |
| سجلات | PM2 Logs / Loki | فوري |
| Analytics | Vercel Analytics / Plausible | يومي |

---

## 📋 قائمة فحص النشر

استخدم هذه القائمة قبل النشر إلى الإنتاج:

### الأمان
- [ ] تغيير كلمات المرور الافتراضية
- [ ] توليد NEXTAUTH_SECRET جديد
- [ ] تفعيل HTTPS
- [ ] إعداد CSRF Protection
- [ ] تفعيل Rate Limiting
- [ ] استبدال simpleHash بـ bcrypt
- [ ] إعداد أمان Headers

### الأداء
- [ ] بناء المشروع بـ `NODE_ENV=production`
- [ ] تفعيل ضغط Gzip في Nginx
- [ ] إعداد Cache-Control headers
- [ ] تحسين الصور
- [ ] تفعيل CDN (اختياري)

### المراقبة
- [ ] إعداد Uptime Monitoring
- [ ] إعداد Error Tracking (Sentry)
- [ ] إعداد النسخ الاحتياطي
- [ ] إعداد تنبيهات البريد/Telegram

### قاعدة البيانات
- [ ] تشغيل `bun run db:push`
- [ ] تشغيل `bun run prisma/seed.ts`
- [ ] اختبار النسخ الاحتياطي والاستعادة
- [ ] الترقية إلى PostgreSQL (اختياري)

### اختبار
- [ ] اختبار جميع مسارات API
- [ ] اختبار تسجيل الدخول والتسجيل
- [ ] اختبار إنشاء الطلب
- [ ] اختبار الكوبونات
- [ ] اختبار على أجهزة متعددة (جوال، تابلت، كمبيوتر)
- [ ] اختبار المتصفحات (Chrome, Firefox, Safari)

---

<div align="center">

**دليل النشر لمشروع Zynex Store — تم إعداده بعناية**

© 2025 Zynex Store

</div>
