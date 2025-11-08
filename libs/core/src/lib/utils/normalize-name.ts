// Normaliza string para uso como name de form control
export function normalizeName(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/[-]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase();
}
