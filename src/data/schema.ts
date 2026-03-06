export type ProblemType =
  | 'TAG_SELECT'
  | 'FILL_BLANK'
  | 'SORT_ORDER'
  | 'BLOCK_ASSEMBLE'
  | 'DIRECT_INPUT'
  | 'FIX_ERROR'
  | 'SEMANTIC_CHOICE';

export interface TargetNode {
  tag: string;
  attributes?: Record<string, string>;
  children?: TargetNode[];
  textContent?: string;
  _note?: string;
}

export interface TagBlock {
  tag: string;
  label: string;
}

export interface AttributeRule {
  tag: string;
  attribute: string;
  value?: string;
}

export interface ValidatorConfig {
  mode: 'EXACT_MATCH' | 'STRUCTURE_MATCH' | 'CONTAINS' | 'CUSTOM';
  allowedAlternatives?: TargetNode[];
  requiredTags?: string[];
  forbiddenTags?: string[];
  requiredAttributes?: AttributeRule[];
  customCheck?: string;
}

export interface LevelData {
  id: string;
  trackId: string;
  order: number;
  title: string;
  learningPoint: string;
  problemType: ProblemType;
  instructions: string;
  targetStructure: TargetNode;
  hint?: string;

  // Type-specific data
  options?: string[];
  template?: string;
  scrambled?: string[];
  blocks?: TagBlock[];
  starterCode?: string;
  brokenCode?: string;
  context?: string;

  validator: ValidatorConfig;
  successMessage: string;
}

export interface TrackData {
  id: string;
  title: string;
  description: string;
  color: string;
  levels: LevelData[];
}
