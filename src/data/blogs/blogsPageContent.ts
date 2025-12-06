import { SupportedLang } from '@/config/locales';

export type BlogsPageSection = {
  id: string;
  heading: string;
  description: string;
  bullets?: string[];
};

export type BlogsPageContent = {
  title: string;
  subtitle: string;
  introParagraphs: string[];
  sections: BlogsPageSection[];
  conclusion?: string;
  ctaLabel?: string;
  ctaLink?: string;
};

export const BLOGS_PAGE_CONTENT: Partial<Record<SupportedLang, BlogsPageContent>> = {
  hy: {
    title: 'Samyun Wan․ իրական կարծիքներ, ամբողջական ուսումնասիրություն, վտանգներ և վստահելի գնման ուղեցույց',
    subtitle:
      'Samyun Wan գնելուց առաջ կարևոր է ուսումնասիրել ոչ միայն դրա գովազդային խոստումները, այլ նաև իրական օգտատերերի կարծիքները, ազդեցությունը օրգանիզմի վրա, կողմնակի ռիսկերը, հակացուցումները և այն խնդիրները, որոնց մասին շատ վաճառողներ նշված չեն հայտնում։',
    introParagraphs: [
      'Համացանցում շրջանառվող կեղծված տարբերակները հաճախ պարունակում են անհայտ ծագման բաղադրիչներ, և հենց սա է դառնում բազմաթիվ խնդիրների իրական պատճառը։',
      'Շուկան լի է վաճառողներով, ովքեր չեն տրամադրում համապատասխանության սերտիֆիկատ, չի ներկայացվում արտադրանքի պետական գրանցման վկայական, և հաճախ առաջարկում են անորակ կամ ընդհանրապես ոչ օրիգինալ արտադրանք։ Այդ պատճառով անհրաժեշտ է հասկանալ՝ ինչն է իրականում իրենից ներկայացնում Samyun Wan հավելումը, ինչ ազդեցություն կարող է ունենալ օրգանիզմի վրա և ինչից պետք է խուսափել, որպեսզի չվնասեք առողջությանը։',
    ],
    sections: [
      {
        id: 'authenticity',
        heading: 'Samyun Wan կապսուլաներ՝ ինչ պետք է իմանալ սրա մասին',
        description:
          'Samyun Wan-ի կապսուլաները շատ տարածված են համացանցում։ Որոշ վաճառողներ դրանք առաջարկում են ցածր գնով՝ 5000 դրամի սահմաններում, պնդելով, թե իբր սա օրիգինալ հավելում է, պատրաստված Ինդոնեզիայում և չունի կողմնակի ազդեցություններ։ Սակայն սերտիֆիկատ ներկայացնելու խնդրանքին այս վաճառողների մեծ մասը երբեք չի արձագանքում։ Իրականում հենց սերտիֆիկատի բացակայությունն է ամենավտանգավոր ազդակը։',
        bullets: [
          'Անհրաժեշտ է պահանջել համապատասխանության սերտիֆիկատ և QR կոդ՝ յուրաքանչյուր փաթեթի վրա նշված հղմամբ։',
          'Վաճառողը պետք է ներկայացնի պետական գրանցման վկայական և կոնտակտային տվյալներ՝ ստուգելու հնարավորությամբ։',
          'Ցանկացած անհայտ ծագման նյութեր, հատկաբանություններով չպարզված բաղադրիչներ կամ «անանուն» խառնուրդներ պետք է ակնհայտորեն մերժվեն։',
          'Գործնականում այն արտադրանքը, որը ժամանակին չի տալիս տեղեկություններ կամ թաքցնում է փաստաթղթերը, խիստ կասկածելի է և արժանի չէ վստահության։',
        ],
      },
      {
        id: 'requirements',
        heading: 'Ում է անհրաժեշտ Samyun Wan-ը',
        description: 'Հավելումը նախատեսված է այն մարդկանց համար, որոնք ծանրությամբ քաշ հավաքելու խնդիր ունեն՝ անկախ պատճառից։',
        bullets: [
          'Բնականորեն չափազանց նիհար մարմնակազմություն, որը դժվարությամբ է ենթարկվում կալորիա ավելացմանը։',
          'Քրոնիկական հիվանդություններից հետո քաշի կորուստ և Չափազանց թույլ իմունային համակարգ։',
          'Ախորժակի բացակայություն կամ անկանոն սննդակարգ՝ սննդանյութերի անբավարար ընդունմամբ։',
          'Արագ նյութափոխարկություն, որը խանգարում է քաշ հավաքելուն և պահում է մարմինը քաշ կորցնելու հակումով։',
        ],
      },
      {
        id: 'benefits',
        heading: 'Samyun Wan-ի առավելությունները',
        description:
          'Samyun Wan-ի օգտագործողների մեծ մասը նշում է մի շարք դրական փոփոխություններ։ Հավելման կառավարումը ճիշտ ռեժիմով ապահովում է արդյունավետ աջակցություն առանց կործանման ռիսկերի։',
        bullets: [
          'Պատրաստված է բուսական բաղադրիչների հիման վրա՝ առանց վնասակար հավելանյութերի։',
          'Բարձրացնում է ախորժակը և օգնում հաճախակի սնվել՝ ավելի շատ սննդանյութեր ներծծելու համար։',
          'Նպաստում է արագ քաշ հավաքելուն՝ սննդակարգի առավելագույն օգտագործմամբ։',
          'Լավ յուրացվում է օրգանիզմի կողմից և չի ծանրաբեռնում մարսողական համակարգը։',
          'Ունի համեմատաբար մեղմ ազդեցություն՝ եթե ընդունվում է ճիշտ դոզաներով և ռեժիմով։',
        ],
      },
      {
        id: 'results',
        heading: 'Արդյունավետությունն ըստ իրական կարծիքների',
        description:
          'Օգտատերերի արձագանքները ցույց են տալիս, որ արդյունքները միայն քաշի ավելացումով չեն սահմանափակվում․ նկատելի են նաև ընդհանուր կենսունակության բարձրացում և փոքրիկ օրգաններ։',
        bullets: [
          'Մարսողական համակարգի աշխատանքի բարելավում և սննդանյութերի ավելի լավ յուրացում։',
          'Իմունիտետի զգալի բարձրացում՝ ավելի քիչ հիվանդությունների և ինֆեկցիաների դեպքում։',
          'Հոդերի ամրացում և մարմնի կառուցվածքի առավել հստակ տեսք։',
          'Աշխատունակության աճ և ֆիզիկական ծանրաբեռնվածության հանդեպ դիմացկունության ավելացում։',
        ],
      },
      {
        id: 'side-effects',
        heading: 'Samyun Wan-ի իրական կողմնակի ազդեցությունները',
        description:
          'Չնայած հավելումը բուսական է, այնուամենայնիվ ունի որոշ հնարավոր կողմնակի ազդեցություններ։ Դրանք հիմնականում հանդիպում են սխալ օգտագործման, չափազանց մեծ դոզայի կամ անհատական զգայունության դեպքում։',
        bullets: [
          'Քնկոտություն՝ առաջին 2–3 օրերին, երբ օրգանիզմը ադապտացվում է կազմի նկատմամբ։',
          'Փոքր այտուցվածություն՝ եթե ընդունվում է օրական 2 կապսուլա առանց բավարար հեղուկի։',
          'Մաշկի ցան՝ հաճախ նկատվում է սպիտակուցային սննդի խտացնումիս։',
        ],
      },
      {
        id: 'warnings',
        heading: 'Հակացուցումներ և անվտանգության կարևոր նկատառումներ',
        description:
          'Խստորեն խորհուրդ չի տրվում Samyun Wan գնել առանց լիցենզիայի և սերտիֆիկատի վաճառողներից։ Անորակ կամ կեղծված արտադրանքը կարող է վտանգավոր լինել։',
        bullets: [
          'Խաթարել հորմոնալ ֆոնը և առաջացնել ալերգիկ ռեակցիաներ վիրահատական ռիսկերով։',
          'Վնասել լյարդը կամ մարսողական համակարգը՝ անօրինական հավելանյութերի պատճառով։',
          'Առաջացնել անպատրաստելի կողմնակի ազդեցություններ՝ առանց բժշկի կամ սննդաբան խորհրդատվության։',
        ],
      },
      {
        id: 'usage',
        heading: 'Ինչպես ապահով և արդյունավետ օգտագործել Samyun Wan-ը',
        description:
          'Եթե նպատակ ունեք արագ քաշ հավաքել, խորհուրդ է տրվում Samyun Wan-ը համատեղել հավասարակշռված սննդակարգի, բարձր կալորիականություններով ճաշացանկի և ֆիզիկական ակտիվության հետ։',
        bullets: [
          'Հավասարակշռված սննդակարգ՝ պետքարտուղար պաշարներով և բազմազան բաղադրիչներով։',
          'Բարձր կալորիականությամբ սնունդ՝ մարտական իմունային համակարգին բավարարությամբ։',
          'Մարզումներ և ուժային վարժություններ՝ մկանային զանգվածի աջակցման համար։',
          'Բավարար քուն և ռեժիմ՝ մարմնի վերականգնման ու հարմարվողականության համար։',
          'Բանիմաց սննդաբանի կամ մարզչի խորհրդատվություն՝ անվտանգության և նպատակների համապատասխան վերահսկմամբ։',
        ],
      },
    ],
    conclusion:
      'Այս մոտեցումը թույլ կտա ավելացնել ոչ միայն քաշը, այլ նաև առողջ, գեղեցիկ մարմնակազմություն ձևավորել։',
    ctaLabel: 'Պաշտոնապես ստուգել ենթադրյալ Samyun Wan-ը',
    ctaLink: '/hy/contact',
  },
  ru: {
    title: 'Samyun Wan — честный разбор, реальные риски и безопасная покупка',
    subtitle:
      'Перед тем как покупать Samyun Wan, прочитайте полное исследование: реальные эффекты, причины появления подделок и чек-лист по проверке.',
    introParagraphs: [
      'Реклама обещает «+10 кг за 3 недели», но половина товаров оказывается фейком без документов. Мы собрали факты, чтобы вы не рисковали здоровьем и бюджетом.',
      'Это концентрат опыта Samyun Wan Armenia и 60 000 клиентов: как проверять упаковку, кому подходит добавка, каких результатов ждать и почему дешёвые предложения опасны.',
    ],
    sections: [
      {
        id: 'authenticity',
        heading: 'Анализ упаковки и QR‑проверка',
        description:
          'Оригинальный Samyun Wan имеет чёткую полиграфию и уникальный QR‑код. Сканируйте его на https://qr-wan.netlify.app/ и сверяйте результат с оператором.',
        bullets: [
          'Размытые печати или «переливающийся» логотип — признак кустарной подделки.',
          'QR не должен вести на случайные домены или выдавать ошибку.',
          'Просите живые фото/видео упаковки и сертификата, а не архивные картинки.',
        ],
      },
      {
        id: 'requirements',
        heading: 'Для кого создан Samyun Wan',
        description:
          'Добавка помогает тем, кто годами не может набрать вес: природно худым людям, восстанавливающимся после болезней, с хронически низким аппетитом.',
        bullets: [
          'Эктоморфам, которые не могут «пробить» вес',
          'Похудевшим после стресса или лечения',
          'Спортсменам на массе (после консультации врача/тренера)',
        ],
      },
      {
        id: 'benefits',
        heading: 'Как работает оригинал',
        description:
          'Формула из 6 трав усиливает аппетит, ускоряет усвоение и укрепляет иммунитет. Без гормонов и дексаметазона.',
        bullets: [
          '1 капсула утром во время еды — главное соблюдать режим',
          'Без калорийного питания эффекта не будет',
          'Улучшает пищеварение и даёт силы тренироваться',
        ],
      },
      {
        id: 'results',
        heading: 'Реальные результаты',
        description:
          'Большинство клиентов фиксируют +6…8 кг за курс при соблюдении плана. Отмечают рост аппетита, сил и устойчивости к стрессу.',
        bullets: [
          'Нормализуется пищеварение, пропадает тяжесть',
          'Легче соблюдать калорийность — появляется голод',
          'Появляется энергия и мотивация на тренировки',
        ],
      },
      {
        id: 'side-effects',
        heading: 'Побочные эффекты и предосторожности',
        description:
          'Компоненты натуральные, но важно соблюдать дозу, пить капсулу с едой и употреблять воду. Возможны сонливость или лёгкая отёчность в первые дни.',
        bullets: [
          'Сонливость 2–3 дня — нормальная адаптация',
          'Отёчность сигнализирует о нехватке воды и избытке соли',
          'Сыпь/зуд — проверьте аллергию на травы и снизьте дозу',
        ],
      },
      {
        id: 'warnings',
        heading: 'Кому нельзя и чем опасны подделки',
        description:
          'Беременным, кормящим, детям до 12 лет и людям с тяжёлыми заболеваниями нельзя принимать Samyun Wan без врача. Подделки часто содержат гормоны и антибиотики, что бьёт по печени и гормоналке.',
        bullets: [
          'Всегда советуйтесь с врачом, если есть хронические диагнозы',
          'Игнорируйте предложения «за 3000 драмов» без QR и сертификата',
          'Проверяйте продавца через официальный сайт или телефон',
        ],
      },
      {
        id: 'usage',
        heading: 'Схема приёма и план',
        description:
          'Одна упаковка = 21 капсула. Пейте утром, белую — на 10‑й день. Параллельно держите калорийное питание, силовые тренировки и сон 7+ часов.',
        bullets: [
          'Завтрак (белок + сложные углеводы) + капсула Samyun Wan',
          '4–5 приёмов пищи, 2 л воды, еженедельный контроль веса',
          'Силовые 3 раза в неделю + растяжка и восстановление',
        ],
      },
    ],
    conclusion:
      'Главное — проверяйте подлинность, соблюдайте питание и режим. Тогда оригинальный Samyun Wan даст результат без риска.',
    ctaLabel: 'Получить консультацию Samyun Wan Armenia',
    ctaLink: '/ru/contact',
  },
  en: {
    title: 'Samyun Wan deep dive — authenticity, risks, and the safe buying guide',
    subtitle:
      'Read this before ordering: real effects, why counterfeits appear, and a step-by-step checklist to stay safe.',
    introParagraphs: [
      'Slick ads promise “+10 kg in 21 days,” yet half the offers online are fakes without paperwork. We collected the facts so you can protect your health and wallet.',
      'Below is the distilled experience of Samyun Wan Armenia and 60,000 customers: how to check packaging, who should use the supplement, what results to expect, and why the cheapest option is usually dangerous.',
    ],
    sections: [
      {
        id: 'authenticity',
        heading: 'Authenticate every package',
        description:
          'Original Samyun Wan ships with premium print quality and a unique QR badge. Scan it at https://qr-wan.netlify.app/ and confirm the result with our operator.',
        bullets: [
          'Blurred seals or off-color labels = counterfeit.',
          'A QR code must load the official verification page without odd redirects.',
          'Always request live photos/video of the seal, QR, and certificate.',
        ],
      },
      {
        id: 'requirements',
        heading: 'Who benefits most',
        description:
          'The supplement supports naturally slim body types, people recovering from illness, or anyone with chronically low appetite.',
        bullets: [
          'Ectomorphs stuck at the same weight ceiling',
          'Those who lost appetite due to stress or treatment',
          'Athletes on a gaining phase (under medical supervision)',
        ],
      },
      {
        id: 'benefits',
        heading: 'How the formula works',
        description:
          'Six herbs/adaptogens boost appetite, digestion, and immunity, letting you eat more without synthetic hormones.',
        bullets: [
          '100% herbal — zero dexamethasone',
          'One capsule with breakfast every day',
          'Calorie surplus + better absorption = real mass gain',
        ],
      },
      {
        id: 'results',
        heading: 'Typical progress',
        description:
          'Most customers record +6–8 kg per course when they pair Samyun Wan with food, water, and training. They also report higher energy and stronger immunity.',
        bullets: [
          'Digestion stabilizes and bloating disappears',
          'Hunger cues return, so it is easier to hit calorie targets',
          'More energy for work and workouts',
        ],
      },
      {
        id: 'side-effects',
        heading: 'Possible side effects',
        description:
          'The formula is gentle, but respect the dosage, take capsules with food, and hydrate. Mild drowsiness or swelling may appear in the first days.',
        bullets: [
          'Drowsiness for 2–3 days = normal adaptation',
          'Bloating means you need more water and less sodium',
          'Skin irritation → check for herb allergies and lower the dose',
        ],
      },
      {
        id: 'warnings',
        heading: 'Contraindications & fake dangers',
        description:
          'Pregnant/breastfeeding women, kids under 12, and people with chronic diseases should avoid Samyun Wan unless cleared by a doctor. Counterfeits often come loaded with steroids or antibiotics and can wreck your liver/hormones.',
        bullets: [
          'Consult your doctor/nutritionist if you have chronic diagnoses',
          'Ignore “cheap” offers without QR and certificates',
          'Validate every seller via our official website or hotline',
        ],
      },
      {
        id: 'usage',
        heading: 'Protocol for best results',
        description:
          'One box = 21 capsules. Take with breakfast, the white capsule on day 10. Combine with calorie-dense meals, strength training, and 7+ hours of sleep.',
        bullets: [
          'Breakfast (protein + complex carbs) + capsule',
          '4–5 meals a day, 2 liters of water, weekly check-ins',
          'Strength training 3x/week plus stretching and recovery',
        ],
      },
    ],
    conclusion:
      'Verify every package, keep nutrition on point, and original Samyun Wan will deliver results without risking your health.',
    ctaLabel: 'Book a Samyun Wan consultation',
    ctaLink: '/en/contact',
  },
};
