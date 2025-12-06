# Domain conflict audit (samyun-wan.life vs *.netlify.app)

## Findings (current status)
- `public/blogs/index.html` — удалён (устаревший каноникал/OG/LD на Netlify больше не мешает).
- `dev.html` — ссылки теперь ведут на `https://qr-wan.netlify.app/` (помечены nofollow для избежания индексации).
- `tmp_hy_blogs.html` — нет строк с Netlify, оставить как офлайн-выгрузку, если не публикуется.
- `public/sitemap-0.xml` — корректно указывает на `https://samyun-wan.life/*`.
- Redirectы в `netlify.toml` для `*.netlify.app` → `samyun-wan.life` уже есть.
- Документация (`docs/seo-roadmap.md`) всё ещё ссылается на Netlify property (нормально для мониторинга, но отражает легаси).

## Recommended fixes
- Провести сборку/деплой и очистку кэшей/CDN.
- На проде убедиться, что страницы `/`, `/hy`, `/ru`, `/en`, `/products`, `/blogs` и блоги возвращают каноникал на `https://samyun-wan.life/...`.
- Пересдать `sitemap.xml` и запустить URL Inspection по ключевым URL на `samyun-wan.life`.

## Priority checks (после деплоя)
- `/`, `/hy`, `/ru`, `/en`, `/products`, `/blogs` + детали блогов: 200 без редиректов, каноникал `samyun-wan.life`.
- LD+JSON без HTML-экранирования (`&quot;`), проверка через `curl ... | rg '<script type="application/ld+json"' -C2`.
- URL Inspection для перечисленных страниц.

## Batch remediation plan (актуально теперь)
- Консистентность каноникалов: `NEXT_PUBLIC_SITE_URL=https://samyun-wan.life`, проверка `<head>` на проде.
- Redirects: в `netlify.toml` уже настроены `*.netlify.app` → `samyun-wan.life`; верифицировать `curl -I` с http/https.
- Доступность: `dev.html` не публиковать/не ссылать наружу.
- Перекраул: отправить `sitemap.xml`, запустить URL Inspection для главных/языковых/продуктовых/блоговых страниц.

## Google Search Console - чек-лист (ручные действия)
- Live Test + Request Indexing: в URL Inspection вбить https://samyun-wan.life/hy, выполнить Live Test и сразу запросить индексацию.
- Пересдать sitemap: в разделе Sitemaps повторно отправить https://samyun-wan.life/sitemap.xml, убедиться в статусе Success и свежей дате.
- Coverage/Pages: найти /hy; если статус “Crawled currently not indexed” или “Duplicate without user-selected canonical”, зафиксировать для последующего фиксинга.
- Внутренние ссылки/soft 404: проверить, что /hy доступен из меню/футера и с содержимым, достаточным для исключения soft 404.
- WAF/бот-фильтр: по логам убедиться, что Googlebot не получает 403/капчу на /hy и отвечает 200.
## SEO-аудит (индексация и контент)
- GSC: добавить домен как Domain property (samyun-wan.life), убедиться, что не остался только старый Netlify-домен.
- Sitemaps: отправить `https://samyun-wan.life/sitemap.xml` в GSC; проверить статус и дату получения.
- Coverage/Pages: посмотреть Indexed / Crawled currently not indexed / Duplicate without user-selected canonical; если есть проблемные статусы, зафиксировать URL.
- Тайтлы (усилить вариативность):
  - Главная: `Samyun Wan Armenia – Քաշի ավելացման օրիգինալ հավելում Երևանում и Հայաստանում`.
  - Продукт: `Samyun Wan capsulls – Քաշի ավելացման орիգинал • 14,000 դրամ`.
  - About: `Samyun Wan Armenia – Պաշտոնական ներկայացուցիչը Հայաստանում`.
  - Блог-посты: `Samyun Wan սննդակարգ – Ընդհանուր առողջ ծրագիր քաշի ավելացման համար`.
- Контент: на продуктовой странице расширить блоки — симптомы/когда нужно, кому подходит/нельзя, схема приёма, FAQ.
- Ключевые запросы (встраивать естественно в H1/H2, первые абзацы, FAQ, блог):
  - HY: Samyun Wan Հայաստան; Սամյուն Վան գնել; Samyun Wan Երևան; քաշի ավելացման դեղեր; քաշի ավելացման հավելում բնական; օրիգինալ Samyun Wan Հայաստան.
  - RU: Samyun Wan купить в Ереване; Самюн ван оригинал Армения; таблетки для набора веса Ереван.
