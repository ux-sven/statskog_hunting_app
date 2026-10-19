/** Slår sammen klassenavn og hopper over tomme. */
export const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(' ');

/** Felles størrelsesskala – Figma har Small / Medium / Large på de fleste sider. */
export type Size = 'small' | 'medium' | 'large';

/** Sti til en fil i public/, relativt til der appen serveres. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
