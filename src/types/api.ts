export interface EnterpriseResponse {
  validation: {
    hallucination_detected: boolean;
  };
  confidence: {
    overall: number;
  };
  overview: string;
  required_evidence?: {
    title: string;
    description: string;
  }[];
  references?: {
    source_id: string;
    text: string;
  }[];
  suggested_questions?: string[];
}
