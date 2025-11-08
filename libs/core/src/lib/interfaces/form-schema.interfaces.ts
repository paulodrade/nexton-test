// Tipos e interfaces compartilhados para schemas de formulário

export type FieldType = 'text' | 'number' | 'radio';

export interface Field {
  id: string | number;
  label: string;
  type: string;
  required?: boolean;
  name?: string;
  options?: Array<string | { value: string; label: string; icon?: string }>;
}

export interface Section {
  id: string;
  title: string;
  fields: Field[];
}

export interface Schema {
  id: string;
  title: string;
  icon: string;
  sections: Section[];
}

export interface RequestData {
  id: string;
  answers: Record<number, unknown>;
}
