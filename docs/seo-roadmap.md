# SEO-маршрут — samyun-wan.life

## Сделано (этот апдейт)
- Канонический домен переключён на `https://samyun-wan.life` в конфиге, переводах и старом статическом HTML.
- Netlify теперь делает 301-редирект с `.netlify.app` на кастомный домен (http + https).
- Документы/шаблоны для верификации обновлены под новый домен.

## Срочные действия после деплоя
- [ ] Задеплоить с `NEXT_PUBLIC_SITE_URL=https://samyun-wan.life`, дать postbuild сгенерировать новые карты сайта; проверить `https://samyun-wan.life/robots.txt` и `/sitemap.xml`.
- [ ] Добавить/верифицировать ресурс в Google Search Console как `https://samyun-wan.life/`, отправить `/sitemap.xml` и запросить индексацию для home, /products, /blogs/*, /privacy, /terms, /how-to-identify-fake, /verify/qr.
- [ ] Временно оставить старое свойство `samyunwanarmenia.netlify.app`, чтобы отслеживать покрытие 301, пока Google перекрауливает.
- [ ] Обновить Google Business Profile, соцпрофили, рекламные ссылки и email-подписи на новый домен.
- [ ] Проверить канонический 301: `curl -I https://samyunwanarmenia.netlify.app/en | findstr Location` → должен указывать на samyun-wan.life.
- [ ] Убедиться, что аналитика/Метрика принимают новый хост (GA ID уже задан; перепроверить дашборды).

## Бэклог / оптимизации (отложено)
- [ ] Прогнать Google Rich Results Test для Organization/Product/LocalBusiness на главной; исправить предупреждения.
- [ ] Проверить `hreflang`/alternate в GSC (International Targeting); убедиться, что hy/ru/en краулятся равномерно.
- [ ] Добавить Article schema в посты блога и держать OG 1200×630, сжатые через `pnpm run optimize-images`.
- [ ] Усилить внутренние ссылки на `/products`, `/how-to-identify-fake` и `/verify/qr` из блога с брендированными анкорами.
- [ ] Добавить FAQPage schema на FAQ-контент, если отсутствует, чтобы получать FAQ rich results.
- [ ] Прогнать Lighthouse/PSI на CLS/LCP; отложить неважные скрипты и сжать above-the-fold ассеты при необходимости.
- [ ] Мониторить 404/soft-404 в GSC; ставить редиректы или 410 для старых слугов, если всплывают.
