import { useState, type FormEvent } from 'react';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { asset, cx } from '../../components/cx';
import { errorMessage, useStore } from '../../data/AppStore';

/**
 * Innlogging med Inatur-bruker (Figma «Onboarding 5»).
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
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };
  const text = dark ? 'text-text-invert' : 'text-text-primary';
  return (
    <form onSubmit={submit} className="flex flex-col gap-s">
      <img src={asset('images/inatur_logo.svg')} alt="Inatur" className={cx('mx-auto h-[56px]', !dark && 'rounded-medium bg-surface-invert p-xs')} />
      <p className={cx('m-0 text-center type-body-large', text)}>Få mest ut av appen ved å logge deg inn med din Inatur-bruker.</p>
      <TextField label="Brukernavn" placeholder="e-post adresse" autoComplete="username" value={user} onChange={setUser} className={dark ? '[&_label]:!text-text-invert' : ''} />
      <TextField label="Passord" type="password" autoComplete="current-password" value={pass} onChange={setPass} errorText={error} className={dark ? '[&_label]:!text-text-invert' : ''} />
      <a href="https://www.inatur.no/glemt-passord" target="_blank" rel="noreferrer" className={cx('self-end type-body-small', text)}>
        Glemt passord?
      </a>
      <Button type="submit" label={busy ? 'Logger inn…' : 'Logg inn'} variant={dark ? 'secondary' : 'primary'} expand disabled={busy} className={dark ? '!bg-transparent !text-text-invert [--ring:var(--text-invert)]' : ''} />
      <p className={cx('m-0 text-center type-body-small', text)}>
        Har du ikke Inatur-bruker?{' '}
        <a href="https://www.inatur.no/registrer" target="_blank" rel="noreferrer" className="underline">
          Registrer deg.
        </a>
      </p>
      {store.fake && <p className={cx('m-0 text-center type-body-xsmall opacity-80', text)}>Prototype: skriv inn hva som helst.</p>}
      {onSkip && <Button label="Vis meg appen" variant="secondary" expand onClick={onSkip} className={dark ? 'mt-s !bg-transparent !text-text-invert [--ring:var(--text-invert)]' : 'mt-s'} />}
    </form>
  );
}
