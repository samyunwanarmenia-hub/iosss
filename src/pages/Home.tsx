import FeatureCard from '../components/FeatureCard';

const features = [
  {
    title: 'Capacitor 5 + iOS',
    description: 'Готовая конфигурация под iOS: остаётся выполнить `pnpm sync` и `pnpm open` после сборки.',
  },
  {
    title: 'Vite + React + TS',
    description: 'Быстрый дев-сервер, HMR и строгая типизация для надёжной разработки.',
  },
  {
    title: 'Tailwind по умолчанию',
    description: 'Преднастроенные директивы и конфиг Tailwind для быстрой стилизации.',
  },
];

const commands = [
  { label: 'Установить зависимости', cmd: 'pnpm install' },
  { label: 'Dev-сервер', cmd: 'pnpm dev' },
  { label: 'Сборка веба', cmd: 'pnpm build' },
  { label: 'Синхронизация с iOS', cmd: 'pnpm sync' },
  { label: 'Открыть Xcode', cmd: 'pnpm open' },
];

function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <section className="glass rounded-3xl p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-teal-200">Capacitor Template</p>
        <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">
          React + Tailwind старт для iOS на Capacitor 5
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-200">
          Соберите веб-интерфейс на Vite и синхронизируйте его с нативным контейнером iOS одной
          командой.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {['Vite', 'React 18', 'TypeScript', 'Tailwind', 'Capacitor 5', 'pnpm'].map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-100"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} title={feature.title} description={feature.description} />
        ))}
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="glass rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white">Быстрый старт</h2>
          <p className="mt-2 text-sm text-slate-300">
            Сохраните этот шаблон, соберите проект и синхронизируйте его с iOS-проектом перед
            открытием в Xcode.
          </p>
          <div className="mt-4 space-y-3">
            {commands.map(({ label, cmd }) => (
              <div
                key={cmd}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-900/70 px-4 py-3"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-teal-200">{label}</p>
                  <code className="text-sm text-slate-100">{cmd}</code>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="glass rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white">Что дальше?</h2>
          <ul className="mt-3 space-y-3 text-sm text-slate-200">
            <li>1. Разработайте интерфейс в `/src` и используйте Tailwind для стилизации.</li>
            <li>2. Выполните `pnpm build` — собранный фронтенд появится в `/dist`.</li>
            <li>3. Запустите `pnpm sync`, затем `pnpm open` чтобы открыть iOS-проект в Xcode.</li>
            <li>4. Соберите и запустите приложение на симуляторе или устройстве.</li>
          </ul>
        </article>
      </section>
    </main>
  );
}

export default Home;
