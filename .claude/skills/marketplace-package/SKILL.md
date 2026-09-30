---
name: marketplace-package
description: Prepare a finished template for sale on rtl-theme.com (or ThemeForest-style marketplaces) by building the release zip, writing the Persian product description, feature list, preview screenshots, changelog and license notes. Use when a template is done and needs to be listed or updated.
---

# Marketplace packaging (rtl-theme.com)

> The live rtl-theme submission rules could not be fetched from this environment (host blocked).
> Verify current requirements (cover image size, zip size limit, demo URL rules) in the seller panel before uploading.

## 1. Release zip

```bash
tools/package.sh <slug>      # dist/<slug>-v<version>.zip
```

Layout: `html/` (the template), `documentation/` (Persian guide), `source/` (src + build tool for developers).
All fonts are OFL and icons ISC, and their license files ship in `html/licenses/`.

## 2. Screenshots

```bash
node tools/qa.mjs <slug> --full --widths=1440          # full-page desktop shots
node tools/qa.mjs <slug> --full --widths=1440 --dark
node tools/qa.mjs <slug> --widths=390 --full           # mobile shots
```

Pick: home (light + dark), 3–5 key inner pages, one mobile collage. Cover image: the hero at 1440px, cropped.

## 3. Product description (Persian), structure

1. **عنوان**: «قالب HTML <نام> | <حوزه>» e.g. «قالب HTML پیشخوان | پنل مدیریت حرفه‌ای»
2. One-paragraph pitch: who it's for and the benefit.
3. **ویژگی‌ها** (bullets): تعداد صفحات، راست‌چین کامل، ریسپانسیو، حالت تاریک، فونت وزیرمتن (رایگان و قانونی)،
   تقویم شمسی، بدون وابستگی به CDN، جاوااسکریپت خالص (بدون jQuery/Bootstrap)، کد تمیز و کامنت‌گذاری‌شده،
   مستندات فارسی، سازگار با مرورگرهای مدرن، قابل تبدیل به وردپرس/لاراول.
4. **صفحات**: full list.
5. **پشتیبانی و به‌روزرسانی**: support policy.
6. **منابع و لایسنس‌ها**: fonts (OFL), icons (Lucide, ISC), no stock photos included.

Write the description to `src/<slug>/static/PRODUCT.fa.md` so it's versioned with the template.

## 4. Pricing guidance (rtl-theme HTML templates, from market knowledge)

Typical range roughly 150k–600k تومان depending on pages/complexity. Dashboards and multi-page shops sit at the high end.
Revisit against current listings before publishing.

## 5. Version bumps

- Bump `version` in `src/<slug>/site.mjs`, add a dated entry (Jalali + Gregorian) to `static/CHANGELOG.md`.
- Rebuild, QA, package.
