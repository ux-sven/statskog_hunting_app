import { useState, type FormEvent } from 'react';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { asset, cx } from '../../components/cx';
import { errorMessage, useStore } from '../../data/AppStore';
import { ApiError } from '../../api/inatur/client';
import { InvertButton } from './InvertButton';

const FORGOT_URL = 'https://www.inatur.no/glemt-passord';
const REGISTER_URL = 'https://www.inatur.no/registrer';

/**
 * Innlogging med Inatur-bruker (Figma «Onboarding 5», 4086:27105).
 * `dark` gir varianten på den grønne introduksjonsflaten; ellers brukes skjemaet
 * i innloggingsskuffen inne i appen.
 *
 * PROTOTYPE: Inatur krever innlogging i nettleser (OAuth2 Authorization Code
 * med PKCE). I appen åpner «Logg inn» Inatur sin innloggingsside og kommer
 * tilbake med en kode. Skjemaet her brukes mot den falske tjenesten.
 */
export function LoginForm({ onDone, dark = false, onSkip }: { onDone: () => void; dark?: boolean; onSkip?: () => void }) {
  const store = useStore();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(false);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(undefined);
    try {
      await store.login(user, pass);
      onDone();
    } catch (err) {
      setError(err instanceof ApiError && (err.status === 400 || err.status === 401) ? 'Feil brukernavn eller passord.' : errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const fields = (
    <>
      <TextField
        label="Brukernavn"
        placeholder="e-post adresse"
        autoComplete="username"
        value={user}
        onChange={setUser}
        className={cx('w-full', dark && '[&_label]:!text-text-invert')}
      />
      <TextField
        label="Passord"
        type="password"
        autoComplete="current-password"
        value={pass}
        onChange={setPass}
        errorText={dark ? undefined : error}
        aria-invalid={error ? true : undefined}
        className={cx('w-full', dark && 'mt-s [&_label]:!text-text-invert')}
      />
    </>
  );
  const hint = store.fake && (
    <p className={cx('m-0 text-center type-body-xsmall opacity-80', dark ? 'text-text-invert' : 'text-text-primary')}>Prototype: skriv inn hva som helst («feil» gir feil passord).</p>
  );

  if (dark) {
    return (
      <form onSubmit={submit} className="flex w-full flex-1 flex-col items-center gap-m">
        <div className="flex shrink-0 flex-col items-center pt-xl pb-xxs">
          <img src={asset('images/onboarding/inatur_large.svg')} alt="Inatur" width={233} height={78} className="h-[79px] w-[234px]" />
        </div>
        <div className="flex w-full flex-1 flex-col gap-l py-xs">
          <p className="m-0 text-center type-body-large text-text-invert">Få mest ut av appen ved å logge deg inn med din Inatur-bruker.</p>
          <div className="flex w-full flex-col items-end">
            {fields}
            {error && (
              <p role="alert" className="m-0 mt-xs w-full rounded-small bg-surface-primary px-s py-xs type-body-small text-attention-error">
                {error}
              </p>
            )}
            <a href={FORGOT_URL} target="_blank" rel="noreferrer" className="px-m py-s type-button-small text-text-invert hover:underline">
              Glemt passord?
            </a>
            <InvertButton type="submit" expand label={busy ? 'Logger inn…' : 'Logg inn'} disabled={busy} />
            <p className="m-0 w-full px-m py-s text-center type-button-small text-text-invert">
              Har du ikke Inatur-bruker?{' '}
              <a href={REGISTER_URL} target="_blank" rel="noreferrer" className="text-text-invert underline">
                Registrer deg
              </a>
              .
            </p>
            {hint}
          </div>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-s">
      <img src={asset('images/inatur_logo.svg')} alt="Inatur" className="mx-auto h-[56px] rounded-medium bg-surface-invert p-xs" />
      <p className="m-0 text-center type-body-large text-text-primary">Få mest ut av appen ved å logge deg inn med din Inatur-bruker.</p>
      {fields}
      <a href={FORGOT_URL} target="_blank" rel="noreferrer" className="self-end type-body-small text-text-primary">
        Glemt passord?
      </a>
      <Button type="submit" label={busy ? 'Logger inn…' : 'Logg inn'} expand disabled={busy} />
      <p className="m-0 text-center type-body-small text-text-primary">
        Har du ikke Inatur-bruker?{' '}
        <a href={REGISTER_URL} target="_blank" rel="noreferrer" className="underline">
          Registrer deg.
        </a>
      </p>
      {hint}
      {onSkip && <Button label="Vis meg appen" variant="secondary" expand onClick={onSkip} className="mt-s" />}
    </form>
  );
}
