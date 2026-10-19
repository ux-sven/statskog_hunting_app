import { useState, type ReactNode } from 'react';
import { asset, cx } from '../../components/cx';
import { Icon } from '../../icons/Icon';
import type { IconName } from '../../icons/iconNames';
import { useStore } from '../../data/AppStore';
import { LoginForm } from './LoginForm';
import { InvertButton } from './InvertButton';

/*
 * Introduksjon ved første oppstart. Figma-seksjonen «Onboarding» (4457:28599):
 *   «Onboarding 1» 3755:25294  Velkommen
 *   «Onboarding 2» 3755:27929  Småviltjakt
 *   «Onboarding 3» 3755:28040  Innlandsfiske
 *   «Onboarding 5» 4086:27105  Innlogging med Inatur (falsk innlogging foreløpig)
 * «Onboarding 4» (Tilbud og kjøp) er dempet i designet og er ikke med; sidevelgeren
 * har fire prikker. Tilbud-fanen beholder dagens innstilling.
 */

/** Ytre ramme (Figma «Onboarding»): grønn flate, 32 px sidemarg, 16 px mellomrom. */
function Page({ children }: { children: ReactNode }) {
  return <div className="flex min-h-full flex-col items-center gap-m bg-surface-invert px-xl py-m">{children}</div>;
}

