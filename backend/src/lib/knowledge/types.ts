export type Profile = {
  name: string;
  headline: string;
  location?: string;
  summary: string;
  education?: {
    institution: string;
    degree: string;
    status?: string;
  }[];
  interests?: string[];
  allowedTopics: string[];
  contact?: {
    email?: string;
    github?: string;
    linkedin?: string;
  };
};

export type Project = {
  id: string;
  name: string;
  oneLiner: string;
  description: string;
  tech: string[];
  tags: string[];
  features: string[];
  problemsSolved?: string[];
  architecture?: {
    frontend?: string;
    backend?: string;
    database?: string;
    deployment?: string;
  };
  awards?: string[];
  recruiterTalkingPoints?: string[];
  status: "planned" | "in_progress" | "completed" | "deployed";
  links?: {
    repo?: string;
    demo?: string;
  };
};

export type Experience = {
  id: string;
  title: string;
  type: string;
  summary: string;
  responsibilities: string[];
  skillsDemonstrated: string[];
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  level?: string;
  evidence: string[];
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export type Policies = {
  scope: {
    description: string;
    allowedTopics: string[];
    disallowedTopics: string[];
  };
  responseRules: string[];
  refusalMessage: string;
};

export type KnowledgeChunk = {
  id: string;
  type: "profile" | "project" | "experience" | "skill" | "faq" | "policy";
  title: string;
  text: string;
  tags: string[];
  sourceRef: string;
};
