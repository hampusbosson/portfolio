import profileJson from "./profile.json" with { type: "json" };
import projectsJson from "./projects.json" with { type: "json" };
import experienceJson from "./experience.json" with { type: "json" };
import skillsJson from "./skills.json" with { type: "json" };
import faqJson from "./faq.json" with { type: "json" };
import policiesJson from "./policies.json" with { type: "json" };

import type {
  FAQ,
  Experience,
  KnowledgeChunk,
  Policies,
  Profile,
  Project,
  Skill
} from "./types.js";

const profile = profileJson as Profile;
const projects = projectsJson as Project[];
const experiences = experienceJson as Experience[];
const skills = skillsJson as Skill[];
const faqs = faqJson as FAQ[];
const policies = policiesJson as Policies;

export function getKnowledgeChunks(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];

  chunks.push({
    id: "profile-main",
    type: "profile",
    title: "Profile",
    text: [
      `${profile.name}`,
      profile.headline,
      profile.summary,
      profile.location ? `Location: ${profile.location}` : "",
      profile.interests?.length ? `Interests: ${profile.interests.join(", ")}` : "",
      profile.education?.length
        ? `Education: ${profile.education
            .map((e) => `${e.degree} at ${e.institution}${e.status ? ` (${e.status})` : ""}`)
            .join(", ")}`
        : ""
    ]
      .filter(Boolean)
      .join(". "),
    tags: ["profile", "background", ...(profile.allowedTopics ?? [])],
    sourceRef: "profile.json"
  });

  for (const project of projects) {
    chunks.push({
      id: `project-${project.id}`,
      type: "project",
      title: project.name,
      text: [
        project.oneLiner,
        project.description,
        `Tech: ${project.tech.join(", ")}`,
        `Features: ${project.features.join(", ")}`,
        project.problemsSolved?.length
          ? `Problems solved: ${project.problemsSolved.join(", ")}`
          : "",
        `Status: ${project.status}`
      ]
        .filter(Boolean)
        .join(". "),
      tags: [...project.tags, ...project.tech.map((t) => t.toLowerCase())],
      sourceRef: "projects.json"
    });
  }

  for (const experience of experiences) {
    chunks.push({
      id: `experience-${experience.id}`,
      type: "experience",
      title: experience.title,
      text: [
        experience.summary,
        `Responsibilities: ${experience.responsibilities.join(", ")}`,
        `Skills demonstrated: ${experience.skillsDemonstrated.join(", ")}`
      ].join(". "),
      tags: [
        experience.type.toLowerCase(),
        ...experience.skillsDemonstrated.map((s) => s.toLowerCase())
      ],
      sourceRef: "experience.json"
    });
  }

  for (const skill of skills) {
    chunks.push({
      id: `skill-${skill.id}`,
      type: "skill",
      title: skill.name,
      text: [
        `${skill.name}`,
        `Category: ${skill.category}`,
        skill.level ? `Level: ${skill.level}` : "",
        `Evidence: ${skill.evidence.join(", ")}`
      ]
        .filter(Boolean)
        .join(". "),
      tags: [skill.name.toLowerCase(), skill.category.toLowerCase()],
      sourceRef: "skills.json"
    });
  }

  for (const faq of faqs) {
    chunks.push({
      id: `faq-${faq.id}`,
      type: "faq",
      title: faq.question,
      text: faq.answer,
      tags: faq.question.toLowerCase().split(/\s+/),
      sourceRef: "faq.json"
    });
  }

  chunks.push({
    id: "policy-scope",
    type: "policy",
    title: "Assistant Scope Policy",
    text: [
      policies.scope.description,
      `Allowed topics: ${policies.scope.allowedTopics.join(", ")}`,
      `Disallowed topics: ${policies.scope.disallowedTopics.join(", ")}`,
      `Refusal message: ${policies.refusalMessage}`
    ].join(". "),
    tags: [
      "policy",
      "scope",
      ...policies.scope.allowedTopics.map((t) => t.toLowerCase())
    ],
    sourceRef: "policies.json"
  });

  return chunks;
}