/** «Page Control» (iOS): prikker på en halvgjennomsiktig plate. Prikkene kan trykkes for å gå tilbake. */
function PageControl({ count, index, onSelect }: { count: number; index: number; onSelect: (i: number) => void }) {
  return (
    <nav aria-label="Introduksjon" className="flex h-[44px] w-full shrink-0 items-center justify-center">
      <div className="flex items-center gap-xs rounded-full bg-[rgba(191,191,191,0.44)] px-s py-xs backdrop-blur-[20px]">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Side ${i + 1} av ${count}`}
            aria-current={i === index ? 'step' : undefined}
            disabled={i > index}
            onClick={() => onSelect(i)}
            className={cx('size-[8px] rounded-full bg-black p-0', i === index ? '' : 'opacity-30', i < index && 'cursor-pointer')}
          />
        ))}
      </div>
    </nav>
  );
}

/** «Segmented Control» Ja/Nei (Figma 3341:5900), 230 × 44. */
function YesNo({ value, onChange, question, icon }: { value: boolean; onChange: (v: boolean) => void; question: string; icon: IconName }) {
  return (
    <fieldset className="m-0 flex w-full flex-col items-center gap-s border-0 px-0 py-xs">
      <legend className="contents">
        <span className="flex items-center justify-center gap-xs type-body-large font-bold text-text-invert">
          <Icon name={icon} size={24} />
          {question}
        </span>
      </legend>
      <div role="radiogroup" aria-label={question} className="flex h-[44px] w-[230px] rounded-[9px] border border-border-tertiary bg-surface-secondary p-[2.5px]">
        {[true, false].map((v) => {
          const on = value === v;
          return (
            <button
              key={String(v)}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(v)}
              className={cx(
                'flex-1 rounded-[7px] px-[10px] text-[13px] leading-[18px] tracking-[-0.08px] text-text-primary cursor-pointer',
                on ? 'border-[0.5px] border-surface-primary bg-cta-primary-selected font-semibold shadow-[0_3px_8px_rgba(0,0,0,0.12),0_3px_1px_rgba(0,0,0,0.04)]' : 'font-normal',
              )}
            >
              {v ? 'Ja' : 'Nei'}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/** Interesse-side (Onboarding 2 og 3): rundt bilde, tittel, punktliste og Ja/Nei. */
function InterestStep(props: { image: string; title: string; bullets: string[]; question: string; icon: IconName; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <>
      <div className="flex shrink-0 flex-col items-center gap-xs pt-[21px] pb-xxs">
        {/* Primitiven brand/orange/30 har ikke eget token. */}
        <img src={asset(props.image)} alt="" className="size-[200px] rounded-full border-[6px] border-[#ffd8c1] object-cover" />
        <h1 className="m-0 type-display-small font-normal text-text-invert">{props.title}</h1>
      </div>
      <div className="flex w-full flex-1 flex-col gap-l py-xs">
        <ul className="m-0 list-inside list-disc p-0 text-center type-body-large text-text-invert">
          {props.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <YesNo question={props.question} icon={props.icon} value={props.value} onChange={props.onChange} />
      </div>
    </>
  );
}

export function Onboarding() {
  const store = useStore();
  const [step, setStep] = useState(0);
  const [hunt, setHunt] = useState(store.settings.showHuntingTab);
  const [fish, setFish] = useState(store.settings.showFishingTab);
  const finish = () => {
    void store.setInterests({ hunting: hunt, fishing: fish, offers: store.settings.showOffersTab });
    store.updateSettings({ onboardingDone: true });
  };
  const next = () => setStep((s) => s + 1);
  const pages = 4;

  let content: ReactNode;
  let action: ReactNode;
  if (step === 0) {
    content = (
      <>
        <div className="flex shrink-0 flex-col items-center">
          {/* «AppIcon Base» 227 × 227 med logoen i to lag. */}
          <div className="relative size-[227px]" role="img" aria-label="Statskog jakt og fiske">
            <span className="absolute inset-y-[9.43%] inset-x-[8.89%]">
              <img src={asset('images/onboarding/appicon_group.svg')} alt="" className="absolute top-[-0.54%] left-[-0.54%] h-[101.08%] w-[101.08%] max-w-none" />
            </span>
            <span className="absolute inset-y-[9.43%] inset-x-[8.89%]">
              <img src={asset('images/onboarding/appicon_0group.svg')} alt="" className="absolute inset-0 size-full" />
            </span>
          </div>
          <h1 className="m-0 flex flex-col items-center font-normal">
            <span className="type-headline-h2 text-text-invert">Velkommen til</span>
            <span className="flex items-center gap-xs">
              <span className="block w-[125px] pt-[10px] pb-[3px]">
                <span className="relative block h-[38px]">
                  <span className="absolute inset-y-[8.79%] inset-x-[3.36%]">
                    <img src={asset('images/onboarding/statskog_logo.svg')} alt="Statskog" className="absolute inset-0 size-full brightness-0 invert" />
                    {/* Eksportert med grunnfargen; i designet er logoen overstyrt til hvit. */}
                  </span>
                </span>
              </span>
              <span className="type-display-small text-text-invert">jakt &amp; fiske</span>
            </span>
          </h1>
          <div className="flex flex-col items-center py-s">
            <p className="m-0 type-body-small text-border-primary">i samarbeid med</p>
            <img src={asset('images/onboarding/inatur_small.svg')} alt="Inatur" width={121} height={41} className="h-[41px] w-[122px]" />
          </div>
        </div>
        <div className="flex w-full flex-1 flex-col py-xs">
          <p className="m-0 text-center type-body-large text-text-invert">Appen for deg som driver med småviltjakt og innlandsfiske på Statskogs grunn.</p>
        </div>
      </>
    );
    action = <InvertButton label="Tilpass mitt behov" onClick={next} />;
  } else if (step === 1) {
    content = (
      <InterestStep
        image="images/onboarding/jakt.jpg"
        title="Småviltjakt"
        bullets={['Offline kart med jaktgrenser', 'Dine jaktkort rett i lomma', 'Raskt aktivering av jaktkort', 'Enkel rapportering av fangst']}
        question="Interessert i småviltjakt?"
        icon="accuracy"
        value={hunt}
        onChange={setHunt}
      />
    );
    action = <InvertButton label="Neste interesse" onClick={next} />;
  } else if (step === 2) {
    content = (
      <InterestStep
        image="images/onboarding/fiske.jpg"
        title="Innlandsfiske"
        bullets={['Offline kart med fiskegrenser', 'Dine fiskekort rett i lomma', 'Tilgang til fiskeregler', 'Enkel rapportering av fangst']}
        question="Interessert i innlandsfiske?"
        icon="fishingHook"
        value={fish}
        onChange={setFish}
      />
    );
    action = <InvertButton label="Ett steg til" onClick={next} />;
  } else {
    content = <LoginForm dark onDone={finish} />;
    action = <InvertButton filled expand label="Vis meg appen" onClick={finish} />;
  }

  return (
    <div className="h-full overflow-y-auto bg-surface-invert">
      <Page>
        <div key={step} className="flex w-full flex-1 animate-[fade-in_200ms_ease-out] flex-col items-center gap-m">
          {content}
        </div>
        {action}
        <PageControl count={pages} index={step} onSelect={setStep} />
      </Page>
    </div>
  );
}
