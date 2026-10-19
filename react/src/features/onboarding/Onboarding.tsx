import { useState, type ReactNode } from 'react';
import { asset, cx } from '../../components/cx';
import { Icon } from '../../icons/Icon';
import type { IconName } from '../../icons/iconNames';
import { useStore } from '../../data/AppStore';
import { LoginForm } from './LoginForm';

// Merkevarefargene i introduksjonen er faste (samme i lys og mørk modus).
const BG = 'bg-[#00594c]';
const PEACH = 'text-[#ffe5d6]';

function YesNo({ value, onChange, question, icon }: { value: boolean; onChange: (v: boolean) => void; question: string; icon: IconName }) {
  return (
    <fieldset className="m-0 flex flex-col items-center gap-xs border-0 p-0">
      <legend className={cx('mb-xs flex items-center gap-xs type-body-medium font-semibold', PEACH)}>
        <Icon name={icon} size={18} />
        {question}
      </legend>
      <div className="flex h-[36px] w-[196px] overflow-hidden rounded-small bg-white p-[2px]">
        {[true, false].map((v) => (
          <button
            key={String(v)}
            type="button"
            aria-pressed={value === v}
            onClick={() => onChange(v)}
            className={cx('flex-1 rounded-small type-body-small text-[#2a2a2a] cursor-pointer', value === v && 'bg-[#ffb284]')}
          >
            {v ? 'Ja' : 'Nei'}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function Step({ image, title, bullets, children }: { image?: ReactNode; title: ReactNode; bullets?: string[]; children?: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-m px-l pt-xxl text-center">
      {image}
      <h1 className={cx('m-0 type-display-small font-normal leading-[44px]', PEACH)}>{title}</h1>
      {bullets && (
        <ul className="m-0 flex list-none flex-col gap-[2px] p-0 type-body-small text-white">
          {bullets.map((b) => (
            <li key={b}>• {b}</li>
          ))}
        </ul>
      )}
      {children}
    </div>
  );
}

const Photo = ({ src }: { src: string }) => <img src={asset(src)} alt="" className="size-[180px] rounded-full border-4 border-[#ffb284] object-cover" />;

/**
 * Introduksjon ved første oppstart (Figma «Onboarding 1–5»). Interessene styrer
 * hvilke faner som vises, og lagres på Inatur-brukeren når man er innlogget.
 */
export function Onboarding() {
  const store = useStore();
  const [step, setStep] = useState(0);
  const [hunt, setHunt] = useState(store.settings.showHuntingTab);
  const [fish, setFish] = useState(store.settings.showFishingTab);
  const [offers, setOffers] = useState(store.settings.showOffersTab);
  const finish = () => {
    void store.setInterests({ hunting: hunt, fishing: fish, offers });
    store.updateSettings({ onboardingDone: true });
  };
  const next = () => setStep(step + 1);
  const button = (label: string, onClick = next) => (
    <button type="button" onClick={onClick} className="h-[46px] min-w-[150px] rounded-small border border-white px-m type-button-medium text-white hover:bg-white/10 cursor-pointer">
      {label}
    </button>
  );

  const steps = [
    <Step
      key={0}
      image={<img src={asset('images/app_logo.svg')} alt="" className="size-[170px]" />}
      title={
        <>
          <span className="block type-headline-h2">Velkommen til</span>
          <span className="font-body text-[28px] font-bold text-white">Statskog</span> jakt &amp; fiske
        </>
      }
    >
      <p className={cx('m-0 flex items-center gap-xs type-body-xsmall', PEACH)}>
        I samarbeid med <img src={asset('images/inatur_logo.svg')} alt="Inatur" className="h-[22px]" />
      </p>
      <p className="m-0 type-body-medium text-white">Appen for deg som driver med småviltjakt og innlandsfiske på Statskogs grunn.</p>
      <div className="mt-auto pb-m">{button('Tilpass mitt behov')}</div>
    </Step>,
    <Step key={1} image={<Photo src="images/onboarding_jakt.jpg" />} title="Småviltjakt" bullets={['Offline kart med jaktgrenser', 'Dine jaktkort rett i lomma', 'Raskt aktivering av jaktkort', 'Enkel rapportering av fangst']}>
      <YesNo question="Interessert i småviltjakt?" icon="accuracy" value={hunt} onChange={setHunt} />
      <div className="mt-auto pb-m">{button('Neste interesse')}</div>
    </Step>,
    <Step key={2} image={<Photo src="images/onboarding_fiske.jpg" />} title="Innlandsfiske" bullets={['Offline kart med fiskegrenser', 'Dine fiskekort rett i lomma', 'Tilgang til fiskeregler', 'Enkel rapportering av fangst']}>
      <YesNo question="Interessert i innlandsfiske?" icon="fishingHook" value={fish} onChange={setFish} />
      <div className="mt-auto pb-m">{button('Ett steg til')}</div>
    </Step>,
    <Step key={3} image={<Photo src="images/onboarding_tilbud.jpg" />} title="Tilbud og kjøp" bullets={['Finn jakt-/fisketilbud over hele landet', 'Kjøp jakt-/fiskekort mens du er på farta']}>
      <YesNo question="Få tilgang til jakt-/fisketilbud?" icon="priceTag" value={offers} onChange={setOffers} />
      <div className="mt-auto pb-m">{button('Neste')}</div>
    </Step>,
    <div key={4} className="flex flex-1 flex-col justify-center px-l">
      <LoginForm dark onDone={finish} onSkip={finish} />
    </div>,
  ];

  return (
    <div className={cx('flex h-full flex-col overflow-y-auto', BG)}>
      <div className="flex justify-between px-s pt-s">
        {step > 0 ? (
          <button type="button" onClick={() => setStep(step - 1)} aria-label="Tilbake" className="grid size-[44px] place-items-center text-white cursor-pointer">
            <Icon name="chevronRoundedLeft" />
          </button>
        ) : (
          <span />
        )}
        {step < 4 && (
          <button type="button" onClick={() => setStep(4)} className="px-s type-body-small text-white/80 underline cursor-pointer">
            Hopp over
          </button>
        )}
      </div>
      {steps[step]}
      <div className="flex justify-center pb-l" aria-label={`Steg ${step + 1} av ${steps.length}`} role="img">
        <span className="flex gap-[6px] rounded-full bg-black/20 px-s py-[6px]">
          {steps.map((_, i) => (
            <span key={i} className={cx('size-[7px] rounded-full', i === step ? 'bg-white' : 'bg-white/40')} />
          ))}
        </span>
      </div>
    </div>
  );
}
